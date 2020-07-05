import * as dotenv from 'dotenv'

dotenv.config({path: '.env.secret'})

export const VK_TOKEN = process.env.VK_TOKEN as string
export const GROUP_ID = process.env.GROUP_ID as string

export const VK_API_CONFIG = {
  access_token: VK_TOKEN,
  v: '5.120',
  group_id: GROUP_ID,
}

export const VK_POLL_API_CONFIG = {
  act: 'a_check',
  wait: 25,
  mode: 128 + 8 + 2,
  version: 2
}