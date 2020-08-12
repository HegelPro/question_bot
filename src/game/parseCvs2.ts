import { SchemaRoute } from "./schemas"
import CSVToArray from "../utils/CSVToArray"

const parseCvs = (cvs: string): Record<string, SchemaRoute> =>
  CSVToArray(cvs)
    .filter(row => Boolean(row[0]))
    .reduce(
      (res, cur) => ({
        ...res,
        [cur[0]]: {
          answer: cur[1],
          text: cur[2],
          doing: '',
          photoUrl: cur[3],
          routes: [cur[4], cur[5], cur[6], cur[7]].filter(Boolean),
        }
      }),
      {},
    )

export default parseCvs
