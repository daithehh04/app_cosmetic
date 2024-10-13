import { configureStore } from "@reduxjs/toolkit";
import {
  authApiReducer,
  authApiMiddleware,
  authApiReducerPath,
} from "./slices/api/auth.slices.api";
import {
  productApiReducer,
  productApiMiddleware,
  productApiReducerPath,
} from "./slices/api/product.slices.api";
import {
  articleApiReducer,
  articleApiMiddleware,
  articleApiReducerPath,
} from "./slices/api/article.slices.api";
import {
  cartApiReducer,
  cartApiMiddleware,
  cartApiReducerPath,
} from "./slices/api/cart.slices.api";
import {
  userApiReducer,
  userApiMiddleware,
  userApiReducerPath,
} from "./slices/api/user.slices.api";
import {
  uploadApiReducer,
  uploadApiReducerPath,
  uploadApiMiddleware,
} from "./slices/api/upload.slices.api";
import {
  categoryProductApiReducer,
  categoryProductApiReducerPath,
  categoryProductApiMiddleware,
} from "./slices/api/category-product.slices.api";

export const store = configureStore({
  reducer: {
    [authApiReducerPath]: authApiReducer,
    [uploadApiReducerPath]: uploadApiReducer,
    [productApiReducerPath]: productApiReducer,
    [articleApiReducerPath]: articleApiReducer,
    [cartApiReducerPath]: cartApiReducer,
    [userApiReducerPath]: userApiReducer,
    [categoryProductApiReducerPath]: categoryProductApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiMiddleware)
      .concat(uploadApiMiddleware)
      .concat(productApiMiddleware)
      .concat(cartApiMiddleware)
      .concat(articleApiMiddleware)
      .concat(userApiMiddleware)
      .concat(categoryProductApiMiddleware),
});
