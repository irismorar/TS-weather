export type ParsedLocationData = {
  address?: {
    city?: string;
    county?: string;
    country?: string;
  };
} | null;

export default function processLocationData(locationData: ParsedLocationData) {
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
