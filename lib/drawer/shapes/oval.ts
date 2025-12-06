import type { Matrix } from "transformation-matrix"
import { applyToPoint } from "transformation-matrix"
import type { CanvasContext } from "../types"

export interface DrawOvalParams {
  ctx: CanvasContext
  center: { x: number; y: number }
  width: number
  height: number
  fill: string
  transform: Matrix
  rotation?: number
}

export function drawOval(params: DrawOvalParams): void {
  const { ctx, center, width, height, fill, transform, rotation = 0 } = params

  const [cx, cy] = applyToPoint(transform, [center.x, center.y])
  const scaledWidth = width * Math.abs(transform.a)
  const scaledHeight = height * Math.abs(transform.a)

  ctx.save()
  ctx.translate(cx, cy)

  if (rotation !== 0) {
    ctx.rotate(-rotation * (Math.PI / 180))
  }

  ctx.beginPath()
  ctx.ellipse(0, 0, scaledWidth / 2, scaledHeight / 2, 0, 0, Math.PI * 2)
  ctx.fillStyle = fill
  ctx.fill()
  ctx.restore()
}
