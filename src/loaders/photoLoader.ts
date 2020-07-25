import * as FormData from 'form-data'
import * as fs from 'fs'
import * as path from 'path'

const photoLoader = (name: string): FormData => {
  const form = new FormData()
  const filePath = path.join(__dirname, '../../assets', name)
  console.log(filePath)
  form.append('photo', fs.createReadStream(filePath))
  return form
}

export default photoLoader
