import useSWR from "swr";
import fetcher from "./fetcher";

export default function useFetch(url: string, params?: any) {
  const urlAll = new URL(url);
  if (params) {
    urlAll.search = new URLSearchParams(params).toString();
  }
  return useSWR(urlAll.toString(), fetcher);
}
