import { useOnEntityAdded } from '@miniplex/react'
import { Node } from 'ngraph.graph'
import { apply, compose, equals, gt, isNil, length, none, when, __ } from 'ramda'
import { useEffect, useState } from 'react'
import { ECS } from '../../state/ECS'
import { ARCH_HOVERED, ARCH_SELECTED } from '../../state/ECS/archetypes'
import { Entity, PositionableEntity, TraceableEntity } from '../../state/ECS/types'
import { findHexPath } from './findHexPath'

export default function PathCalcHexSystem() {
  const [origin, setOrigin] = useState<Entity>()
  const [destination, setDestination] = useState<Entity>()

  useOnEntityAdded(ARCH_SELECTED, setOrigin)
  useOnEntityAdded(ARCH_HOVERED, setDestination)

  useEffect(() => {
    when(none(isNil), apply(calcPath))([origin, destination])
  }, [origin, destination])

  return null
}

const calcPath = async (orig: TraceableEntity & PositionableEntity, dest: PositionableEntity) => {
  const path = findHexPath(orig.coords?.x, orig.coords?.y, dest.coords?.x, dest.coords?.y)

  const assignPath = (p: Node<any>[]) => ECS.world.update(orig, { moveHexaPath: p })
  when(compose(gt(__, 0), length), assignPath)(path)

  const clearPath = () => ECS.world.removeComponent(orig, 'moveHexaPath')
  when(compose(equals(__, 0), length), clearPath)(path)
}
