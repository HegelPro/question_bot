import fs = require('fs')
import path = require('path')
import { SchemaRoute } from './schemas'
import { CreatePayload, payloadCreator } from '../vk/events'
import parseCvs from './parseCvs'

type QuestsNames =
  'questOne'
  | 'questTwo'

export interface Quest<QuestsName extends string> {
  name: QuestsName
  startVertex: string
  label: string
  schameRecord: Record<string, SchemaRoute>
  createPayload: CreatePayload<string>
  imageDir: string
} 

const quests: Record<QuestsNames, Quest<QuestsNames>> = {
  'questOne': {
    name: 'questOne',
    label: 'Квест 1',
    startVertex: '11',
    schameRecord: parseCvs(fs.readFileSync(path.join(__dirname, '../../assets/shemas/questOne.csv'), 'utf8')),
    createPayload: payloadCreator('questOne'),
    imageDir: path.join(__dirname, '../../assets/images/questOne'),
  },
  'questTwo': {
    name: 'questTwo',
    label: 'Квест 2',
    startVertex: '11',
    schameRecord: parseCvs(fs.readFileSync(path.join(__dirname, '../../assets/shemas/questTwo.csv'), 'utf8')),
    createPayload: payloadCreator('questTwo'),
    imageDir: path.join(__dirname, '../../assets/images/questTwo'),
  },
}

export const createQuestSelectPayload = payloadCreator<QuestsNames>('selecQuesttEvent')

export const questList = (Object.keys(quests) as QuestsNames[])
  .map(name => quests[name])

export default quests
