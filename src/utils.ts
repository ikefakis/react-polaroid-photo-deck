type SpringTarget = {
  x: number
  y: number
  scale: number
  rot: number
  delay: number
}

type SpringFrom = Omit<SpringTarget, 'delay'>

export const to = (i: number): SpringTarget => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
})

export const from = (_i: number): SpringFrom => ({
  x: 0,
  rot: 0,
  scale: 1.5,
  y: -1000
})

export const trans = (r: number, s: number): string => `perspective(1500px) rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
