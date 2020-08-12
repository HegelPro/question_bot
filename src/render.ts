import { SchemaRoute } from "./game/schemas"
import { createButton } from "./vk/keyboard"
import { Quest } from "./quests"

export const renderFromVkSchema = (quest: Quest<string>) => (schema: SchemaRoute) => {
  const buttons = schema.routes.map((route) => (
    createButton({
      label: quest.schameRecord[route].answer.slice(0, 40),
      payload: quest.createPayload(route),
    })
  ))

  return JSON.stringify({
    "one_time": false,
    "buttons": [buttons]
  })
}