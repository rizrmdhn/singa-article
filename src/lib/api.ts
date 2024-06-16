import SchemaValidationError from "@/errors/SchemaValidationError";
import type { Article } from "@/types/articles";
import type {
  ErrorResponse,
  LoginResponse,
  SchemaErrorResponse,
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

async function apiGetArticles() {
  try {
    const response = await axios.get("/api/articles");
    const { meta } = response.data as SuccessResponse<Article[]>;

    if (meta.code !== 200 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as SuccessResponse<Article[]>;

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

async function apiGetDetailArticles(id: string) {
  try {
    const response = await axios.get(`/api/articles/${id}`);
    const { meta } = response.data as SuccessResponse<Article>;

    if (meta.code !== 200 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as SuccessResponse<Article>;

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

async function apiAddArticle({
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
  formData.append("image", image[0]!);

  try {
    const response = await axios.post("/api/articles", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

async function apiUpdateArticle({
  id,
  title,
  description,
  image,
}: {
  id: string;
  title: string;
  description: string;
  image: FileList | undefined;
}) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (image?.[0]) {
    formData.append("image", image[0]);
  }

  try {
    const response = await axios.put(`/api/articles/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

async function apiDeleteArticles(id: string) {
  try {
    const response = await axios.delete("/api/articles", { data: { id } });

    const { meta } = response.data as SuccessResponse<null>;

    if (meta.code !== 200 || meta.status !== "success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as SuccessResponse<null>;

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

export {
  apiLogin,
  apiLogout,
  apiMe,
  apiGetArticles,
  apiGetDetailArticles,
  apiAddArticle,
  apiUpdateArticle,
  apiDeleteArticles,
};
