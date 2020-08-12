import questTwo, {startVertex as startVertexTwo} from './two'
// import questThree, {startVertex as startVertexThree} from './three'
import { SchemaRoute } from '../game/schemas'
import { CreatePayload, payloadCreator } from '../vk/events'

type QuestsNames =
  'questTwo'
  // | 'questThree'

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
    startVertex: startVertexTwo,
    schameRecord: questTwo,
    createPayload: payloadCreator('questTwo'),
    imageDir: '/images/questTwo',
  },
  // 'questThree': {
  //   name: 'questThree',
  //   label: 'Голосуй или Бухай',
  //   startVertex: startVertexThree,
  //   schameRecord: questThree,
  //   createPayload: payloadCreator('questThree')
  // },
}

export const createSelectPayload = payloadCreator<QuestsNames>('selectEvent')

export const questList = Object.keys(quests).map(name => quests[name]) as Quest<QuestsNames>[]

export default quests
