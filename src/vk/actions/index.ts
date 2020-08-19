import { SendMessageOptions } from "../types"
import methods from "../methods"
import { apiVkRequest } from "../api"
import { MessageEvent } from "../events"

export function send(event: MessageEvent, {message, keyboard, attachment}: SendMessageOptions): Promise<unknown> {
  const random_id = Math.floor(Math.random() * 10**6)

  return apiVkRequest(methods.messages.send, {
    peer_id: event.peer_id,
    message,
    random_id,
    keyboard,
    attachment,
  })
}