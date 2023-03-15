import { useEntities } from '@miniplex/react'
import { ECS } from '../../state/ECS'
import { CharacterEntity } from '../../state/ECS/types'
import coordsToPosition from '../../systems/Terrain/Coordinates/coordsToPosition'
import Capsule from '../models/Capsule'

const ARCH_CHARACTERS = ECS.world.archetype<CharacterEntity>('isCharacter')

export const Characters = () => {
  const characters = useEntities(ARCH_CHARACTERS)

  return <ECS.Entities in={characters} children={renderCharacter} />
}

const renderCharacter = (entity: CharacterEntity) => {
  return (
    <>
      <ECS.Component name="three">
        <group position={coordsToPosition(entity.coords!)}>
          <Capsule />
        </group>
      </ECS.Component>
    </>
  )
}
