import * as FormData from 'form-data'
import * as fs from 'fs'
import * as path from 'path'

const photoLoader = (name: string): FormData => {
  const form = new FormData()
  form.append('photo', fs.createReadStream(path.join('/Users/hegelpro/Documents/vk-bot/assets') + name))
  return form
}

export default photoLoader
