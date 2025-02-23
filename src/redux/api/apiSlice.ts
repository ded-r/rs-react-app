import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface PokemonQueryParams {
  limit: number;
  offset: number;
  search?: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ page, searchTerm }: { page: number; searchTerm?: string }) => {
        const params: PokemonQueryParams = {
          limit: 10,
          offset: (page - 1) * 10,
        };

        if (searchTerm) {
          params.search = searchTerm.toLowerCase();
        }

        return {
          url: 'pokemon',
          params,
        };
      },
    }),
    getPokemonDetails: builder.query({
      query: (name: string) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = apiSlice;
