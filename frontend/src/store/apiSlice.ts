import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './index';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7052/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product', 'Order', 'Cart', 'User'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // Product endpoints
    getProducts: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.searchTerm) searchParams.append('searchTerm', params.searchTerm);
        if (params?.categoryId) searchParams.append('categoryId', params.categoryId);
        return `products?${searchParams.toString()}`;
      },
      providesTags: ['Product'],
    }),

    // Cart endpoints
    getCart: builder.query({
      query: () => 'carts',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (cartItem) => ({
        url: 'carts/add',
        method: 'POST',
        body: cartItem,
      }),
      invalidatesTags: ['Cart'],
    }),
    checkoutCart: builder.mutation({
      query: (checkoutData) => ({
        url: 'carts/checkout',
        method: 'POST',
        body: checkoutData,
      }),
      invalidatesTags: ['Cart', 'Order'],
    }),

    // Order endpoints
    getOrders: builder.query({
      query: () => 'orders',
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProductsQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useCheckoutCartMutation,
  useGetOrdersQuery,
} = apiSlice;
