import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import * as utils from "./utils";
import "./styles.css";

export type Card = {
  url: string;
  date?: string;
  caption?: string;
};

type Orientation = "portrait" | "landscape";

type CardDimensions = {
  frameWidth: number;
  frameHeight: number;
  photoWidth: number;
  photoHeight: number;
  topHeight: number;
  bottomHeight: number;
};

export type DeckProps = {
  cards: Card[];
  className?: string;
  style?: CSSProperties;
};

type DragGestureState = {
  args?: [number];
  active: boolean;
  movement: [number, number];
  direction: [number, number];
  velocity: [number, number];
};

const IMAGE_LOAD_TIMEOUT_MS = 5000;
const CARD_SAFE_MARGIN_PX = 48;
const CARD_DIMENSIONS: Record<Orientation, CardDimensions> = {
  portrait: {
    frameWidth: 272,
    frameHeight: 428,
    photoWidth: 240,
    photoHeight: 320,
    topHeight: 32,
    bottomHeight: 76,
  },
  landscape: {
    frameWidth: 352,
    frameHeight: 344,
    photoWidth: 320,
    photoHeight: 240,
    topHeight: 32,
    bottomHeight: 72,
  },
};

function getCardOrientation(
  detectedOrientation: Orientation | null,
): Orientation {
  return detectedOrientation ?? "portrait";
}

function getCardDimensions(orientation: Orientation): CardDimensions {
  return CARD_DIMENSIONS[orientation];
}

function getFittedCardDimensions(
  dimensions: CardDimensions,
  deckWidth: number,
  deckHeight: number,
): CardDimensions {
  const widthScale =
    deckWidth > 0
      ? (deckWidth - CARD_SAFE_MARGIN_PX) / dimensions.frameWidth
      : 1;
  const heightScale =
    deckHeight > 0
      ? (deckHeight - CARD_SAFE_MARGIN_PX) / dimensions.frameHeight
      : 1;
  const scale = Math.min(1, widthScale, heightScale);

  return {
    frameWidth: dimensions.frameWidth * scale,
    frameHeight: dimensions.frameHeight * scale,
    photoWidth: dimensions.photoWidth * scale,
    photoHeight: dimensions.photoHeight * scale,
    topHeight: dimensions.topHeight * scale,
    bottomHeight: dimensions.bottomHeight * scale,
  };
}

function loadCardOrientation(card: Card): Promise<Orientation | null> {
  return new Promise((resolve) => {
    const image = new Image();
    const timeoutId = window.setTimeout(() => {
      image.onload = null;
      image.onerror = null;
      resolve(null);
    }, IMAGE_LOAD_TIMEOUT_MS);

    const resolveOrientation = (orientation: Orientation | null) => {
      window.clearTimeout(timeoutId);
      image.onload = null;
      image.onerror = null;
      resolve(orientation);
    };

    image.onload = () =>
      resolveOrientation(
        image.naturalHeight > image.naturalWidth ? "portrait" : "landscape",
      );
    image.onerror = () => resolveOrientation(null);
    image.src = card.url;
  });
}

export default function Deck({ cards, className, style }: DeckProps) {
  const [gone] = useState(() => new Set<number>());
  const deckRef = useRef<HTMLDivElement>(null);
  const [deckSize, setDeckSize] = useState(() => ({
    width:
      typeof window === "undefined" ? 0 : Math.max(window.innerWidth, 0),
    height:
      typeof window === "undefined" ? 0 : Math.max(window.innerHeight, 0),
  }));
  const [orientations, setOrientations] = useState<(Orientation | null)[]>(() =>
    cards.map(() => null),
  );
  const [areCardsReady, setAreCardsReady] = useState(false);
  const [props, api] = useSprings(cards.length, (i) => ({
    ...utils.to(i),
    from: utils.from(i),
  }));

  useLayoutEffect(() => {
    const deckElement = deckRef.current;

    if (!deckElement) return;

    const updateDeckSize = () => {
      const { width, height } = deckElement.getBoundingClientRect();
      setDeckSize({
        width,
        height,
      });
    };

    updateDeckSize();

    const observer = new ResizeObserver(() => {
      updateDeckSize();
    });

    observer.observe(deckElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    let isMounted = true;
    let animationFrameId: number | undefined;
    gone.clear();
    setAreCardsReady(false);
    setOrientations(cards.map(() => null));

    Promise.all(cards.map((card) => loadCardOrientation(card))).then(
      (nextOrientations) => {
        if (isMounted) {
          setOrientations(nextOrientations);
          api.start((i) => ({
            ...utils.from(i),
            immediate: true,
          }));
          setAreCardsReady(true);
          animationFrameId = window.requestAnimationFrame(() => {
            if (isMounted) {
              api.start((i) => utils.to(i));
            }
          });
        }
      },
    );

    return () => {
      isMounted = false;
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [api, cards]);

  const bind = useDrag(
    ({
      args,
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    }: DragGestureState) => {
      const [index] = args ?? [];
      if (typeof index !== "number") return;

      const trigger = vx > 0.2;
      if (!active && trigger) gone.add(index);
      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const deckWidth =
          deckRef.current?.getBoundingClientRect().width ?? window.innerWidth;
        const x = isGone ? (200 + deckWidth) * xDir : active ? mx : 0;
        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0);
        const scale = active ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!active && gone.size === cards.length) {
        window.setTimeout(() => {
          gone.clear();
          api.start((i) => utils.to(i));
        }, 600);
      }
    },
  );

  const deckClassName = className ? `photo-deck ${className}` : "photo-deck";

  return (
    <div ref={deckRef} className={deckClassName} style={style}>
      {areCardsReady &&
        props.map(({ x, y, rot, scale }, i) => {
          const orientation = getCardOrientation(orientations[i]);
          const dimensions = getFittedCardDimensions(
            getCardDimensions(orientation),
            deckSize.width,
            deckSize.height,
          );
          const card = cards[i];
          const cardVariables = {
            "--photo-deck-photo-width": `${dimensions.photoWidth}px`,
            "--photo-deck-photo-height": `${dimensions.photoHeight}px`,
            "--photo-deck-card-top-height": `${dimensions.topHeight}px`,
            "--photo-deck-card-bottom-height": `${dimensions.bottomHeight}px`,
          } as CSSProperties;

          return (
            <animated.div
              key={i}
              className="photo-deck__card-shell"
              style={{ x, y }}
            >
              <animated.div
                {...bind(i)}
                className={`photo-deck__card photo-deck__card--${orientation}`}
                style={{
                  transform: interpolate([rot, scale], utils.trans),
                  width: `${dimensions.frameWidth}px`,
                  height: `${dimensions.frameHeight}px`,
                  ...cardVariables,
                }}
              >
                <div className="photo-deck__date-row">
                  {card.date ? (
                    <span className="photo-deck__date">{card.date}</span>
                  ) : null}
                </div>
                <div
                  className="photo-deck__photo"
                  style={{
                    backgroundImage: `url(${card.url})`,
                  }}
                />
                <div className="photo-deck__caption-row">
                  {card.caption ? (
                    <span className="photo-deck__caption">{card.caption}</span>
                  ) : null}
                </div>
              </animated.div>
            </animated.div>
          );
        })}
    </div>
  );
}
