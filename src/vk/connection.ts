import { connectVkPollApi, apiVkRequest } from './api'
import methods from './methods'
import {VKBotState, VKBotConfigState } from './types'
import { createEventHandler } from './events/messageEvents'

const createConnectPoll = (configState: VKBotConfigState, botState: VKBotState) => (connectionState: {
  server: string,
  key: string,
  ts: string,
}) => {
  return connectVkPollApi({
    server: connectionState.server,
    key: connectionState.key,
    ts: connectionState.ts,
    ...configState.pool,
  })
    .then(res => res.data)
    .then(({ts, updates}: {
      ts: string,
      updates: any[][],
    }) => {
      createEventHandler(configState.api, botState)(updates)

      createConnectPoll(configState, botState)({...connectionState, ts})
    })
    .catch(error => {
      console.log('Connect pull Bot Error')
      console.error(error)

      setTimeout(() => {
        createConnect(configState, botState)()
      }, 500)
    })
}

export const createConnect = (configState: VKBotConfigState, botState: VKBotState) => () => {
  apiVkRequest(configState.api)(methods.messages.getLongPollServer)
    .then(res => res.data)
    .then(({response}) => createConnectPoll(configState, botState)(response))
    .catch(error => {
      console.log('Connect Bot Error')
      console.error(error)
    })
}
