import { Payload, MessageEvent } from './events';

export interface SendMessageOptions {
  message?: string
  keyboard?: string
  attachment?: string
}

export interface Context<T = unknown> {
  event: MessageEvent

  send: (event: MessageEvent, options: SendMessageOptions) => Promise<any>

  payload?: Payload<T>

  reply: (message: string, attachment?: string, keyboard?: string) => Promise<any>

  sendMessage: (message: string) => Promise<any>

  sendAttachment: (attachment: string) => Promise<any>
}

export type EventHandler<T = any> = (ctx: Context<T>) => void

export interface ConnectionState {
  server: string | undefined,
  key: string | undefined,
}

export interface VKBotState {
  eventsHandlers: EventHandler[]
}