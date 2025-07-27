import { api } from "./axios";
// import type { UserProps } from "../types/user";

export async function login(data: { email: string; password: string }) {
  return await api.post("auth/login", data);
}
