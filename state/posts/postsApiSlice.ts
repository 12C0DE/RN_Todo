import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApiSlice = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => {
    return {
      getPosts: builder.query({
        query: () => "/posts",
      }),
    };
  },
});
