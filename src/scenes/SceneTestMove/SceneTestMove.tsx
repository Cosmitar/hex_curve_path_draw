import { useEffect } from 'react'
import { Vector2 } from 'three'
import { Characters } from '../../elements/entities/Characters'
import { ECS } from '../../state/ECS'
import TerrainSystem from '../../systems/Terrain/TerrainSystem'
import { CharacterEntity, ObstacleEntity } from '../../state/ECS/types'
import { HexaCellTerrain } from '../../elements/entities/HexaCellTerrain'
import PathCalcHexSystem from '../../systems/PathCalc/PathCalcHexSystem'
import PathLine from '../../elements/entities/PathLine'
import { Obstacles } from '../../elements/entities/Obstacles'

const SceneTestMove = () => {
  useEffect(() => {
    ECS.world
      .add<CharacterEntity>({
        coords: new Vector2(0, 1),
        isCharacter: true,
        isSelected: true,
      })
      
      ;([[1, 3], [2, 3], [1, 4], [0, 4], [4, 6], [3, 6], [2, 7]]).forEach(point =>
        ECS.world.add<ObstacleEntity>({
          coords: new Vector2(point[0], point[1]),
          isObstacle: true,
        }),
      )
  }, [])

  return (
    <>
      <group
        position={
          // an offset to center terrain
          [-4.5, 0, 4.5]
        }
      >
        <>
          <Characters />
          <Obstacles />
          <HexaCellTerrain />
          <PathLine />
        </>
        <>
          <TerrainSystem />
          <PathCalcHexSystem />
        </>
      </group>
    </>
  )
}

export default SceneTestMove
