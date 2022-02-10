export const swrConfigValue = {
  fetcher: (url: string) => fetch(url).then(res => res.json())
}

/*
  * For more information about SWR options:
  * https://swr.vercel.app/docs/options
*/
