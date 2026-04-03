type ParsedData = {
  address: {
    city: string;
    county: string;
    country: string;
  };
};

export default function processLocationData(locationData: ParsedData) {
  const {
    address: { city, county, country },
  } = locationData;

  const processedLocationData = {
    location: `${city}, ${county}, ${country}`,
  };

  return processedLocationData;
}
