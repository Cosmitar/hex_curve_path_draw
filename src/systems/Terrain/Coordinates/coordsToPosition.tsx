import { Vector2, Vector3 } from 'three'
import { ARCH_TILES } from '../../../state/ECS/archetypes'

export default function coordsToPosition(coords: Vector2, yValue = 0) {
  let magicNumber = 0.866 // Math.sin(Math.PI/3)
  const [cell] = ARCH_TILES.where(t => t.coords?.equals(coords) ?? false)
  const position = cell
    ? new Vector3(-cell.tile?.center.x! * magicNumber, yValue, cell.tile?.center.y! * magicNumber)
    : new Vector3(0, yValue, 0)

  return position
}
