import transpose from "../utils/transpose"
import { SchemaRoute } from "./schemas"

const cvsMartix = (cvs: string) => cvs
  .split('\n')
  .map(
    str => str.split(',').filter((_, index) => index !== 0)
  )

const parseCvs = (cvs: string): Record<string, SchemaRoute> => transpose(cvsMartix(cvs)).reduce((res, cur) => ({
    ...res,
    [cur[0]]: {
      answer: cur[1],
      text: cur[2],
      url: cur[3],
      routes: cur[4].split('.').filter(Boolean),
    }
  }), {})

export default parseCvs
