import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@/configs/site.config";
import { endPointApi } from "@/helpers/endPointApi";
const { CATEGORY_PRODUCT } = endPointApi;

export const CateGoryProductSliceApi = createApi({
  reducerPath: "categoryProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  tagTypes: ["categoryProduct"],
  endpoints: (builder) => ({
    getAllCategoryProduct: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: CATEGORY_PRODUCT,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: (result, error, id) => [
        { type: "categoryProduct", id: "LIST" },
      ],
    }),
    createCategoryProduct: builder.mutation({
      query: (body) => ({
        url: `${CATEGORY_PRODUCT}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "categoryProduct", id: "LIST" }],
    }),
    updateCategoryProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${CATEGORY_PRODUCT}/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "categoryProduct", id: "LIST" },
      ],
    }),
    deleteCategoryProduct: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_PRODUCT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "categoryProduct", id },
        { type: "categoryProduct", id: "LIST" },
      ],
    }),
  }),
});
export const categoryProductApiReducer = CateGoryProductSliceApi.reducer;
export const categoryProductApiReducerPath =
  CateGoryProductSliceApi.reducerPath;
export const categoryProductApiMiddleware = CateGoryProductSliceApi.middleware;
export const {
  useGetAllCategoryProductQuery,
  useCreateCategoryProductMutation,
  useDeleteCategoryProductMutation,
  useUpdateCategoryProductMutation,
} = CateGoryProductSliceApi;
