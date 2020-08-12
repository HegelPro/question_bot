import * as FormData from 'form-data'
import * as fs from 'fs'

const unknownPhotoLoader = (fileStream: fs.ReadStream): FormData => {
  const form = new FormData()
  
  form.append('photo', fileStream)
  return form
}

export default unknownPhotoLoader
