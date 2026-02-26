import { api } from '../../../shared/api/api';
import type { Product, ProductsResponse } from '../../../shared/types';

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, { limit?: number; skip?: number; search?: string }>({
      query: ({ limit = 10, skip = 0, search }) => {
        if (search) {
          return `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }
        return `/products?limit=${limit}&skip=${skip}`;
      },
      providesTags: ['Products'],
    }),
    getProductById: build.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
    getCategories: build.query<string[], void>({
      query: () => '/products/categories',
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetCategoriesQuery } = productsApi;
