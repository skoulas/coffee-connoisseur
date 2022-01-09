const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const response = await fetch(
    getUrlForCoffeeStores(
      "37.98116798198261%2C23.768529639971096",
      "coffee - stores",
      6
    ),

    {
      headers: {
        Authorization: "fsq3h3Q+yGwsBZMsbBDI+bVkHGTGk5zUmbnb1ETXRvpezS0=",
      },
    }
  );
  const data = await response.json();
  console.log(data);

  return data.results;
};
