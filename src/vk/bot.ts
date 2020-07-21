import { apiVkRequest, connectVkPollApi } from './api';
import methods from './methods';
import { MessageEvent, Payload, PayloadCreator, CreatePayload } from './events';
import { convertMessage } from './converters';

abstract class BotConnection {
  private server: string
  private key: string

  abstract messangeHandler(event: MessageEvent): void

  eventHandler(updates: any[][]) {
    updates.forEach(([eventKey, ...params]: any) => {
      switch (eventKey) {
        case 4:
          const event = convertMessage(params)
          this.messangeHandler(event)
          break
        
        default:
          // console.log(eventKey, params)
          break
      }
    })
  }

  connectPoll(ts: string) {
    connectVkPollApi({
      server: this.server,
      key: this.key,
      ts,
    })
      .then(res => res.data)
      .then(({ts, updates}: {
        ts: string,
        updates: any[][],
      }) => {
        this.eventHandler(updates)
        this.connectPoll(ts)
      })
  }

  connect() {
    apiVkRequest(methods.messages.getLongPollServer)
      .then(res => res.data)
      .then(
        ({response}) => {
          this.server = response.server
          this.key = response.key

          this.connectPoll(response.ts)
        }
      )
  }
}

interface SendMessageOptions {
  message: string
  keyboard?: string
}

export interface Context<T = unknown> {
  event: MessageEvent

  send: (event: MessageEvent, options: SendMessageOptions) => void

  payload?: Payload<T>

  reply: (message: string, keyboard?: string) => void
}

type EventHandler<T = unknown> = (ctx: Context<T>) => void

class VBot extends BotConnection {
  private eventsHandlers: EventHandler[] = []

  createCtx(event: MessageEvent): Context {
    return {
      event,
      payload: event.metaData.payload && JSON.parse(event.metaData.payload),
      send: this.send,
      reply: (message, keyboard) => this.send(event, {message, keyboard})
    }
  }

  send(event: MessageEvent, {message, keyboard}: SendMessageOptions) {
    const random_id = Math.floor(Math.random() * 10**6)

    apiVkRequest(methods.messages.send, {
      peer_id: event.peer_id,
      message,
      random_id,
      keyboard,
    })
  }

  command(command: string, eventHandler: EventHandler) {
    this.addEvent((ctx) => {
      if (ctx.event.text === command) {
        eventHandler(ctx)
      }
    })
  }

  on<T>(createPayload: CreatePayload<T>, eventHandler: EventHandler<T>) {
    this.addEvent((ctx) => {
      if (ctx.payload) {
        if (ctx.payload.type ===  createPayload(undefined as T).type) {
          eventHandler(ctx as Context<T>)
        }
      }
    })
  }

  addEvent<T>(eventHandler: EventHandler<T>) {
    this.eventsHandlers.push(eventHandler)
  }

  messangeHandler(event: MessageEvent) {
    console.log('Event Message =>', event)

    if (event.random_id === 0) {
      const ctx = this.createCtx(event)

      this.eventsHandlers.forEach((eventHandler) => {
        eventHandler(ctx)
      })
    }
  }
}

export default VBot
