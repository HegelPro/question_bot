import axios from "axios"

const ya_token = 'af530acf-573c-45ae-afbe-1f8be0b1f369'

const weatherCallback = (ctx: any) => {
  const kek = 'https://api.weather.yandex.ru/v1/informers?lat=53&lon=30.52896'

  axios.get(kek, {headers: {'X-Yandex-API-Key': ya_token}})
    .then(({data}) => {
      // console.log(data)
    })
    .catch()
}

export default weatherCallback;
