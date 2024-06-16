import type {
  ErrorResponse,
  LoginResponse,
  SuccessResponse,
} from "@/types/response";
import type { User } from "@/types/user";
import axios, { type AxiosError } from "axios";

async function apiLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post("/api/login", { email, password });
    const { data } = response.data as SuccessResponse<LoginResponse>;

    return data;
  } catch (error) {
    const customError = error as AxiosError<ErrorResponse>;

    if (customError.response?.data?.meta.code === 401) {
      throw new Error(customError.response?.data?.meta.message);
    }

    if (customError.response?.data?.meta?.message) {
      throw new Error(customError.response?.data?.meta.message);
    }

    throw new Error(customError.response?.statusText);
  }
}

async function apiLogout() {
  try {
    await axios.post("/api/logout");
  } catch (error) {
    const customError = error as AxiosError<ErrorResponse>;

    if (customError.response?.data?.meta.code === 401) {
      throw new Error(customError.response?.data?.meta.message);
    }

    if (customError.response?.data?.meta?.message) {
      throw new Error(customError.response?.data?.meta.message);
    }

    throw new Error(customError.response?.statusText);
  }
}

async function apiMe() {
  try {
    const response = await axios.get("/api/me");
    const { meta } = response.data as SuccessResponse<User>;

    if (meta.code !== 200 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as SuccessResponse<User>;

    return data;
  } catch (error) {
    const customError = error as AxiosError<ErrorResponse>;

    if (customError.response?.data?.meta.code === 401) {
      throw new Error(customError.response?.data?.meta.message);
    }

    if (customError.response?.data?.meta?.message) {
      throw new Error(customError.response?.data?.meta.message);
    }

    throw new Error(customError.response?.statusText);
  }
}

export { apiLogin, apiLogout, apiMe };
