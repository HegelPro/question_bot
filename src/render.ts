import { SchemaRoute } from "./game/schemas"
import { createButton } from "./vk/keyboard"
import { Quest } from "./quests"

export const renderFromVkSchema = (quest: Quest<string>) => (schema: SchemaRoute) => {
  console.log(schema.routes)
  const buttons = schema.routes.map((route) => (
    createButton({
      label: quest.schameRecord[route].answer,
      payload: quest.createPayload(route),
    })
  ))

  return JSON.stringify({
    "one_time": true,
    "buttons": [buttons]
  })
}