interface SchemaMap {
  answer: string | null;
  text: string;
  photoUrl: string;
  routes: Record<number, SchemaMap>;
}

interface SchemaRoute {
  answer: string | null;
  text: string;
  photoUrl: string;
  routes: string[];
}

export const game: SchemaMap = {
  answer: null,
  text: 'start',
  photoUrl: '',
  routes: {
    11: {
      answer: '1',
      text: '1',
      photoUrl: '',
      routes: {
        21: {
          answer: '21',
          text: '21',
          photoUrl: '',
          routes: {}
        }
      }
    },
    12: {
      answer: '2',
      text: '2',
      photoUrl: '',
      routes: {
        22: {
          answer: '22',
          text: '22',
          photoUrl: '',
          routes: {}
        }
      }
    }
  }
}

const getRoutes = (routes: Record<number, SchemaMap>, currentRoute: string): string[] =>
  Object.keys(routes)
    .map(route => currentRoute + '/' + route);

export const generateRouts = ({routes, ...schema}: SchemaMap, currentRoute: string): Record<string, SchemaRoute> =>
  Object.keys(routes)
    .reduce((res, route) => ({
      ...res,
      ...generateRouts(routes[route], currentRoute + '/' + route),
    }), {
      [currentRoute]: {...schema, routes: getRoutes(routes, currentRoute)},
    })

console.log(generateRouts(game, '/quest'))