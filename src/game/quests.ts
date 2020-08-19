import path = require('path')
import { SchemaRoute } from './schemas'
import { CreatePayload, payloadCreator } from '../vk/events'
import parseCvs from './parseCvs'
import * as fs from 'fs'

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
    schameRecord: parseCvs(fs.readFileSync(path.join(__dirname, '../../assets/shemas/questTwo.csv'), 'utf8')),
    createPayload: payloadCreator('questTwo'),
    imageDir: path.join(__dirname, '../../assets/images/questTwo'),
  },
}

export const createSelectPayload = payloadCreator<QuestsNames>('selectEvent')

export const questList = (Object.keys(quests) as QuestsNames[])
  .map(name => quests[name])

export default quests
