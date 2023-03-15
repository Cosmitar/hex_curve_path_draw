// @ts-nocheck
import { MeshLine, MeshLineGeometry, MeshLineMaterial } from '@lume/three-meshline'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { DoubleSide, MathUtils, QuadraticBezierCurve3, Vector3 } from 'three'
import { DEG2RAD, lerp, RAD2DEG } from 'three/src/math/MathUtils'

extend({ MeshLineGeometry, MeshLineMaterial, MeshLine })

const size = 0.5
const points = 8 // amount of point in the line
const targetEdge = 0 // 0 (front), +-1 (mid), +-2(close)
const verticesDistance = 2 * size
const sidesDistance = Math.sqrt(3) * size
const widthFlat = verticesDistance
const heightFlat = sidesDistance
const widthPointy = sidesDistance
const heightPointy = verticesDistance
const hexType = 'flat' // 'pointy
const radius = hexType === 'flat' ? heightFlat : widthFlat / 2

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
  toEdge = TO_FRONT,
  center: { x?: number; y?: number; z?: number },
  { headOfLine = false, endOfLine = false, dimension = 1 },
) => {
  const length = line.length
  const iniRotation = headOfLine ? 1.5 + toEdge + 3 : 1.5 + fromEdge
  const endRotation = endOfLine ? 1.5 + fromEdge + 3 : 1.5 + toEdge
  // const destination = toEdge
  const start = { x: center.x - 0.5, y: center.y, z: center.z }

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

export default function HexPathLine() {
  const material = useRef<MeshLineMaterial>()
  const speed = 1
  // useFrame((state, delta) => (ref.current.material.dashOffset -= (delta * speed) / 10))
  useFrame((_, delta) => {
    if (material.current) {
      material.current.dashOffset -= (delta * speed) / 10
      // console.log(material.current);
    }
  })

  const path: number[] = []
  addLine(path, EDGE_BOTTOM_LEFT, EDGE_TOP_LEFT, { x: 1 + 0.5 * 0, y: 0.01, z: 0 * 0.866 }, { headOfLine: true })
  addLine(path, EDGE_BOTTOM_RIGHT, EDGE_LEFT, { x: 1 + 0.5 * -1, y: 0.01, z: -1 * 0.866 }, { endOfLine: false })
  addLine(path, EDGE_RIGHT, EDGE_BOTTOM_LEFT, { x: 0 + 0.5 * -1, y: 0.01, z: -1 * 0.866 }, { endOfLine: false })
  addLine(path, EDGE_TOP_RIGHT, EDGE_RIGHT, { x: -1 + 0.5 * 0, y: 0.01, z: 0 * 0.866 }, { endOfLine: false })
  addLine(path, EDGE_LEFT, EDGE_BOTTOM_RIGHT, { x: 0 + 0.5 * 0, y: 0.01, z: 0 * 0.866 }, { endOfLine: true })

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[path[0], path[1], path[2]]}>
        <circleBufferGeometry args={[0.1, 32]} />
        <meshBasicMaterial color={'#ff6000'} />
      </mesh>
      <meshLine>
        <meshLineGeometry attach="geometry" points={path} />
        <meshLineMaterial
          ref={material}
          transparent={true}
          depthTest={false}
          lineWidth={0.05}
          color={'orange'}
          // dashArray={0.1}
          // dashRatio={0.95}
          dashArray={0.1}
          dashRatio={0.195}
          sizeAttenuation
        />
      </meshLine>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[path[path.length - 3], path[path.length - 2], path[path.length - 1]]}
      >
        <circleBufferGeometry args={[0.1, 32]} />
        <meshBasicMaterial color={'#ff6000'} />
      </mesh>
    </>
  )
}
