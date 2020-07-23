import { apiVkRequest } from "./api"
import methods from "./methods"
import * as FormData from 'form-data'
import * as fs from 'fs'
import Axios from "axios"

const getPhoto = (name: string): FormData => {
  const form = new FormData()
  form.append('photo', fs.createReadStream('/Users/hegelpro/Documents/vk-bot/assets/images/' + name))
  return form
}

const loadPhoto = (name: string) => apiVkRequest(methods.photos.getMessagesUploadServer)
  .then(({data}) => {
    return data.response.upload_url
  })
  .then((url) => {
    const formPhoto = getPhoto(name)
    return Axios.post(url, formPhoto, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formPhoto.getBoundary()}`,
      },
    })
  })
  .then(({data}) => apiVkRequest(methods.photos.saveMessagesPhoto, data))
  .then(({data: {response: [photo]}}) =>  `photo${photo.owner_id}_${photo.id}`)

export default loadPhoto