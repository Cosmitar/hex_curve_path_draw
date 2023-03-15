import { ECS } from ".";
import { Entity, GridTerrainEntity, InteractiveEntity, TileEntity, TraceableEntity } from "./types";

export const ARCH_TILES = ECS.world.archetype<TileEntity>('isTile')
export const ARCH_HOVERED_TILES = ARCH_TILES.with('isHovered')
export const ARCH_POSITIONABLE_NON_TILE = ECS.world.archetype<Entity>().with('coords').without('isTile')
export const ARCH_SELECTED = ECS.world.archetype<Entity>().with('isSelected')
export const ARCH_HOVERED = ARCH_TILES.archetype<InteractiveEntity>().with('isHovered')
export const ARCH_MOVABLE_WITH_HEXA_PATH = ECS.world.archetype<TraceableEntity>('moveHexaPath')
export const ARCH_GRID = ECS.world.archetype<GridTerrainEntity>('isGrid')