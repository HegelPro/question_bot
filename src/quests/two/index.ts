import parseShemaMap from "../../game/parseShemaMap"
import { SchemaMap } from "../../game/schemas"

export const game: SchemaMap = {
  answer: null,
  text: 'Начало квеста',
  photoUrl: '',
  routes: {
    11: {
      answer: '11',
      text: 'Хуйня на шаге /11',
      photoUrl: '',
      routes: {
        21: {
          answer: '21',
          text: 'Хуйня на шаге /21',
          photoUrl: '',
          routes: {
            31: {
              answer: '31',
              text: 'Хуйня на шаге /31',
              photoUrl: '',
              routes: {}
            },
            32: {
              answer: '32',
              text: 'Хуйня на шаге /32',
              photoUrl: '',
              routes: {}
            }
          }
        },
        22: {
          answer: '22',
          text: 'Хуйня на шаге /22',
          photoUrl: '',
          routes: {}
        }
      }
    },
    12: {
      answer: '12',
      text: 'Хуйня на шаге /12',
      photoUrl: '',
      routes: {
        22: {
          answer: '22',
          text: 'Хуйня на шаге /22',
          photoUrl: '',
          routes: {}
        }
      }
    }
  }
}

export const startVertex = '/quest'

export default parseShemaMap(game, startVertex)