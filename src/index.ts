import Bot, {Context} from './vk/bot';
import { renderFromVkSchema } from './vk/render';
import commands from './commands';
import { SchemaRoute } from './game/schemas';
import quests from './quests'

const myBot = new Bot()
myBot.connect()

myBot.on((ctx) => {
  if (ctx.event.text === commands["/start"]) {
    sendGameSchema(quests.gamePayload.schameRecord)(ctx, quests.gamePayload.startVertex)
  }
  
  if (
    ctx.payload
    && ctx.payload.type === quests.gamePayload.name
    && typeof ctx.payload.data === 'string'
  ) {
    sendGameSchema(quests.gamePayload.schameRecord)(ctx, ctx.payload.data)
  }
})

const sendGameSchema = (game: Record<string, SchemaRoute>) => (ctx: Context, routeStr: string) => {
  const route = game[routeStr]

  if (route) {
    if (Object.keys(route.routes).length > 0) {
      ctx.reply(route.text, renderFromVkSchema(game)(route))
    } else {
      ctx.reply(route.text)
    }
  }
}