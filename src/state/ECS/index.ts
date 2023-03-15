import createReactAPI from '@miniplex/react'
import { World } from '@miniplex/core'
import { Entity } from './types'

const world = new World<Entity>()

export const ECS = createReactAPI(world)
