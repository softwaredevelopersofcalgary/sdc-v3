export default function currentRouteIsActive(pathName: string, route: string) {
  const path = pathName.split("/")[1] as string;

  return [pathName].includes(route);
}
