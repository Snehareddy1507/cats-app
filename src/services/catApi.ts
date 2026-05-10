import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Cat,
  Favourite,
  Vote,
  UploadResponse,
  AddFavouriteResponse,
  AddVoteRequest,
  AddVoteResponse,
} from '../types/catTypes';

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

  tagTypes: ['Cats', 'Favourites', 'Votes'],

  endpoints: (builder) => ({

    getCats: builder.query<Cat[], void>({
      query: () => 'images/?limit=20&order=DESC',
      providesTags: ['Cats'],
    }),

    uploadCat: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: 'images/upload',
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: ['Cats'],
    }),

    getFavourites: builder.query<Favourite[], void>({
      query: () => 'favourites',
      providesTags: ['Favourites'],
    }),

    addFavourite: builder.mutation<AddFavouriteResponse,string >({
      query: (image_id) => ({
        url: 'favourites',
        method: 'POST',
        body: {
          image_id,
        },
      }),

      invalidatesTags: ['Favourites'],
    }),

    removeFavourite: builder.mutation<void,number>({
      query: (favourite_id) => ({
        url: `favourites/${favourite_id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Favourites'],
    }),

    getVotes: builder.query<Vote[], void>({
      query: () => 'votes',
      providesTags: ['Votes'],
    }),
  
    addVote: builder.mutation<AddVoteResponse, AddVoteRequest>({
      query: ({ image_id, value }) => ({
        url: 'votes',
        method: 'POST',
        body: {
          image_id,
          value,
        },
      }),
     invalidatesTags: ['Votes']
    }),

  }),
});

export const {
  useGetCatsQuery,
  useUploadCatMutation,
  useGetFavouritesQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
  useGetVotesQuery,
  useAddVoteMutation,
} = catApi;