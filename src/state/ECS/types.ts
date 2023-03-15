import { Node } from 'ngraph.graph'
import { ReactNode } from 'react'
import { Object3D, Vector2 } from 'three'
import { HexGrid, HexTile, HexCoords } from '../../systems/Terrain/Coordinates'
import { Prettify } from '../../utils/types/TypescriptPrettify'

/*
The main entity type. In Miniplex, you typically declare a world whose entities
all are of a specific type. This type can have some properties marked as required,
but will usually have most, if not all, of them optional.
*/
export type PositionableEntity = {
  coords?: Vector2
}

export type CommandableEntity = Prettify<
  PositionableEntity & {
    isMoveSource?: boolean
    isMoveTarget?: boolean
  }
>

export type RenderableEntity = {
  three?: Object3D
  render?: ReactNode
}

export type InteractiveEntity = {
  isSelected?: boolean
  isHovered?: boolean
}

export type VisualyOnGridEntity = Prettify<PositionableEntity & RenderableEntity>

export type TraceableEntity = {
  movePath?: Vector2[]
  moveHexaPath?: Node<any>[]
}
export type ObstacleEntity = Prettify<VisualyOnGridEntity & { isObstacle?: boolean }>
export type CharacterEntity = Prettify<
  VisualyOnGridEntity &
    TraceableEntity &
    InteractiveEntity &
    CommandableEntity & {
      isCharacter?: boolean
    }
>

export type TileEntity = Prettify<
  VisualyOnGridEntity &
    TraceableEntity &
    InteractiveEntity & {
      isTile?: boolean
      tile?: HexTile
      /* when true, it means can handle mouse events */
      isInteractive?: boolean
      /* occupant of a tile */
      occupant?: PositionableEntity
    }
>

/* Tiles tagged as path */
export type PathEntity = Prettify<
  VisualyOnGridEntity &
    TileEntity & {
      isPath?: boolean
    }
>

export type PathDrawEntity = Prettify<
  RenderableEntity & {
    isPathLine?: boolean
  }
>

export type GridTerrainEntity = {
  isGrid?: boolean
  grid?: HexGrid
}

export type Entity = Prettify<PathEntity & CharacterEntity & PathDrawEntity & GridTerrainEntity & ObstacleEntity>
