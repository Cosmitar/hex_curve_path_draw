import { useEntities } from '@miniplex/react'
import { Html, Instance, Instances } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { DoubleSide } from 'three'
import { ECS } from '../../state/ECS'
import { ARCH_TILES } from '../../state/ECS/archetypes'
import { TileEntity } from '../../state/ECS/types'

let magicNumber = 0.866 // Math.sin(Math.PI/3)
let unit = 0.5 / magicNumber
export const HexaCellTerrain = () => {
  const tilesEntities = useEntities(ARCH_TILES)

  return tilesEntities ? (
    <Instances
      limit={1000} // Optional: max amount of items (for calculating buffer size)
      range={1000} // Optional: draw-range
    >
      <circleGeometry args={[1 * magicNumber, 6]} />
      <meshLambertMaterial emissive={0x666666} side={DoubleSide} color="white" transparent opacity={0.5} />

      <ECS.Entities in={tilesEntities} children={renderTile} />
    </Instances>
  ) : null
}

const renderTile = (entity: TileEntity) => {
  const [isHovered, setIsHovered] = useState<boolean>()

  const onClickHandler = (e: TileEntity) => ECS.world.update(e, { isSelected: true })

  useEffect(() => {
    isHovered ? ECS.world.update(entity, { isHovered: true }) : ECS.world.removeComponent(entity, 'isHovered')
  }, [isHovered])

  return (
    <ECS.Component name="three">
      <Instance
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        position={[-entity.tile?.center.x! * magicNumber, 0.01, entity.tile?.center.y! * magicNumber]}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        color={isHovered ? 'orange' : 'white'}
        onClick={() => onClickHandler(entity)}
      >
      {/* <Html>
        <div>({entity.coords?.x}|{entity.coords?.y})</div>
      </Html> */}
      </Instance>
    </ECS.Component>
  )
}
