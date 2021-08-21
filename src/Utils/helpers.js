import axios from "axios"
import CryptoJS from "crypto-js"

export const sendRequest = async (
  setResponse,
  searchTerm,
  startYear,
  endYear,
  imageFetch,
  imageUrl,
  imageType
) => {
  const baseUrl = "https://gateway.marvel.com/v1/public/comics"
  const privateKey = "1d3ba9b1ef68a0345b2522dad7ececa46a1565fd"
  const publicKey = "2a41a5e6735ef5cda8895de39ec6597e"
  const ts = new Date().getTime()
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString()
  const params = {
    hash,
    apikey: publicKey,
    ts,
    dateRange: `${startYear}-01-01,${endYear}-31-12`,
  }
  if (searchTerm && !imageFetch) {
    params.titleStartsWith = searchTerm
  }

  setResponse({ data: null, loading: true, error: false })
  try {
    let response = await axios.get(
      !imageFetch ? baseUrl : `${imageUrl}/portrait_uncanny.${imageType}`,
      {
        params,
      }
    )
    setResponse({ data: response, loading: false, error: false })
  } catch (err) {
    setResponse({ data: null, loading: false, error: true })
    console.log(err)
  }
}
