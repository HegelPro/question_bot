import Bot, {Context} from './vk/bot';
import { renderFromVkSchema } from './render';
import commands from './commands';
import quests, {Quest} from './quests'

const myBot = new Bot()
myBot.connect()

myBot.on((ctx) => {
  if (ctx.event.text === commands["/start"]) {
    sendGameSchema(quests.gamePayload)(ctx, quests.gamePayload.startVertex)
  }
  
  if (
    ctx.payload
  ) {
    if (
      ctx.payload.type === quests.gamePayload.name
      && typeof ctx.payload.data === 'string'
    ) {
      sendGameSchema(quests.gamePayload)(ctx, ctx.payload.data)
    }
  }
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