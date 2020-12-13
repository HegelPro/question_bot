import Bot from './vk/bot';
import { sendGameSchema, sendStartGameSchema, sendPhoto } from './send';
import commands from './commands';
import quests, { createQuestSelectPayload } from './game/quests'
import * as dotenv from 'dotenv'

dotenv.config({path: '.env.secret'})

export const access_token = process.env.VK_TOKEN as string
export const group_id = process.env.GROUP_ID as string

const myBot = new Bot({
  access_token,
  group_id,
})

myBot.command(commands['/photo'], sendPhoto)
myBot.command(commands['/start'], sendStartGameSchema)
myBot.command(commands['Начать'], sendStartGameSchema)

myBot.on(createQuestSelectPayload, ctx => {
  if (ctx.payload?.data === 'questOne') {
    sendGameSchema(quests.questOne)(ctx, quests.questOne.startVertex)
  } else if (ctx.payload?.data === 'questTwo') {
    sendGameSchema(quests.questTwo)(ctx, quests.questTwo.startVertex)
  }
})

myBot.on(quests.questOne.createPayload, ctx => {
  sendGameSchema(quests.questOne)(ctx, ctx.payload?.data)
})

myBot.on(quests.questTwo.createPayload, ctx => {
  sendGameSchema(quests.questTwo)(ctx, ctx.payload?.data)
})

myBot.addEvent((ctx) => {
  console.log('Event Message =>', ctx.event)
})

myBot.connect()
