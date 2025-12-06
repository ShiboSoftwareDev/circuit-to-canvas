import type { Matrix } from "transformation-matrix"
import { applyToPoint } from "transformation-matrix"
import type { CanvasContext } from "../types"

export interface DrawCircleParams {
  ctx: CanvasContext
  center: { x: number; y: number }
  radius: number
  fill: string
  transform: Matrix
}

export function drawCircle(params: DrawCircleParams): void {
  const { ctx, center, radius, fill, transform } = params

  const [cx, cy] = applyToPoint(transform, [center.x, center.y])
  const scaledRadius = radius * Math.abs(transform.a)

  ctx.beginPath()
  ctx.arc(cx, cy, scaledRadius, 0, Math.PI * 2)
  ctx.fillStyle = fill
  ctx.fill()
}
