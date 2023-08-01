export default function currentRouteIsActive(pathName: string, route: string) {
  return [pathName].includes(route);
}
