import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catApi = createApi({
  reducerPath: 'catApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thecatapi.com/v1/',
    prepareHeaders: (headers) => {

      headers.set(
        'x-api-key',
        'live_6Khf6Qbye4L6HOG3aAJOM5bkA9uaNnTwyD54wXB7BbY34EiUihEwO2JU5P4tuRlb'
      );

      return headers;
    },
  }),

  tagTypes: ['Cats'],

  endpoints: (builder) => ({

    getCats: builder.query({
      query: () => 'images/?limit=20&order=DESC',
      providesTags: ['Cats'],
    }),

    uploadCat: builder.mutation({

      query: (formData) => ({
        url: 'images/upload',
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: ['Cats'],
    }),

  }),
});

export const { useGetCatsQuery, useUploadCatMutation,} = catApi;