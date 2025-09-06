import clientHttp from "@/lib/axios";
import {
  ApiInterface,
  CategoryInterface,
  CategoryInterfacePaginated,
  DashboardInterface,
  LoginInterface,
  ProductInterfacePaginated,
} from "@/lib/interfaces";

import {
  CategorySchemaInfer,
  LoginSchemaInfer,
  ProductFormType,
  ProductSchemaInfer,
} from "@/lib/schema";

export const postLogin = (body: LoginSchemaInfer) =>
  clientHttp.post<ApiInterface<LoginInterface>>("/auth", body);

export const postLogout = (token: string) =>
  clientHttp.post<ApiInterface>("/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getDashboard = (token: string) =>
  clientHttp.get<ApiInterface<DashboardInterface>>("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Category CRUD
export const getAllCategory = (token: string) =>
  clientHttp.get<ApiInterface<CategoryInterface[]>>("/category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getCategory = (token: string, search?: string, page?: number) =>
  clientHttp.get<ApiInterface<CategoryInterfacePaginated>>(
    "/categories/all/paginated",
    {
      params: {
        row_per_page: 10,
        search,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const postCategory = (token: string, body: CategorySchemaInfer) =>
  clientHttp.post<ApiInterface>("/category", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const putCategory = (
  token: string,
  id: number,
  body: CategorySchemaInfer
) =>
  clientHttp.put<ApiInterface>(`/category/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteCategory = (token: string, id: number) =>
  clientHttp.delete<ApiInterface>(`/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Product CRUD
export const getProduct = (token: string, search?: string, page?: number) =>
  clientHttp.get<ApiInterface<ProductInterfacePaginated>>(
    "/products/all/paginated",
    {
      params: {
        row_per_page: 5,
        search,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const postProduct = (token: string, body: ProductFormType) =>
  clientHttp.post<ApiInterface>("/product", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const putProduct = (token: string, id: number, body: ProductFormType) =>
  clientHttp.post<ApiInterface>(
    `/product/${id}`,
    { ...body, _method: "put" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const deleteProduct = (token: string, id: number) =>
  clientHttp.delete<ApiInterface>(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
