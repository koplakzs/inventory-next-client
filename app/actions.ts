"use server";

import { cookies } from "next/headers";

export async function setAuthCookies(token: string, user: object) {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set("auth_user", JSON.stringify(user), {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function deleteAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete("auth_token");
  cookieStore.delete("auth_user");
}
export async function getAuthCookies() {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
}
