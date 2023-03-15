import { defineHex, Grid, Orientation, rectangle } from 'honeycomb-grid'

export const getGrid = (width = 10, height = 10) => {
  // 1. Create a hex class:
  const Tile = defineHex({ dimensions: 1, orientation: Orientation.POINTY })

  // 2. Create a grid by passing the class and a "traverser" for a rectangular-shaped grid:
  const grid = new Grid(Tile, rectangle({ width, height }))

  return grid
}
