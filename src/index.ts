import Bot from './vk/bot';
import { sendGameSchema, sendStartGameSchema, sendPhoto } from './send';
import commands from './commands';
import quests, { createSelectPayload } from './quests'

const myBot = new Bot()

myBot.command(commands['/photo'], sendPhoto)
myBot.command(commands['/start'], sendStartGameSchema)
myBot.command(commands['Начать'], sendStartGameSchema)

myBot.on(createSelectPayload, (ctx) => {
  if (ctx.payload.data === 'questTwo') {
    sendGameSchema(quests.questTwo)(ctx, quests.questTwo.startVertex)
  }
  // else if (ctx.payload.data === 'questThree') {
  //   sendGameSchema(quests.questThree)(ctx, quests.questThree.startVertex)
  // }
})

myBot.on(quests.questTwo.createPayload, (ctx) => {
  sendGameSchema(quests.questTwo)(ctx, ctx.payload.data)
})

// myBot.on(quests.questThree.createPayload, (ctx) => {
//   sendGameSchema(quests.questThree)(ctx, ctx.payload.data)
// })

myBot.connect()
