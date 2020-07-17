import {SchemaRoute, game, SchemaMap} from '../game/schems'
import {Payload} from './events'

interface CreateButtonOptions<T> {
  label: string;
  payload: T;
}

const createButton = <T>({label, payload}: CreateButtonOptions<T>) => {
  return {
    action: {
      type: "text",
      payload,
      label,
    },
  }
}

export const createKeyboard = () => {
  return {
    "one_time": true,
    "buttons": [
      [
        createButton({
          label: 'fff',
          payload: '3'
        }),
        createButton({
          label: '3',
          payload: "{\"button\": \"1\"}",
        })
      ]
    ]
  }
}

const createGamePayload = (route: string): Payload<string> => ({
  type: 'gamePayload',
  data: route,
})


export const renderFromSchema = (schema: SchemaRoute) => {
  const buttons = schema.routes.map((route) => (
    createButton({
      label: route.replace('\'', ''),
      payload: createGamePayload(route),
    })
  ))

  console.log(buttons)

  return {
    "one_time": true,
    "buttons": [buttons]
  }
}