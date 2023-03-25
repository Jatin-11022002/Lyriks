import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "e580d87de3msh0b7489fdfe45b66p10f89ejsn92a855183e70",
//     "X-RapidAPI-Host": "shazam.p.rapidapi.com",
//   },
// };

// fetch("https://shazam.p.rapidapi.com/charts/track", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

export const shazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "e580d87de3msh0b7489fdfe45b66p10f89ejsn92a855183e70"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/charts/track" }),
  }),
});

export const { useGetTopChartsQuery } = shazamApi;
