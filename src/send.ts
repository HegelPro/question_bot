import {Context} from './vk/bot';
import { renderFromVkSchema } from './render';
import quests, {questList, Quest, createSelectPayload} from './quests'
import findPhotoFile from './utils/findPhotoFile'
import { createButton } from './vk/keyboard';
import loadQuestPhoto from './vk/loadQuestPhoto';
import loadPhoto from './vk/loadPhoto';

export const sendGameSchema = (quest: Quest<string>) => (ctx: Context, routeStr: string) => {
  const route = quest.schameRecord[routeStr]

  if (route) {
    if (Object.keys(route.routes).length === 1) {
      findPhotoFile({
        dirName: quest.imageDir,
        fileName: routeStr,
      })
        .then(photoFile => {
          if(photoFile) {
            return loadQuestPhoto(photoFile)
          }
        })
        .then((photo) => ctx.reply(route.text.slice(0, 600), photo))
        .then(() => sendGameSchema(quest)(ctx, route.routes[0]))
        .catch(() => console.log('Quest sendMessage Error'))
    }
    
    else if (Object.keys(route.routes).length > 1) {
      ctx
        .reply(route.text.slice(0, 600), undefined, renderFromVkSchema(quest)(route))
        .catch((error) => console.log(error))
    }

    else {
      sendStartGameSchema(ctx)
    }
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
    .catch(() => console.log('LoadPhoto "/photo" Error'))
}