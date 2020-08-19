import { MessageEvent, Payload } from '.'
import {send} from '../actions'
import fs = require('fs')
import { apiVkRequest } from '../api'
import methods from '../methods'
import Axios, {AxiosResponse} from 'axios'
import FormData = require('form-data')

export interface SendMessageOptions {
  message?: string
  keyboard?: string
  attachment?: string
}

export interface Context<T = unknown> {
  event: MessageEvent

  send: (event: MessageEvent, options: SendMessageOptions) => Promise<unknown>

  payload?: Payload<T>

  reply: (message: string, attachment?: string, keyboard?: string) => Promise<unknown>

  sendMessage: (message: string) => Promise<unknown>

  sendAttachment: (attachment: string) => Promise<unknown>

  loadPhoto: (path: string) => Promise<string | undefined>
}

export function createContext(event: MessageEvent): Context {
  return {
    event,
    payload: event.metaData.payload && JSON.parse(event.metaData.payload),
    send: (event, options) => send(event, options),
    reply: (message, attachment, keyboard) => send(event, {message, attachment, keyboard}),
    sendMessage: (message) => send(event, {message}),
    sendAttachment: (attachment) => send(event, {attachment}),
    loadPhoto: (path) =>
      // TODO - тут ничего не происходит
      fs.promises.readFile(path, 'base64')
        .then(buffer => apiVkRequest(methods.photos.getMessagesUploadServer)
          .then(({data}) => data.response.upload_url)
          .then((url) => {
            const form = new FormData()
            form.append('photo', fs.createReadStream(path))

            return Axios.post(url, form, {
              headers: { 'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}` },
            })
          })
        )
        .then(({data}) => apiVkRequest(methods.photos.saveMessagesPhoto, data))
        .then(({data: {response}}: LoadedPhotoResponse) =>
          (response && response[0] && response[0].owner_id && response[0].id) ? `photo${response[0].owner_id}_${response[0].id}` : undefined
        )
  }
}

type LoadedPhotoResponse = AxiosResponse<{response?: [{owner_id: number, id: number}|undefined]}>