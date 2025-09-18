import { apiSlice } from "../slices/apiSlice";

export const testApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    privado: builder.query({
      query: () => "/auth/privado",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
    }),
    publico: builder.query({
      query: () => "/auth/publico",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
    }),
  }),
});

export const { usePrivadoQuery, usePublicoQuery } = testApi;
