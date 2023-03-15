import { useOnEntityAdded } from '@miniplex/react'
import { forwardRef, MutableRefObject, useRef, useState } from 'react'
import { Group } from 'three'
import { ECS } from '../../state/ECS'
import { extend, useFrame } from '@react-three/fiber'
import { MeshLine, MeshLineGeometry, MeshLineMaterial } from '@lume/three-meshline'
import { Entity } from '../../state/ECS/types'
import { ARCH_MOVABLE_WITH_HEXA_PATH } from '../../state/ECS/archetypes'
import { Node } from 'ngraph.graph'
import {
  addLine,
  EDGE_BOTTOM_LEFT,
  EDGE_BOTTOM_RIGHT,
  EDGE_LEFT,
  EDGE_RIGHT,
  EDGE_TOP_LEFT,
  EDGE_TOP_RIGHT,
} from '../../systems/PathCalc/pathLineUtils'

extend({ MeshLineGeometry, MeshLineMaterial, MeshLine })

export default function PathLine() {
  return (
    <ECS.Entity>
      <ECS.Component name="isPathLine" data={true} />
      <ECS.Component name="render">
        {/* @ts-ignore */}
        <PathLineComponent />
      </ECS.Component>
    </ECS.Entity>
  )
}

const PathLineComponent = forwardRef((props: Group, ref: MutableRefObject<Group>) => {
  const [pathLine, setPath] = useState<number[]>()
  const newPath = useRef<boolean>()
  const createPathLineFromMovePath = (movePath: Node<any>[]) => {
    let magicNumber = 0.866 // Math.sin(Math.PI/3)

    const line = movePath.reverse().reduce((res: number[], node: Node<any>, idx: number) => {
      const isFirstNode = idx === 0
      const isLastNode = idx === movePath.length - 1
      const prevNode = movePath[idx - 1]
      const nextNode = movePath[idx + 1]

      const from = isFirstNode
        ? EDGE_LEFT
        : prevNode.data.r === node.data.r && prevNode.data.q < node.data.q
        ? EDGE_LEFT
        : prevNode.data.r < node.data.r && prevNode.data.q === node.data.q
        ? EDGE_BOTTOM_LEFT
        : prevNode.data.r < node.data.r && prevNode.data.q > node.data.q
        ? EDGE_BOTTOM_RIGHT
        : prevNode.data.r === node.data.r && prevNode.data.q > node.data.q
        ? EDGE_RIGHT
        : prevNode.data.r > node.data.r && prevNode.data.q === node.data.q
        ? EDGE_TOP_RIGHT
        : prevNode.data.r > node.data.r && prevNode.data.q < node.data.q
        ? EDGE_TOP_LEFT
        : EDGE_LEFT

      const to = isLastNode
        ? EDGE_RIGHT
        : nextNode.data.r === node.data.r && nextNode.data.q > node.data.q
        ? EDGE_RIGHT
        : nextNode.data.r > node.data.r && nextNode.data.q === node.data.q
        ? EDGE_TOP_RIGHT
        : nextNode.data.r > node.data.r && nextNode.data.q < node.data.q
        ? EDGE_TOP_LEFT
        : nextNode.data.r === node.data.r && nextNode.data.q < node.data.q
        ? EDGE_LEFT
        : nextNode.data.r < node.data.r && nextNode.data.q === node.data.q
        ? EDGE_BOTTOM_LEFT
        : nextNode.data.r < node.data.r && nextNode.data.q > node.data.q
        ? EDGE_BOTTOM_RIGHT
        : EDGE_BOTTOM_RIGHT

      addLine(
        res,
        from,
        to,
        {
          x: -node.data.center.x * magicNumber,
          y: 0.01,
          z: node.data.center.y * magicNumber,
        },
        { headOfLine: isFirstNode, endOfLine: isLastNode, dimension: 1 * magicNumber },
      )

      newPath.current = true
      return res
    }, [])

    return line
  }
  useOnEntityAdded(ARCH_MOVABLE_WITH_HEXA_PATH, (e: Entity) => {
    setPath(createPathLineFromMovePath(e.moveHexaPath!))
    ECS.world.removeComponent(e, 'moveHexaPath')
  })

  const material = useRef<MeshLineMaterial>()
  const speed = 1
  const nodesCount = Math.ceil((pathLine?.length ?? 0) / 3 / 8) + 1

  useFrame((_, delta) => {
    if (material.current) {
      if (newPath.current) {
        newPath.current = false
        material.current.opacity = -1
      }
      material.current.dashOffset -= (delta * speed) / nodesCount
      material.current.opacity += 0.05
    }
  })

  return (
    <group ref={ref} {...props}>
      {pathLine && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[pathLine[0], pathLine[1], pathLine[2]]}>
            <circleGeometry args={[0.1, 32]} />
            <meshBasicMaterial color={'#ff60ff'} />
          </mesh>
          {/* @ts-ignore */}
          <meshLine>
            {/* @ts-ignore */}
            <meshLineGeometry attach="geometry" points={pathLine} />
            {/* @ts-ignore */}
            <meshLineMaterial
              attach="material"
              ref={material}
              transparent={true}
              opacity={0}
              depthTest={false}
              lineWidth={0.1}
              color={'orange'}
              dashArray={1 / nodesCount}
              dashRatio={0.195}
              sizeAttenuation
            />
            {/* @ts-ignore */}
          </meshLine>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[pathLine[pathLine.length - 3], pathLine[pathLine.length - 2], pathLine[pathLine.length - 1]]}
          >
            <circleGeometry args={[0.1, 32]} />
            <meshBasicMaterial color={'#ff6000'} />
          </mesh>
        </>
      )}
    </group>
  )
})
