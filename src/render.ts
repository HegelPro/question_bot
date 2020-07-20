import { Payload } from "./vk/events"
import { SchemaRoute } from "./game/schemas"
import { createButton } from "./vk/keyboard"
import { Quest } from "./quests"

const createGamePayload = (quest: Quest<string>) => (route: string): Payload<string> => ({
  type: quest.name,
  data: route,
})

export const renderFromVkSchema = (quest: Quest<string>) => (schema: SchemaRoute) => {
  const buttons = schema.routes.map((route) => (
    createButton({
      label: quest.schameRecord[route].answer,
      payload: createGamePayload(quest)(route),
    })
  ))

  return JSON.stringify({
    "one_time": true,
    "buttons": [buttons]
  })
}