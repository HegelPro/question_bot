import * as fs from 'fs'
import * as path from 'path'

const imgFormats = ['.gif', '.jpg', '.png'];

function findPhotoFile({
  fileName,
  dirName,
}: {
  fileName: string,
  dirName: string
}): Promise<fs.ReadStream | undefined> {
  return new Promise((res, req) => {
    const dirPath = path.join(__dirname, '../../assets', dirName)
    fs.readdir(dirPath, (err, files) => {
      imgFormats.forEach(format => {
        files.forEach(file => {
          if (file === fileName + format) {
            const filePath = path.join(dirPath, fileName + format)
            res(fs.createReadStream(filePath))
          }
        })
      })
      res(undefined)
    })
  })
}

export default findPhotoFile
