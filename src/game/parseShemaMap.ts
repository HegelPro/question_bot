import { SchemaMap, SchemaRoute } from "./schemas";

const getRoutes = (routes: Record<number, SchemaMap>, currentRoute: string): string[] =>
  Object.keys(routes)
    .map(route => currentRoute + '/' + route);

const parseShemaMap = ({routes, ...schema}: SchemaMap, currentRoute: string): Record<string, SchemaRoute> =>
  Object.keys(routes)
    .reduce((res, route) => ({
      ...res,
      ...parseShemaMap(routes[route], currentRoute + '/' + route),
    }), {
      [currentRoute]: {...schema, routes: getRoutes(routes, currentRoute)},
    })

export default parseShemaMap
