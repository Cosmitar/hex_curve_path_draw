import { GroupProps } from "@react-three/fiber"

const Capsule = (props: GroupProps) => {
  return (
    <group {...props} name="pivot">
      <mesh position={[0, 1, 0]}>
        <capsuleGeometry args={[0.5, 1, 4, 8]} />
        <meshNormalMaterial wireframe />
      </mesh>
    </group>
  )
}

export default Capsule
