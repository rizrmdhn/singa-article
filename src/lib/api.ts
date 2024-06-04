import env from "@/schema/env";
import { Article } from "@/types/articles";
import {
  LoginResponse,
  Response,
  SuccessResponse,
  SuccessResponseWithoutData,
  UpdateTokenResponse,
} from "@/types/response";
import { User } from "@/types/user";
import axios, { AxiosRequestConfig } from "axios";

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
    const response = await axios.post(`${baseUrl}/login`, {
      email,
      password,
    });

    const { meta } = response.data as Response<LoginResponse>;

    if (meta.code !== 200 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as SuccessResponse<LoginResponse>;

    localStorageFunctions.setToken(data.token);
    localStorageFunctions.setRefreshToken(data.refreshToken);
  }

  async function logout() {
    const response = await fetchWithAuth(`${baseUrl}/logout`, {
      method: "POST",
      data: {
        refreshToken: localStorageFunctions.getRefreshToken(),
      },
    });

    const { meta } = response.data as SuccessResponseWithoutData;

    if (meta.code !== 200 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    localStorageFunctions.removeToken();
    localStorageFunctions.removeRefreshToken();
  }

  async function refresh() {
    const token = localStorageFunctions.getToken();

    if (!token) {
      return;
    }

    const response = await axios.post(`${baseUrl}/refresh`, {
      token: localStorageFunctions.getRefreshToken(),
    });

    const { meta } = response.data as Response<UpdateTokenResponse>;

    if (meta.code !== 200 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as SuccessResponse<UpdateTokenResponse>;

    localStorageFunctions.setToken(data.token);

    const user = await me();

    return user;
  }

  async function me() {
    const response = await fetchWithAuth(`${baseUrl}/users/me`);

    const { meta } = response.data as SuccessResponse<User>;

    if (meta.code !== 200 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as SuccessResponse<User>;

    return data;
  }

  return { login, logout, refresh, me };
})();

const articles = (() => {
  async function getArticles() {
    const response = await fetchWithAuth(`${baseUrl}/articles`);

    const { meta } = response.data as SuccessResponse<Article[]>;

    if (meta.code !== 200 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as SuccessResponse<Article[]>;

    return data;
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

    const response = await fetchWithAuth(`${baseUrl}/articles`, {
      method: "POST",
      data: formData,
    });

    const { meta } = response.data as SuccessResponse<Article>;

    if (meta.code !== 201 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as SuccessResponse<Article>;

    return data;
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
    image: File;
  }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    const response = await fetchWithAuth(`${baseUrl}/articles/${id}`, {
      method: "PUT",
      data: formData,
    });

    const { meta } = response.data as SuccessResponse<Article>;

    if (meta.code !== 200 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as SuccessResponse<Article>;

    return data;
  }

  async function deleteArticle(id: string) {
    const response = await fetchWithAuth(`${baseUrl}/articles/${id}`, {
      method: "DELETE",
    });

    const { meta } = response.data as SuccessResponse<Article>;

    if (meta.code !== 200 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as SuccessResponse<Article>;

    return data;
  }

  return { getArticles, addArticle, updateArticle, deleteArticle };
})();

export { localStorageFunctions, auth, articles };
