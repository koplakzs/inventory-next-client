import clientHttp from "@/lib/axios";
import {
  ApiInterface,
  CategoryInterface,
  CategoryInterfacePaginated,
  DashboardInterface,
  LoginInterface,
} from "@/lib/interfaces";

import { CategorySchemaInfer, LoginSchemaInfer } from "@/lib/schema";

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

export const getCategory = (token: string, search?: string, page?: number) =>
  clientHttp.get<ApiInterface<CategoryInterfacePaginated>>(
    "/categories/all/paginated",
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

export const postCategory = (token: string, body: CategorySchemaInfer) =>
  clientHttp.post<ApiInterface>("/category", body, {
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
