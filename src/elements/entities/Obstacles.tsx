import { useEntities } from '@miniplex/react'
import { Instance, Instances } from '@react-three/drei'
import { ECS } from '../../state/ECS'
import { ObstacleEntity } from '../../state/ECS/types'
import coordsToPosition from '../../systems/Terrain/Coordinates/coordsToPosition'

const ARCH_CHARACTERS = ECS.world.archetype<ObstacleEntity>('isObstacle')

export const Obstacles = () => {
  const characters = useEntities(ARCH_CHARACTERS)

  return (
    <Instances
      limit={10} // Optional: max amount of items (for calculating buffer size)
      range={1000} // Optional: draw-range
    >
      <cylinderGeometry args={[1*0.866, 1*0.866, 0.2, 6]} />
      <meshBasicMaterial color={'gray'} wireframe={false} />

      <ECS.Entities in={characters} children={renderObstacles} />
    </Instances>
  )
}

const renderObstacles = (entity: ObstacleEntity) => {
  return (
    <ECS.Component name="three">
      <Instance position={coordsToPosition(entity.coords!, 0.1)} />
    </ECS.Component>
  )
}
