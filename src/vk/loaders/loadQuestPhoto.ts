import Axios from "axios"
import { apiVkRequest } from "../api"
import methods from "../methods"
import unknownPhotoLoader from "../../loaders/unknownPhotoLoader"
import * as fs from 'fs'

const loadPhoto = (photoFile: fs.ReadStream) => apiVkRequest(methods.photos.getMessagesUploadServer)
  .then(({data}) => data.response.upload_url)
  .then((url) => {
    const formPhoto = unknownPhotoLoader(photoFile)
    return Axios.post(url, formPhoto, {
      headers: { 'Content-Type': `multipart/form-data; boundary=${formPhoto.getBoundary()}` },
    })
  })
  .then(({data}) => apiVkRequest(methods.photos.saveMessagesPhoto, data))
  .then(({data: {response: [photo]}}) =>  `photo${photo.owner_id}_${photo.id}`)

export default loadPhoto