import { Grid as HGrid, Hex } from "honeycomb-grid"

export type HexTile = Hex
export type HexGrid = HGrid<Hex>
export type HexEntity = {
  /* contains position on the terrain */
  tile?: HexTile
}
export type HexCoords = HexTile