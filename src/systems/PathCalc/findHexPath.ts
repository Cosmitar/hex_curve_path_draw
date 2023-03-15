import { Node } from 'ngraph.graph'
import { getWalkableHexGrid } from './getWalkableHexGrid'
import { aStar } from 'ngraph.path'

export const findHexPath = (fromQ = 0, fromR = 0, toQ = 0, toR = 0) => {
  const [graph, grid] = getWalkableHexGrid()

  const pathFinder = aStar(graph, {
    distance: (fromNode, toNode) => grid.distance(fromNode.data, toNode.data),
    heuristic: (fromNode, toNode) => grid.distance(fromNode.data, toNode.data),
  })

  // console.log(`${fromQ}-${fromR}`, `${toQ}-${toR}`);

  // const path = pathFinder.find(`0-5`, `1-6`)
  let path: Node[] = []
  try {
    path = pathFinder.find(`${fromQ}-${fromR}`, `${toQ}-${toR}`)
  } catch (e) {
    console.info(e)
  }

  return path
}
