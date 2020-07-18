import Bot, {Context} from './vk/bot';
import { renderFromSchema } from './vk/keyboard';
import { gameSchemas, baseGameRoute } from './game/schems';

type Commands = '/start'
const commands: Record<Commands, Commands> = {
  '/start': '/start'
}

const myBot = new Bot()
myBot.connect()

myBot.on((ctx) => {
  if (ctx.event.text === commands["/start"]) {
    sendGameSchema(ctx, baseGameRoute)
  }
  
  if (ctx.payload) {
    if (ctx.payload.type === 'gamePayload' && typeof ctx.payload.data === 'string') {
      sendGameSchema(ctx, ctx.payload.data)
    }
  }
})


const sendGameSchema = (ctx: Context, routeStr: string) => {
  const route = gameSchemas[routeStr]

  if (route) {
    if (Object.keys(route.routes).length > 0) {
      ctx.reply(route.text, JSON.stringify(renderFromSchema(route)))
    } else {
      ctx.reply('Конец игры')
    }
  }
}