import Bot from './vk/bot';
import { renderFromSchema } from './vk/keyboard';
import { game, generateRouts } from './game/schems';
import randomArrayElement from './utils/randomArrayElement';

const routes = generateRouts(game, '/quest')

const myBot = new Bot()
myBot.connect()


const kek = ['ты пидор', 'слышь, чмо?!', 'Соси', 'Иди нахуй', 'ты пидор', 'ты пидор', 'ты пидор', 'ты пидор', 'ты пидор', 'ты пидор', 'ты пидор']
myBot.on((ctx) => {
  // console.log(renderFromSchema(routes['/quest']))

  
  if (ctx.event.text === '/start') {
    const route = routes['/quest']
    console.log('1 ->>', route)

    ctx.reply(route.text, JSON.stringify(renderFromSchema(route)))
  }
  else if (ctx.event.metaData.payload) {
    const payload = JSON.parse(ctx.event.metaData.payload as any)
    // console.log(payload.data)

    if (payload.type === 'gamePayload') {
      const route = routes[payload.data]
      console.log('2 ->>', route)

      if (route) {
        if (Object.keys(route.routes).length > 0) {
          ctx.reply(route.text, JSON.stringify(renderFromSchema(route)))
        } else {
          ctx.reply('Конец игры')
        }
      }
    }
  }
})
