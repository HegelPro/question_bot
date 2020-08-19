import { SchemaRoute } from "./game/schemas"
import { createButton } from "./vk/utils/keyboard"
import { Quest } from "./quests"

export const renderFromVkSchema = (quest: Quest<string>) => (schema: SchemaRoute) => {
  const buttons = schema.routes.map((route) => {
    const findSchame = quest.schameRecord[route]

    return createButton({
      label: findSchame.answer?.slice(0, 40) || 'Ответа нет',
      payload: quest.createPayload(route),
    })
  })

  return JSON.stringify({
    "one_time": false,
    "buttons": [buttons]
  })
}