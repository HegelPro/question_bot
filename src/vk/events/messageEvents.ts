import { VKBotState, EventHandler, VKBotConfigState, VKApiConfig } from '../types'
import { CreatePayload, MessageEvent } from '.'
import { convertMessage } from '../converters/convertMessage'
import { createContext, Context } from './context'

export const createCommand = (botState: VKBotState) => <T>(command: string, eventHandler: EventHandler<T>) => {
  createAddEvent(botState)<T>((ctx) => {
    if (ctx.event.text === command) {
      eventHandler(ctx)
    }
  })
}

export const createOn = (botState: VKBotState) => <T>(createPayload: CreatePayload<T>, eventHandler: EventHandler<T>) => {
  createAddEvent(botState)<T>((ctx) => {
    if (ctx.payload) {
      if (ctx.payload.type ===  createPayload(undefined as any).type) {
        eventHandler(ctx as Context<T>)
      }
    }
  })
}

export const createAddEvent = (botState: VKBotState) => <T>(eventHandler: EventHandler<T>) => {
  botState.eventsHandlers.push(eventHandler)
}

export const createMessangeHandler = (apiConfigState: VKApiConfig, botState: VKBotState) => (event: MessageEvent) => {
  if (event.random_id === 0) {
    const ctx = createContext(apiConfigState)(event)

    botState.eventsHandlers.forEach((eventHandler) => {
      eventHandler(ctx)
    })
  }
}

export const createEventHandler = (apiConfigState: VKApiConfig, botState: VKBotState) => (updates: any[][]) => {
  if(updates.forEach) {
    
    updates.forEach((update) => {
      if(Array.isArray(update)) {
        const [eventKey, ...params]: any = update

        switch (eventKey) {
          case 4:
            const event = convertMessage(params)
            
            createMessangeHandler(apiConfigState, botState)(event)
            break
            
          default:
            console.log('Не поймано ', eventKey, params)
            break
        }
      } else {
        console.log(update)
      }
    })
  }
}