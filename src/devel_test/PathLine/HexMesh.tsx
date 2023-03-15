import { MeshProps } from '@react-three/fiber'
import { DoubleSide } from 'three'

export const HexMesh = (props: MeshProps) => {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} {...props}>
      <circleGeometry args={[0.5 / 0.866, 6]} />
      <meshLambertMaterial emissive={0x666666} side={DoubleSide} color="white" transparent opacity={0.5} />
    </mesh>
  )
}
