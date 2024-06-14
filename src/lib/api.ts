import SchemaValidationError from "@/errors/SchemaValidationError";
import env from "@/schema/env";
import { Article, DetailArticle } from "@/types/articles";
import {
  ErrorResponse,
  LoginResponse,
  SchemaErrorResponse,
  SuccessResponse,
  UpdateTokenResponse,
} from "@/types/response";
import { User } from "@/types/user";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.DEV ? env.VITE_API_URL : env.VITE_PROD_API_URL;

const localStorageKey = "__singa_app_token__";
const localStorageKeyRefresh = "__singa_app_refresh_token__";
const localStorageKeyTheme = "__singa_app_theme__";

async function fetchWithAuth(url: string, options: AxiosRequestConfig = {}) {
  return axios(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorageFunctions.getToken()}`,
    },
  });
}

const localStorageFunctions = (() => {
  function getToken() {
    return localStorage.getItem(localStorageKey);
  }

  function getRefreshToken() {
    return localStorage.getItem(localStorageKeyRefresh);
  }

  function setToken(token: string) {
    localStorage.setItem(localStorageKey, token);
  }

  function setRefreshToken(token: string) {
    localStorage.setItem(localStorageKeyRefresh, token);
  }

  function removeToken() {
    localStorage.removeItem(localStorageKey);
  }

  function removeRefreshToken() {
    localStorage.removeItem(localStorageKeyRefresh);
  }

  function getTheme() {
    return localStorage.getItem(localStorageKeyTheme);
  }

  function setTheme(theme: string) {
    localStorage.setItem(localStorageKeyTheme, theme);
  }

  return {
    getToken,
    getRefreshToken,
    setToken,
    setRefreshToken,
    removeToken,
    removeRefreshToken,
    getTheme,
    setTheme,
  };
})();

const auth = (() => {
  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });

      const { data } = response.data as SuccessResponse<LoginResponse>;

      localStorageFunctions.setToken(data.token);
      localStorageFunctions.setRefreshToken(data.refreshToken);
    } catch (error) {
      const customError = error as AxiosError<ErrorResponse>;

      if (customError.response?.data?.meta.code === 401) {
        throw new Error(customError.response?.data?.meta.message);
      }

      throw new Error(customError.response?.data?.meta.message);
    }
  }

  async function logout() {
    try {
      await fetchWithAuth(`${baseUrl}/logout`, {
        method: "POST",
        data: {
          refreshToken: localStorageFunctions.getRefreshToken(),
        },
      });

      localStorageFunctions.removeToken();
      localStorageFunctions.removeRefreshToken();
    } catch (error) {
      const customError = error as AxiosError<ErrorResponse>;

      if (customError.response?.data?.meta.code === 401) {
        throw new Error(customError.response?.data?.meta.message);
      }

      throw new Error(customError.response?.data?.meta.message);
    }
  }

  async function refresh() {
    try {
      const token = localStorageFunctions.getToken();

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(`${baseUrl}/refresh`, {
        token: localStorageFunctions.getRefreshToken(),
      });

      const { data } = response.data as SuccessResponse<UpdateTokenResponse>;

      localStorageFunctions.setToken(data.token);

      const user = await me();

      return user;
    } catch (error) {
      const customError = error as AxiosError<ErrorResponse>;

      throw new Error(customError.response?.data?.meta.message);
    }
  }

  async function me() {
    try {
      const response = await fetchWithAuth(`${baseUrl}/users/me`);

      const { meta } = response.data as SuccessResponse<User>;

      if (meta.code !== 200 || meta.status !== "success") {
        throw new Error(meta.message);
      }

      const { data } = response.data as SuccessResponse<User>;

      return data;
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;

      if (schemaError.response?.data?.errors) {
        throw new SchemaValidationError(schemaError.response.data.errors);
      }

      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data?.meta.code === 401) {
        await refresh();
      }

      throw new Error(err.response?.data?.meta.message);
    }
  }

  return { login, logout, refresh, me };
})();

const articles = (() => {
  async function getArticles() {
    try {
      const response = await fetchWithAuth(`${baseUrl}/articles`);

      const { data } = response.data as SuccessResponse<Article[]>;

      return data;
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;

      if (schemaError.response?.data?.errors) {
        throw new SchemaValidationError(schemaError.response.data.errors);
      }

      const err = error as AxiosError<ErrorResponse>;
      throw new Error(err.response?.data?.meta.message);
    }
  }

  async function getArticleDetail(id: string) {
    try {
      const response = await fetchWithAuth(`${baseUrl}/articles/${id}`);

      const { data } = response.data as SuccessResponse<DetailArticle>;

      return data;
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;

      if (schemaError.response?.data?.errors) {
        throw new SchemaValidationError(schemaError.response.data.errors);
      }

      const err = error as AxiosError<ErrorResponse>;
      throw new Error(err.response?.data?.meta.message);
    }
  }

  async function addArticle({
    title,
    description,
    image,
  }: {
    title: string;
    description: string;
    image: FileList;
  }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image[0]);

    try {
      const response = await fetchWithAuth(`${baseUrl}/articles`, {
        method: "POST",
        data: formData,
      });

      const { data } = response.data as SuccessResponse<Article>;

      return data;
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;
      if (schemaError.response?.data?.errors) {
        throw new SchemaValidationError(schemaError.response.data.errors);
      }

      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        throw new Error(err.response.data.meta.message);
      }

      throw error;
    }
  }

  async function updateArticle({
    id,
    title,
    description,
    image,
  }: {
    id: string;
    title: string;
    description: string;
    image?: FileList;
  }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image[0]);
    }

    try {
      const response = await fetchWithAuth(`${baseUrl}/articles/${id}`, {
        method: "PUT",
        data: formData,
      });

      const { data } = response.data as SuccessResponse<Article>;

      return data;
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;

      if (schemaError.response?.data?.errors) {
        throw new SchemaValidationError(schemaError.response.data.errors);
      }

      const err = error as AxiosError<ErrorResponse>;

      if (err.response?.data?.meta.message) {
        throw new Error(err.response.data.meta.message);
      }
    }
  }

  async function deleteArticle(id: string) {
    try {
      const response = await fetchWithAuth(`${baseUrl}/articles/${id}`, {
        method: "DELETE",
      });

      const { data } = response.data as SuccessResponse<Article>;

      return data;
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;

      if (schemaError.response?.data?.errors) {
        throw new SchemaValidationError(schemaError.response.data.errors);
      }

      const err = error as AxiosError<ErrorResponse>;

      if (err.response?.data?.meta.message) {
        throw new Error(err.response.data.meta.message);
      }
    }
  }

  return {
    getArticles,
    getArticleDetail,
    addArticle,
    updateArticle,
    deleteArticle,
  };
})();

export { localStorageFunctions, auth, articles };
