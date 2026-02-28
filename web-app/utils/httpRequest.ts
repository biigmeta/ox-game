import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";

type Headers = {
  "Content-Type": string;
  Authorization?: string;
};

type HTTPRequestType<T> = {
  method?: "get" | "post" | "put" | "patch" | "delete";
  endpoint?: string;
  data?: T;
  params?: Record<string, string>;
  header?: Record<string, string>;
};

export default async function httpRequest<T>({
  method = "get",
  endpoint = "",
  data = {} as T,
  params = {},
  header = {},
}: HTTPRequestType<T>) {
  // set up query string if params exist
  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    endpoint += `?${queryString}`;
  }

  // set up full endpoint
  const url = process.env.NEXT_PUBLIC_API_URL + endpoint;

  // set up header
  const initialHeaders: Headers = { "Content-Type": "application/json" };
  let headers = { ...initialHeaders, "x-app-source": "client" };
  const accessToken = useUserStore.getState().accessToken;

  // set authorization if token exist
  if (accessToken) {
    headers = { ...headers, Authorization: `Bearer ${accessToken}` };
  }

  // add more header argument
  headers = { ...headers, ...header };
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
      withCredentials: true, // include cookies in request
    });

    if (response?.data?.name === "PrismaClientInitializationError") {
      return {
        status: "error",
        message: "http request response error",
        error: response.data,
        data: null,
      };
    }

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: "http request response error",
      error: error,
      data: null,
    };
  }
}
