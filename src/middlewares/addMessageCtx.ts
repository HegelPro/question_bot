import { Ctx } from "."

export interface CtxMessage extends Ctx {
  message: MessageEvent;
  reply: (message: string) => void;
}

const addMessageCtx = (event: MessageEvent) => {
  return (ctx: Ctx): CtxMessage => {
    return {
      ...ctx,
      message: event,
      reply: (message: string) => {
        this.send(event, message)
      }
    }
  }
}

export default addMessageCtx
