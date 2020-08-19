import { VKBotState, EventHandler, Context } from '../types'
import { CreatePayload, MessageEvent } from '.'
import { convertMessage } from '../converters/convertMessage'
import { createCtx } from './context'

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

export const createMessangeHandler = (botState: VKBotState) => (event: MessageEvent) => {
  if (event.random_id === 0) {
    const ctx = createCtx(event)

    botState.eventsHandlers.forEach((eventHandler) => {
      eventHandler(ctx)
    })
  }
}

export const createEventHandler = (botState: VKBotState) => (updates: any[][]) => {
  updates.forEach(([eventKey, ...params]: any) => {
    switch (eventKey) {
      case 4:
        const event = convertMessage(params)
        createMessangeHandler(botState)(event)
        break
      
      default:
        break
    }
  })
}