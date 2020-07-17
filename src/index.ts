// import * as VkBot from 'node-vk-bot-api';
// import * as Markup  from 'node-vk-bot-api/lib/markup';
// import { lineCommandKeys } from './lineCommands/commands';
// import commandsCallbacks from './lineCommands/callbacks';
// import userCommandsCallbacks from './userCommands/callbacks';
// import { userCommandKeys } from './userCommands/commands';

import Bot from './vk/bot';
import { renderFromSchema } from './vk/keyboard';
import { game, generateRouts } from './game/schems';

const routes = generateRouts(game, '/quest')

const myBot = new Bot()
myBot.connect()



myBot.on((ctx) => {
  // console.log(renderFromSchema(routes['/quest']))

  
  if (ctx.event.text === '/start') {
    const route = renderFromSchema(routes['/quest'])
    console.log('1 ->>', route)

    ctx.reply('test', JSON.stringify(route))
  }

  if (ctx.event.metaData.payload) {
    const payload = JSON.parse(ctx.event.metaData.payload as any)
    // console.log(payload.data)

    if (payload.type === 'gamePayload') {
      const route = routes[payload.data]
      console.log('2 ->>', route)

      if (route) {
        if (Object.keys(route.routes).length > 0) {
          ctx.reply(route.answer, JSON.stringify(renderFromSchema(route)))
        } else {
          ctx.reply('game over!')
        }
      }
    }
  }
})

// const bot = new VkBot(token);

// lineCommandKeys.forEach(command => {
//   bot.command(`/${command}`, commandsCallbacks[command])
// })

// bot.on((ctx: any) => {
//   // console.log(ctx)
//   // bot.sendMessage(ctx.form_id, 'Hello!')
//   ctx.reply('fff', 'photo541615064_457239232')

//   if (ctx.message.payload) {
//     const action = JSON.parse(ctx.message.payload)
//     // console.log(action)
  
//     if (action.button) {
//       userCommandKeys.forEach(userCommand => {
//         userCommandsCallbacks[userCommand](ctx)
//       })
//     }
//   }
// })

// bot.startPolling()
