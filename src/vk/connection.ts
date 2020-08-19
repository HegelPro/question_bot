import { connectVkPollApi, apiVkRequest } from './api'
import methods from './methods'
import {ConnectionState, VKBotState } from './types'
import { createEventHandler } from './events/messageEvents'

const createConnectPoll = (connectionState: ConnectionState, botState: VKBotState) => (ts: string) => {
  if(connectionState.server && connectionState.key) {
    connectVkPollApi({
      server: connectionState.server,
      key: connectionState.key,
      ts,
    })
      .then(res => res.data)
      .then(({ts, updates}: {
        ts: string,
        updates: any[][],
      }) => {
        createEventHandler(botState)(updates)

        createConnectPoll(connectionState, botState)(ts)
      })
      .catch(() => console.log('Connect Poll Bot Error'))
  } else {
    throw new Error('connectPoll')
  }
}

export const createConnect = (connectionState: ConnectionState, botState: VKBotState) => () => {
  apiVkRequest(methods.messages.getLongPollServer)
    .then(res => res.data)
    .then(
      ({response}) => {
        connectionState.server = response.server
        connectionState.key = response.key

        createConnectPoll(connectionState, botState)(response.ts)
      }
    )
    .catch(() => console.log('Connect Bot Error'))
}
