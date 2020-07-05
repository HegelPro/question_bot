declare interface Message {
  text: string;
  payload: string;
}

declare interface Context {
  message: Message;
}

declare type Callback = (ctx: Context) => void;

declare class Bot {
  constructor(options: {
    token?: string,
  });

  on(callback: Callback): void;

  command(comand: string, callback: Callback): void;

  startPolling(): void;

  sendMessage(...params: any[]): any;
}

// declare module 'node-vk-bot-api' {
//   export = Bot;
// }

declare module 'node-vk-bot-api';
