import questOne, {startVertex as startVertexOne} from './one'
import { SchemaRoute } from '../game/schemas'

type QuestsNames = 'gamePayload'

export interface Quest<QuestsName extends string> {
  name: QuestsName
  startVertex: string
  schameRecord: Record<string, SchemaRoute>
} 

const quests: Record<QuestsNames, Quest<QuestsNames>> = {
  'gamePayload': {
    name: 'gamePayload',
    startVertex: startVertexOne,
    schameRecord: questOne
  }
}

export default quests
