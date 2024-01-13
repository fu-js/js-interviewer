export default async function requestBackend(
  url: string,
  params?: any,
  config: any = {}
) {
  const backendUrl = process.env.BACKEND_URL;
  let urlObj;
  if (!url.startsWith("http")) {
    urlObj = new URL(backendUrl + url);
  } else {
    urlObj = new URL(url);
  }
  if (params) {
    const searchParams = new URLSearchParams(params);
    urlObj.search = searchParams.toString();
  }
  return fetch(urlObj, config);
}
