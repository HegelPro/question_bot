import { Context } from '../types'
import { MessageEvent } from '.'
import {send} from '../actions'

export function createCtx(event: MessageEvent): Context {
  return {
    event,
    payload: event.metaData.payload && JSON.parse(event.metaData.payload),
    send: (event, options) => send(event, options),
    reply: (message, attachment, keyboard) => send(event, {message, attachment, keyboard}),
    sendMessage: (message) => send(event, {message}),
    sendAttachment: (attachment) => send(event, {attachment}),
  }
}