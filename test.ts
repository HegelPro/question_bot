import { apiVkRequest } from "./src/vk/api"
import methods from "./src/vk/methods"
import * as fs from 'fs'
import Axios from "axios"

const hegelId = 541615064

apiVkRequest(methods.photos.getMessagesUploadServer)
  .then(({ data: { response }}) => {
    // console.log(response.upload_url)
    // console.log(response.album_id)
    // console.log(response.group_id)
    return response.upload_url
  })
  .then((url) => {
    return Axios.post(url, {
      photo: fs.createReadStream(__dirname + '/assets/images/1.png')
    }, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  })
  .then(({data}) => {
    // console.log(data)
    return data
  })
  .then(data => apiVkRequest(methods.photos.saveMessagesPhoto, data))
  .then(({data}) => {
    // console.log(data)
    return data
  })
