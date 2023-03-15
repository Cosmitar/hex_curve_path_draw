import { Grid, Hex, ring } from 'honeycomb-grid'
import createGraph, { Graph } from 'ngraph.graph'
import { ARCH_GRID, ARCH_TILES } from '../../state/ECS/archetypes'
import { Entity } from '../../state/ECS/types'

export const getWalkableHexGrid = () => {
  const [gridEntity] = ARCH_GRID
  const tilesTaken = ARCH_TILES.with('occupant')

  const graph = createGraph()
  const grid = gridEntity.grid!
  const unwalkableTiles = [...tilesTaken].filter(t => (t.occupant as Entity).isSelected !== true)

  // Iterate over the grid to create graph nodes:
  grid.forEach((hex: Hex) => {
    // ignores unwalkable tiles
    const isWalkable = !unwalkableTiles.find(ent => {
      return ent.tile?.equals(hex)
    })
    if (!isWalkable) return

    // adds node
    graph.addNode(`${hex.q}-${hex.r}`, hex)

    // adds links
    grid.traverse(ring({ radius: 1, center: hex })).forEach((neighbourHex: Hex) => {
      // avoids making links with unwalkable tiles
      const isWalkable = !unwalkableTiles.find(entity => {
        return entity.tile?.equals(neighbourHex)
      })

      if (isWalkable) {
        graph.addLink(`${hex.q}-${hex.r}`, `${neighbourHex.q}-${neighbourHex.r}`)
      }
    })
  })

  const retVal: [Graph, Grid<Hex>] = [graph, grid]

  return retVal
}
