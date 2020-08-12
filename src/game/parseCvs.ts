import { SchemaRoute } from "./schemas"
import CSVToArray from "../utils/CSVToArray"

const parseCvs = (cvs: string): Record<string, SchemaRoute> =>
  CSVToArray(cvs)
    .reduce(
      (res, cur) => ({
        ...res,
        [cur[0]]: {
          answer: cur[1],
          doing: cur[2],
          text: cur[3],
          photoUrl: cur[4],
          routes: [cur[5], cur[6], cur[7], cur[8]].filter(Boolean),
        }
      }),
      {},
    )

export default parseCvs
