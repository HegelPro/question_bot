import Bot, {Context} from './vk/bot';
import { renderFromVkSchema } from './render';
import commands from './commands';
import quests, {Quest} from './quests'
import {payloadCreator} from './vk/events'
import { createButton } from './vk/keyboard';

const myBot = new Bot()
myBot.connect()

type SelectGames = 'questOne' | 'questTwo'
const createSelectPayload = payloadCreator<SelectGames>('selectEvent')

myBot.command(commands["/start"], (ctx) => {
  ctx.reply('Выберети квест', JSON.stringify({
    "one_time": true,
    "buttons": [[
      createButton({
        label: 'квест 1',
        payload: createSelectPayload('questOne')
      }),
      createButton({
        label: 'квест 2',
        payload: createSelectPayload('questTwo')
      }),
    ]]
  }))
})

myBot.on(createSelectPayload, (ctx) => {
  if (ctx.payload.data === 'questOne') {
    sendGameSchema(quests.questOne)(ctx, quests.questOne.startVertex)
  } else if (ctx.payload.data === 'questTwo') {
    sendGameSchema(quests.questTwo)(ctx, quests.questTwo.startVertex)
  }
})

myBot.on(quests.questTwo.createPayload, (ctx) => {
  sendGameSchema(quests.questTwo)(ctx, ctx.payload.data)
})

myBot.on(quests.questOne.createPayload, (ctx) => {
  sendGameSchema(quests.questOne)(ctx, ctx.payload.data)
})

const sendGameSchema = (quest: Quest<string>) => (ctx: Context, routeStr: string) => {
  const route = quest.schameRecord[routeStr]

  if (route) {
    if (Object.keys(route.routes).length > 0) {
      ctx.reply(route.text, renderFromVkSchema(quest)(route))
    } else {
      ctx.reply(route.text)
    }
  }
}