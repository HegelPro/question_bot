import { Context } from './events/context';

export type EventHandler<T = any> = (ctx: Context<T>) => void

export interface ConnectionState {
  server: string | undefined,
  key: string | undefined,
}

export interface VKBotState {
  eventsHandlers: EventHandler[]
}