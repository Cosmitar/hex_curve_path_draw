import { QuadraticBezierCurve3, Vector3 } from 'three'

// const size = 0.5
const points = 8 // amount of point in the line
// const targetEdge = 0 // 0 (front), +-1 (mid), +-2(close)
// const verticesDistance = 2 * size
// const sidesDistance = Math.sqrt(3) * size
// const widthFlat = verticesDistance
// const heightFlat = sidesDistance
// const widthPointy = sidesDistance
// const heightPointy = verticesDistance
// const hexType = 'flat' // 'pointy
// const radius = hexType === 'flat' ? heightFlat : widthFlat / 2

// DIRECTIONS
export const EDGE_LEFT = 0
export const EDGE_BOTTOM_LEFT = 5
export const EDGE_BOTTOM_RIGHT = 4
export const EDGE_RIGHT = 3
export const EDGE_TOP_RIGHT = 2
export const EDGE_TOP_LEFT = 1

export const addLine = (
  line: number[],
  fromEdge = EDGE_LEFT,
  toEdge = EDGE_RIGHT,
  center: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0},
  { headOfLine = false, endOfLine = false, dimension = 1 },
) => {
  const length = line.length
  const iniRotation = headOfLine ? 1.5 + toEdge + 3 : 1.5 + fromEdge
  const endRotation = endOfLine ? 1.5 + fromEdge + 3 : 1.5 + toEdge

  const curve = new QuadraticBezierCurve3(
    new Vector3(
      Math.sin((Math.PI / 3) * iniRotation) * -(dimension * 0.866),
      0,
      Math.cos((Math.PI / 3) * iniRotation) * (dimension * 0.866),
    ),
    new Vector3(0, 0, 0),
    new Vector3(
      Math.sin((Math.PI / 3) * endRotation) * -(dimension * 0.866),
      0,
      Math.cos((Math.PI / 3) * endRotation) * (dimension * 0.866),
    ),
  )

  const path = curve.getPoints(points)
  if (headOfLine) {
    path.splice(0, path.length / 2)
  }
  if (endOfLine) {
    path.splice(-path.length / 2)
  }

  path.forEach((p, idx) => {
    if (length === 0) {
      // first line includes first point
      line[length + idx * 3] = center.x + p.x
      line[length + idx * 3 + 1] = center.y
      line[length + idx * 3 + 2] = center.z + p.z
    } else if (idx !== 0) {
      // following lines exclude first point (since overlaps with previous line)
      line[length + (idx - 1) * 3] = center.x + p.x
      line[length + (idx - 1) * 3 + 1] = center.y
      line[length + (idx - 1) * 3 + 2] = center.z + p.z
    }
  })
}
