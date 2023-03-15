// @ts-nocheck
import { MeshLine, MeshLineGeometry, MeshLineMaterial } from '@lume/three-meshline'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { DoubleSide, MathUtils } from 'three'

extend({ MeshLineGeometry, MeshLineMaterial, MeshLine })

export const addStraightLineLeftRight = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] = start[0] + (1 / points) * (j / 3)
    line[size + j + 1] = start[1]
    line[size + j + 2] = start[2]
  }
}
export const addStraightLineRightLeft = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] = start[0] - (1 / points) * (j / 3)
    line[size + j + 1] = start[1]
    line[size + j + 2] = start[2]
  }
}
export const addStraightLineBottomUp = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] = start[0]
    line[size + j + 1] = start[1]
    line[size + j + 2] = start[2] - (1 / points) * (j / 3)
  }
}
export const addStraightLineUpperDown = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] = start[0]
    line[size + j + 1] = start[1]
    line[size + j + 2] = start[2] + (1 / points) * (j / 3)
  }
}
export const addCurveLineLeftUpper = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] = start[0] + Math.sin(MathUtils.lerp(0, Math.PI / 2, (1 / points) * (j / 3))) * 0.5

    line[size + j + 1] = start[1]

    line[size + j + 2] = start[2] - 0.5 + Math.cos(MathUtils.lerp(0, Math.PI / 2, (1 / points) * (j / 3))) * 0.5
  }
}
export const addCurveLineLeftBottom = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] = start[0] + Math.sin(MathUtils.lerp(0, Math.PI / 2, (1 / points) * (j / 3))) * 0.5

    line[size + j + 1] = start[1]

    line[size + j + 2] = start[2] + 0.5 - Math.cos(MathUtils.lerp(0, Math.PI / 2, (1 / points) * (j / 3))) * 0.5
  }
}
export const addCurveLineUpperLeft = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] = start[0] - 0.5 + Math.sin(MathUtils.lerp(Math.PI / 2, Math.PI, (1 / points) * (j / 3))) * 0.5

    line[size + j + 1] = start[1]

    line[size + j + 2] = start[2] - Math.cos(MathUtils.lerp(Math.PI / 2, Math.PI, (1 / points) * (j / 3))) * 0.5
  }
}
export const addCurveLineRightUpper = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] = start[0] + Math.sin(MathUtils.lerp(Math.PI, (3 * Math.PI) / 2, (1 / points) * (j / 3))) * 0.5

    line[size + j + 1] = start[1]

    line[size + j + 2] =
      start[2] - 0.5 - Math.cos(MathUtils.lerp(Math.PI, (3 * Math.PI) / 2, (1 / points) * (j / 3))) * 0.5
  }
}
export const addCurveLineUpperRight = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] =
      start[0] + 0.5 + Math.sin(MathUtils.lerp((3 * Math.PI) / 2, 2 * Math.PI, (1 / points) * (j / 3))) * 0.5

    line[size + j + 1] = start[1]

    line[size + j + 2] =
      start[2] + Math.cos(MathUtils.lerp((3 * Math.PI) / 2, 2 * Math.PI, (1 / points) * (j / 3))) * 0.5
  }
}
export const addCurveLineBottomRight = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] = start[0] + 0.5 + Math.cos(MathUtils.lerp(Math.PI, (3 * Math.PI) / 2, (1 / points) * (j / 3))) * 0.5

    line[size + j + 1] = start[1]

    line[size + j + 2] = start[2] + Math.sin(MathUtils.lerp(Math.PI, (3 * Math.PI) / 2, (1 / points) * (j / 3))) * 0.5
  }
}
export const addCurveLineBottomLeft = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] = start[0] - 0.5 - Math.cos(MathUtils.lerp(Math.PI, (3 * Math.PI) / 2, (1 / points) * (j / 3))) * 0.5

    line[size + j + 1] = start[1]

    line[size + j + 2] = start[2] + Math.sin(MathUtils.lerp(Math.PI, (3 * Math.PI) / 2, (1 / points) * (j / 3))) * 0.5
  }
}
export const addCurveLineRightBottom = (line: number[], x?: number, y?: number, z?: number) => {
  const size = line.length
  const start = [x ?? line[size - 3], y ?? line[size - 2], z ?? line[size - 1]]
  const points = 8
  for (let j = 0; j <= points * 3; j += 3) {
    line[size + j] = start[0] + Math.sin(MathUtils.lerp(Math.PI, (3 * Math.PI) / 2, (1 / points) * (j / 3))) * 0.5

    line[size + j + 1] = start[1]

    line[size + j + 2] =
      start[2] + 0.5 + Math.cos(MathUtils.lerp(Math.PI, (3 * Math.PI) / 2, (1 / points) * (j / 3))) * 0.5
  }
}

export const cutEnds = (line: number[]) => {
  const points = 8
  line.splice(0, Math.ceil(points / 2) * 3)
  line.splice(Math.ceil(-points / 2) * 3)
}

export default function PathLine() {
  const material = useRef<MeshLineMaterial>()
  const speed = 1
  // useFrame((state, delta) => (ref.current.material.dashOffset -= (delta * speed) / 10))
  useFrame((_, delta) => {
    if (material.current) {
      material.current.dashOffset -= (delta * speed) / 10
      // console.log(material.current);
    }
  })

  const border: number[] = []
  addStraightLineLeftRight(border, 0.5, 0.03, 0)
  addCurveLineLeftUpper(border)
  addCurveLineBottomRight(border)
  addCurveLineLeftBottom(border)
  addCurveLineUpperLeft(border)
  addCurveLineRightBottom(border)
  addStraightLineUpperDown(border)
  addCurveLineUpperLeft(border)
  addStraightLineRightLeft(border)
  addCurveLineRightUpper(border)
  addCurveLineBottomLeft(border)
  addCurveLineRightUpper(border)
  addCurveLineBottomRight(border)
  addStraightLineLeftRight(border)

  const path: number[] = []
  addStraightLineBottomUp(path, 0.5, 0.03, 2)
  addCurveLineBottomRight(path)
  addStraightLineLeftRight(path)
  cutEnds(path)

  return (
    <>
      <meshLine>
        <meshLineGeometry attach="geometry" points={border} />
        <meshLineMaterial
          transparent={true}
          depthTest={false}
          lineWidth={0.05}
          color={'blue'}
          // dashArray={0.1}
          // dashRatio={0.95}
          dashArray={0.1}
          dashRatio={0.195}
          sizeAttenuation
        />
      </meshLine>
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
