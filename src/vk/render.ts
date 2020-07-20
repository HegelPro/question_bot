import { Payload } from "./events"
import { SchemaRoute } from "../game/schemas"
import { createButton } from "./keyboard"

type Quests = 'gamePayload'
export const quests: Record<Quests, Quests> = {
  'gamePayload': 'gamePayload'
}


const createGamePayload = (route: string): Payload<string> => ({
  type: quests.gamePayload,
  data: route,
})

export const renderFromVkSchema = (game: Record<string, SchemaRoute>) => (schema: SchemaRoute) => {
  const buttons = schema.routes.map((route) => (
    createButton({
      label: game[route].answer,
      payload: createGamePayload(route),
    })
  ))

  return JSON.stringify({
    "one_time": true,
    "buttons": [buttons]
  })
}