// import * as VkBot from 'node-vk-bot-api';
// import * as Markup  from 'node-vk-bot-api/lib/markup';
// import { lineCommandKeys } from './lineCommands/commands';
// import commandsCallbacks from './lineCommands/callbacks';
// import userCommandsCallbacks from './userCommands/callbacks';
// import { userCommandKeys } from './userCommands/commands';

import Bot from './vk/bot';


const myBot = new Bot()
myBot.connect()

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
