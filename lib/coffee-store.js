//initalize unsplash

import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStoresPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  const unsplashResults = photos.response.results || [];
  return unsplashResults.map((result) => result.urls["small"]);
};
export const fetchCoffeeStores = async (
  latLong = "37.98116798198261%2C23.768529639971096",
  limit = 6
) => {
  const photos = await getListOfCoffeeStoresPhotos();
  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee stores", limit),

    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return (
    data.results?.map((venue, idx) => {
      return {
        // ...venue,
        id: venue.fsq_id,
        address: venue.location.address || "",
        name: venue.name,
        neighbourhood:
          venue.location.neighborhood || venue.location.crossStreet || "",
        imgUrl: photos[idx],
      };
    }) || []
  );
};

// const transformedData =
//   data?.results?.map((venue) => {
//     return {
//       id: venue.fsq_id,
//       ...venue,
//     };
//   }) || [];

// console.log(transformedData);

// console.log(data);

// return transformedData;
