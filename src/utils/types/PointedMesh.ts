export type PositionMesh = THREE.Group & {
  color: THREE.Color
  instance: React.MutableRefObject<THREE.InstancedMesh | undefined>
  instanceKey: React.MutableRefObject<JSX.IntrinsicElements['positionMesh'] | undefined>
}
