import useSWR from "swr";
import fetcher from "./fetcher";

export default function useFetch(url: string, params?: any) {
  const backendUrl = process.env.BACKEND_URL;
  let urlAll;
  if (url.startsWith("http")) {
    urlAll = new URL(url);
  } else {
    urlAll = new URL(`${backendUrl}${url}`);
  }
  if (params) {
    urlAll.search = new URLSearchParams(params).toString();
  }
  return useSWR(urlAll.toString(), fetcher);
}
