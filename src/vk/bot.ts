import { apiVkRequest, connectVkPollApi } from './api';
import methods from './methods';
import { MessageEvent } from './events';
import { convertMessage } from './converters';

import { createKeyboard } from './keyboard';

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

interface Context {
  event: MessageEvent

  send: (event: MessageEvent, options: SendMessageOptions) => void

  reply: (message: string, keyboard?: string) => void
}

type EventHandler = (ctx: Context) => void

class VBot extends BotConnection {
  private eventsHandlers: EventHandler[] = []

  createCtx(event: MessageEvent): Context {
    return {
      event,
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
      .then(({data}) => console.log(data))
  }

  on(eventHandler: EventHandler) {
    this.eventsHandlers.push(eventHandler)
  }

  messangeHandler(event: MessageEvent) {
    // console.log('Event Message =>', event)

    if (event.random_id === 0) {
      const ctx = this.createCtx(event)

      this.eventsHandlers.forEach((eventHandler) => {
        eventHandler(ctx)
      })
    }
  }
}

export default VBot
