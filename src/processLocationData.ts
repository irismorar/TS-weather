import type { LocationData } from "./locationSchema";

export default function processLocationData(locationData: LocationData) {
  if (!locationData?.address) {
    return {
      location: "Unknown location",
    };
  }
  const { city = "", county = "", country = "" } = locationData.address;

  return {
    location: [city, county, country]
      .filter((value) => Boolean(value))
      .join(", "),
  };
}
