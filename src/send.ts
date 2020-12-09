import { renderFromVkSchema } from './render';
import {questList, Quest, createQuestSelectPayload} from './game/quests'
import { createButton } from './vk/utils/keyboard'
import { Context } from './vk/events/context'
import path = require('path')
import isExistFile from './utils/isExistFile'

const imgFormats = ['.gif', '.jpg', '.png'];

export const sendGameSchema = (quest: Quest<string>) => <T>(ctx: Context<T>, routeStr?: string) => {
  if (!routeStr) throw new Error('Route is undefinded Wrong routeStr')

  const route = quest.schameRecord[routeStr]

  if (!route) throw new Error('Route is undefinded')

  if (Object.keys(route.routes).length === 1) {
    isExistFile({
      dirName: quest.imageDir,
      fileName: route.id + '.jpg',
    })
      .then(path => path ? ctx.loadPhoto(path) : undefined)
      .then(photo => ctx.reply(route.text.slice(0, 500), photo))
      .then(() => sendGameSchema(quest)(ctx, route.routes[0]))
  }
  
  else if (Object.keys(route.routes).length > 1) {
    isExistFile({
      dirName: quest.imageDir,
      fileName: route.id + '.jpg',
    })
      .then(path => path ? ctx.loadPhoto(path) : undefined)
      .then(photo => ctx.reply(route.text.slice(0, 500), photo, renderFromVkSchema(quest)(route)))
  }

  else {
    sendStartGameSchema(ctx)
  }
}

export const sendStartGameSchema = (ctx: Context) => {
  ctx.reply('Выберети квест', undefined, JSON.stringify({
    "one_time": false,
    "buttons": questList
      .map(quest => [
        createButton({
          label: quest.label,
          payload: createQuestSelectPayload(quest.name),
        })
      ]),
  }))
}

export const sendPhoto = <T>(ctx: Context<T>) => {
  ctx.loadPhoto(path.join(__dirname, '../assets//images/eltsin1.jpg'))
    .then((attach) => ctx.reply('Фото', attach))
}

export const sendFile = <T>(ctx: Context<T>) => {
  ctx.loadPhoto(path.join(__dirname, '../assets//images/eltsin1.jpg'))
    .then((attach) => ctx.reply('Фото', attach))
}