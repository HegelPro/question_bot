import {Context} from './vk/bot';
import { renderFromVkSchema } from './render';
import {questList, Quest, createSelectPayload} from './quests'
import findPhotoFile from './utils/findPhotoFile'
import { createButton } from './vk/keyboard';
import loadQuestPhoto from './vk/loaders/loadQuestPhoto';
import loadPhoto from './vk/loaders/loadPhoto';

export const sendGameSchema = (quest: Quest<string>) => (ctx: Context, routeStr?: string) => {
  if (!routeStr) throw new Error('Route is undefinded Wrong routeStr')

  const route = quest.schameRecord[routeStr]

  if (!route) throw new Error('Route is undefinded')

  if (Object.keys(route.routes).length === 1) {
    findPhotoFile({
      dirName: quest.imageDir,
      fileName: route.id,
    })
      .then(photoFile => photoFile ? loadQuestPhoto(photoFile) : undefined)
      .then(photo => ctx.reply(route.text.slice(0, 600), photo))
      .then(() => sendGameSchema(quest)(ctx, route.routes[0]))
  }
  
  else if (Object.keys(route.routes).length > 1) {
    findPhotoFile({
      dirName: quest.imageDir,
      fileName: route.id,
    })
      .then(photoFile => photoFile ? loadQuestPhoto(photoFile) : undefined)
      .then(photo => ctx.reply(route.text.slice(0, 600), photo, renderFromVkSchema(quest)(route)))
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
          payload: createSelectPayload(quest.name),
        })
      ]),
  }))
}

export const sendPhoto = (ctx: Context) => {
  loadPhoto('/images/eltsin1.jpg')
    .then((attach) => ctx.reply('Фото', attach))
}