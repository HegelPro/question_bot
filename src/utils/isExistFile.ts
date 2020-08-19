import * as fs from 'fs'
import path = require('path')

function isExistFile({
  fileName,
  dirName,
}: {
  fileName: string,
  dirName: string
}): Promise<string | undefined> {
  return new Promise((res, req) => {
    const dirPath = path.join(dirName)

    fs.readdir(dirPath, (err, files) => {
      files.forEach(file => {
        if (file === fileName) {
          res(path.join(dirName, fileName))
        }
      })
      res(undefined)
    })
  })
}

export default isExistFile
