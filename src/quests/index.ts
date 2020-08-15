import questTwo from './two'
import { SchemaRoute } from '../game/schemas'
import { CreatePayload, payloadCreator } from '../vk/events'

type QuestsNames =
  'questTwo'

export interface Quest<QuestsName extends string> {
  name: QuestsName
  startVertex: string
  label: string
  schameRecord: Record<string, SchemaRoute>
  createPayload: CreatePayload<string>
  imageDir: string
} 

const quests: Record<QuestsNames, Quest<QuestsNames>> = {
  'questTwo': {
    name: 'questTwo',
    label: 'Тестовый 1',
    startVertex: '11',
    schameRecord: questTwo,
    createPayload: payloadCreator('questTwo'),
    imageDir: '/images/questTwo',
  },
}

export const createSelectPayload = payloadCreator<QuestsNames>('selectEvent')

export const questList = (Object.keys(quests) as QuestsNames[])
  .map(name => quests[name])

export default quests
