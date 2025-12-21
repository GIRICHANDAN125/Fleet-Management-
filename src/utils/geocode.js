import axios from "axios";

export async function geocodePlace(place) {
  const res = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: place,
        format: "json",
        limit: 1,
      },
      headers: {
        "Accept-Language": "en",
      },
    }
  );

  if (!res.data || res.data.length === 0) {
    throw new Error("Location not found");
  }

  return [
    parseFloat(res.data[0].lat),
    parseFloat(res.data[0].lon),
  ];
}
