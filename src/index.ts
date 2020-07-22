import Bot, {Context} from './vk/bot';
import { renderFromVkSchema } from './render';
import commands from './commands';
import quests, {Quest} from './quests'
import {payloadCreator} from './vk/events'
import { createButton } from './vk/keyboard';
import loadPhoto from './vk/loadPhoto'


const myBot = new Bot()
myBot.connect()

type SelectGames = 'questOne' | 'questTwo'
const createSelectPayload = payloadCreator<SelectGames>('selectEvent')

myBot.command(commands["/photo"], (ctx) => {
  loadPhoto.then(({data: {response: [photo]}}) => {
    console.log(photo)
    const attach = `photo${photo.owner_id}_${photo.id}`
    console.log(attach)
    ctx.reply('Фото', attach)
  })
})

const startQuest = (ctx: Context) => {
  ctx.reply('Выберети квест', undefined, JSON.stringify({
    "one_time": true,
    "buttons": [[
      createButton({
        label: 'Тестовый квест 1',
        payload: createSelectPayload('questOne')
      }),
      createButton({
        label: 'Тестовый квест 2',
        payload: createSelectPayload('questTwo')
      }),
    ]]
  }))
}

myBot.command(commands["/start"], startQuest)
myBot.command(commands['Начать'], startQuest)

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
      ctx.reply(route.text, undefined, renderFromVkSchema(quest)(route))
    } else {
      ctx.reply(route.text)
    }
  }
}