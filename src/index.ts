import Bot, {Context} from './vk/bot';
import { renderFromVkSchema } from './render';
import commands from './commands';
import quests, {Quest} from './quests'
import {payloadCreator} from './vk/events'
import { createButton } from './vk/keyboard';
import loadPhoto from './vk/loadPhoto'


const myBot = new Bot()

type SelectGames = 'questOne' | 'questTwo'
const createSelectPayload = payloadCreator<SelectGames>('selectEvent')

myBot.command(commands["/photo"], (ctx) => {
  loadPhoto('/images/eltsin1.jpg').then((attach) => {
    ctx.reply('Фото', attach)
  })
})

const startQuest = (ctx: Context) => {
  ctx.reply('Выберети квест', undefined, JSON.stringify({
    "one_time": false,
    "buttons": [
      [createButton({
        label: 'Тестовый квест 1',
        payload: createSelectPayload('questOne')
      })],
      [createButton({
        label: 'Голосуй или Бухай',
        payload: createSelectPayload('questTwo')
      })],
    ]
  }))
}

myBot.command(commands["/start"], startQuest)
myBot.command(commands['Начать'], startQuest)

myBot.on(createSelectPayload, (ctx) => {
  if (ctx.payload.data === 'questOne') {
    sendGameSchema(quests.questTwo)(ctx, quests.questTwo.startVertex)
  } else if (ctx.payload.data === 'questTwo') {
    sendGameSchema(quests.questThree)(ctx, quests.questThree.startVertex)
  }
})

myBot.on(quests.questThree.createPayload, (ctx) => {
  sendGameSchema(quests.questThree)(ctx, ctx.payload.data)
})

myBot.on(quests.questTwo.createPayload, (ctx) => {
  sendGameSchema(quests.questTwo)(ctx, ctx.payload.data)
})

const sendGameSchema = (quest: Quest<string>) => (ctx: Context, routeStr: string) => {
  const route = quest.schameRecord[routeStr]

  if (route) {
    if (Object.keys(route.routes).length > 0) {
      if(typeof route.photoUrl === 'string' && route.photoUrl.length > 10) {
        loadPhoto('/images/eltsin1.jpg')
          .then((attach) => {
            ctx
              .reply(route.doing.slice(0, 500))
              .then(() => ctx.reply(route.text, attach, renderFromVkSchema(quest)(route))
          )
        })
      } else {
        ctx
          .reply(route.doing.slice(0, 500))
          .then(() => ctx.reply(route.text, undefined, renderFromVkSchema(quest)(route)))
      }
    } else {
      ctx.reply(route.doing)
        .then(() => {
          startQuest(ctx)
        })
    }
  }
}

myBot.connect()
