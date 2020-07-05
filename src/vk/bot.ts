import { apiVkRequest, connectVkPollApi } from './api';
import methods from './methods';
import { MessageEvent } from './events';
import { convertMessage } from './converters';

import * as Markup  from 'node-vk-bot-api/lib/markup';

abstract class Bot {
  // abstract send(): void;
  // abstract connect(): void;
}

class VBot extends Bot {
  private server: string
  private key: string
  private random_ids: Record<number, number> = {}

  send(event: MessageEvent, message: string) {
    const random_id = Math.floor(Math.random() * 10^10)
    this.random_ids[event.peer_id] = random_id
    apiVkRequest(methods.messages.send, {
      peer_id: event.peer_id,
      message,
      random_id,
      keyboard: Markup.keyboard(['fff', 'fffgdf']).oneTime().toJSON(),
    })
  }

  messangeHandler(event: MessageEvent) {
    console.log('Event Message =>', event)
    
    if (event.random_id !== this.random_ids[event.peer_id]) {
      this.send(event, 'test');
    }
  }

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

export default VBot
