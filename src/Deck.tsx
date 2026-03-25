import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import * as utils from './utils'
import './styles.css'

export type Card = {
  url: string
}

type Orientation = 'portrait' | 'landscape'

export type DeckProps = {
  cards: Card[]
  className?: string
  style?: CSSProperties
}

type DragGestureState = {
  args?: [number]
  active: boolean
  movement: [number, number]
  direction: [number, number]
  velocity: [number, number]
}

const IMAGE_LOAD_TIMEOUT_MS = 5000

function getCardOrientation(detectedOrientation: Orientation | null): Orientation {
  return detectedOrientation ?? 'portrait'
}

function loadCardOrientation(card: Card): Promise<Orientation | null> {
  return new Promise((resolve) => {
    const image = new Image()
    const timeoutId = window.setTimeout(() => {
      image.onload = null
      image.onerror = null
      resolve(null)
    }, IMAGE_LOAD_TIMEOUT_MS)

    const resolveOrientation = (orientation: Orientation | null) => {
      window.clearTimeout(timeoutId)
      image.onload = null
      image.onerror = null
      resolve(orientation)
    }

    image.onload = () => resolveOrientation(image.naturalHeight > image.naturalWidth ? 'portrait' : 'landscape')
    image.onerror = () => resolveOrientation(null)
    image.src = card.url
  })
}

export default function Deck({ cards, className, style }: DeckProps) {
  const [gone] = useState(() => new Set<number>())
  const deckRef = useRef<HTMLDivElement>(null)
  const [orientations, setOrientations] = useState<(Orientation | null)[]>(() => cards.map(() => null))
  const [areCardsReady, setAreCardsReady] = useState(false)
  const [props, api] = useSprings(cards.length, (i) => ({
    ...utils.to(i),
    from: utils.from(i)
  }))

  useLayoutEffect(() => {
    let isMounted = true
    let animationFrameId: number | undefined
    gone.clear()
    setAreCardsReady(false)
    setOrientations(cards.map(() => null))

    Promise.all(cards.map((card) => loadCardOrientation(card))).then((nextOrientations) => {
      if (isMounted) {
        setOrientations(nextOrientations)
        api.start((i) => ({
          ...utils.from(i),
          immediate: true
        }))
        setAreCardsReady(true)
        animationFrameId = window.requestAnimationFrame(() => {
          if (isMounted) {
            api.start((i) => utils.to(i))
          }
        })
      }
    })

    return () => {
      isMounted = false
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [api, cards])

  const bind = useDrag(({ args, active, movement: [mx], direction: [xDir], velocity: [vx] }: DragGestureState) => {
    const [index] = args ?? []
    if (typeof index !== 'number') return

    const trigger = vx > 0.2
    if (!active && trigger) gone.add(index)
    api.start((i) => {
      if (index !== i) return
      const isGone = gone.has(index)
      const deckWidth = deckRef.current?.getBoundingClientRect().width ?? window.innerWidth
      const x = isGone ? (200 + deckWidth) * xDir : active ? mx : 0
      const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0)
      const scale = active ? 1.1 : 1
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 }
      }
    })
    if (!active && gone.size === cards.length) {
      window.setTimeout(() => {
        gone.clear()
        api.start((i) => utils.to(i))
      }, 600)
    }
  })

  const deckClassName = className ? `photo-deck ${className}` : 'photo-deck'

  return (
    <div ref={deckRef} className={deckClassName} style={style}>
      {areCardsReady &&
        props.map(({ x, y, rot, scale }, i) => {
          const orientation = getCardOrientation(orientations[i])

          return (
            <animated.div key={i} className="photo-deck__card-shell" style={{ x, y }}>
              <animated.div
                {...bind(i)}
                className="photo-deck__card"
                style={{
                  transform: interpolate([rot, scale], utils.trans),
                  backgroundImage: `url(${cards[i].url})`,
                  width: orientation === 'portrait' ? '240px' : '320px',
                  height: orientation === 'portrait' ? '320px' : '240px'
                }}
              />
            </animated.div>
          )
        })}
    </div>
  )
}
