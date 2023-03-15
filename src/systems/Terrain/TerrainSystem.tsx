import { useOnEntityAdded } from '@miniplex/react'
import { compose, isNil, not, when } from 'ramda'
import { Vector2 } from 'three'
import { ECS } from '../../state/ECS'
import { ARCH_POSITIONABLE_NON_TILE, ARCH_TILES } from '../../state/ECS/archetypes'
import { PositionableEntity, TileEntity } from '../../state/ECS/types'
import useOnMount from '../../utils/hooks/useOnMount'
import useOnUnmount from '../../utils/hooks/useOnUnmount'
import * as HexSystem from './Coordinates'

export default function TerrainSystem() {
  useOnMount(() => buildHexTerrain(10, 10))
  useOnUnmount(destroyTerrain)

  useOnEntityAdded(ARCH_POSITIONABLE_NON_TILE, appendToTerrain)

  return null
}

const factoryTile = (tile: HexSystem.HexTile) => {
  ECS.world.add({
    tile,
    isTile: true,
    isInteractive: true,
    coords: new Vector2(tile.q, tile.r),
  })
}

export const buildHexTerrain = (width = 10, height = 10, factory = factoryTile) => {
  const grid = HexSystem.getGrid(width, height)

  // iterates over the grid and create entities for each tile.
  grid.forEach(factory)

  // stores the grid as anotehr entity for easy access later.
  ECS.world.add({ isGrid: true, grid })
}

const destroyTerrain = (entities = ECS.world.with('isTile'), destroyEntity = ECS.world.remove) => {
  for (const entity of entities) {
    destroyEntity(entity)
  }
}

// adds an entity as occupant of a tile entity (if the last one is free)
const appendToTerrain = (occupantEntity: PositionableEntity) => {
  const [targetTileEntity] = ARCH_TILES.where(t => t.coords!.equals(occupantEntity.coords!))
  const updateOccupant = (e: TileEntity) => ECS.world.update(targetTileEntity, { occupant: occupantEntity })

  when(compose(not, isNil), updateOccupant)(targetTileEntity)
}
