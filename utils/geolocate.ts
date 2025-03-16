const GEOLOCATION_URL_BASE =
  "https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=0";
const GEOLOCATION_QUERY_PARAM = "q";

export async function geolocate(addr: string) {
  const u = new URL(GEOLOCATION_URL_BASE);
  u.searchParams.set(GEOLOCATION_QUERY_PARAM, addr);

  try {
    const response = await fetch(u.href);

    const rawResponse = await response.text();
    const rJson = JSON.parse(rawResponse);

    return {
      lat: parseFloat(rJson[0].lat),
      long: parseFloat(rJson[0].lon),
    };
  } catch (e) {
    console.log(e);
  }

  return undefined;
}
