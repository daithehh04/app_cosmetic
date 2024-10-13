import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@/configs/site.config";
import { endPointApi } from "@/helpers/endPointApi";
const { PRODUCT, PRODUCTS } = endPointApi;

export const productSliceApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: PRODUCTS,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: (result, error, id) => [{ type: "Products", id: "LIST" }],
    }),
    getProductDetail: builder.query({
      query: (id) => ({
        url: `${PRODUCTS}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${PRODUCTS}/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: `${PRODUCT}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
      ],
    }),
  }),
});
export const productApiReducer = productSliceApi.reducer;
export const productApiReducerPath = productSliceApi.reducerPath;
export const productApiMiddleware = productSliceApi.middleware;
export const {
  useGetAllProductsQuery,
  useGetProductDetailQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSliceApi;
