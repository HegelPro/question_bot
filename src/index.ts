import Bot, {Context} from './vk/bot';
import { gameSchemas, baseGameRoute } from './game/schemas';
import { renderFromVkSchema } from './vk/render';

type Commands = '/start'
const commands: Record<Commands, Commands> = {
  '/start': '/start'
}

type Quests = 'gamePayload'
const quests: Record<Quests, Quests> = {
  'gamePayload': 'gamePayload'
}

const myBot = new Bot()
myBot.connect()

myBot.on((ctx) => {
  if (ctx.event.text === commands["/start"]) {
    sendGameSchema(ctx, '11')
  }
  
  if (
    ctx.payload
    && ctx.payload.type === quests.gamePayload
    && typeof ctx.payload.data === 'string'
  ) {
    sendGameSchema(ctx, ctx.payload.data)
  }
})

const sendGameSchema = (ctx: Context, routeStr: string) => {
  const route = gameSchemas[routeStr]

  if (route) {
    if (Object.keys(route.routes).length > 0) {
      ctx.reply(route.text, renderFromVkSchema(route))
    } else {
      ctx.reply(route.text)
    }
  }
}