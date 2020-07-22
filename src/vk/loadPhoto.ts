import { apiVkRequest } from "./api"
import methods from "./methods"
import * as FormData from 'form-data'
import * as fs from 'fs'
import Axios from "axios"

const form = new FormData()
form.append('photo', fs.createReadStream('/Users/hegelpro/Documents/vk-bot/assets/images/1.png'))

const loadPhoto = apiVkRequest(methods.photos.getMessagesUploadServer)
  .then(({ data: { response }}) => {
    // console.log(response.upload_url)
    // console.log(response.album_id)
    // console.log(response.group_id)
    return response.upload_url
  })
  .then((url) => {
    return Axios.post(url, form, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
      },
    })
  })
  .then(({data}) => apiVkRequest(methods.photos.saveMessagesPhoto, data))

export default loadPhoto