import questOne, {startVertex as startVertexOne} from './one'
import questTwo, {startVertex as startVertexTwo} from './two'
import { SchemaRoute } from '../game/schemas'
import { CreatePayload, payloadCreator } from '../vk/events'

type QuestsNames = 'questOne' | 'questTwo'

export interface Quest<QuestsName extends string> {
  name: QuestsName
  startVertex: string
  schameRecord: Record<string, SchemaRoute>
  createPayload: CreatePayload<string>
} 

const quests: Record<QuestsNames, Quest<QuestsNames>> = {
  'questOne': {
    name: 'questOne',
    startVertex: startVertexOne,
    schameRecord: questOne,
    createPayload: payloadCreator('questOne')
  },
  'questTwo': {
    name: 'questTwo',
    startVertex: startVertexTwo,
    schameRecord: questTwo,
    createPayload: payloadCreator('questTwo')
  },
}

export default quests
