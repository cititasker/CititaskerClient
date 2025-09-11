import { LatLngBounds } from "leaflet";

export function validateCoordinates(
  lat: any,
  lng: any
): [number, number] | null {
  const numLat = Number(lat);
  const numLng = Number(lng);

  if (isNaN(numLat) || isNaN(numLng)) return null;
  if (numLat < -90 || numLat > 90) return null;
  if (numLng < -180 || numLng > 180) return null;

  return [numLat, numLng];
}

export function calculateMapBounds(tasks: ITask[]): LatLngBounds | undefined {
  const validCoords = tasks
    .map((task) => validateCoordinates(task.location[0], task.location[1]))
    .filter(Boolean) as [number, number][];

  if (validCoords.length === 0) return undefined;

  return new LatLngBounds(validCoords);
}

export function getMapCenter(tasks: ITask[]): [number, number] {
  if (tasks.length === 0) return [6.5244, 3.3792]; // Lagos default

  const validCoords = tasks
    .map((task) => validateCoordinates(task.location[0], task.location[1]))
    .filter(Boolean) as [number, number][];

  if (validCoords.length === 0) return [6.5244, 3.3792];

  const avgLat =
    validCoords.reduce((sum, [lat]) => sum + lat, 0) / validCoords.length;
  const avgLng =
    validCoords.reduce((sum, [, lng]) => sum + lng, 0) / validCoords.length;

  return [avgLat, avgLng];
}
