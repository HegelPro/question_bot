import axios from "axios"
import {VK_API_CONFIG, VK_POLL_API_CONFIG} from './config'

export const apiVkRequest = (method: string, params: object = {}) => {
  return axios.get(`https://api.vk.com/method/${method}`, {params: {
    ...VK_API_CONFIG,
    ...params,
  }})
}

export const connectVkPollApi = ({
  server,
  key,
  ts,
}: {
  server: string,
  key: string,
  ts: string,
}) => {
  return axios.get(`https://${server}`, {params: {
    key,
    ts,
    ...VK_POLL_API_CONFIG,
  }})
}
