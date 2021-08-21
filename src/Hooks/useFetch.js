import { useState, useEffect } from "react"
import axios from 'axios'
import CryptoJS from 'crypto-js'
export const useFetch = (searchTerm, startYear, endYear, comicId) => {
  const [response, setResponse] = useState({ data: null, loading: true, error: false })
  const sendRequest = async (searchTerm) => {
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
    if (searchTerm) {
      params.titleStartsWith = searchTerm
    }

    setResponse({ data: null, loading: true, error: false })
    try {
      let response;
      if(!comicId) {
        response = await axios.get(baseUrl, {
          params,
        })
      } else {
        response = await axios.get(`${baseUrl}/${comicId}`, {
          params: {
            apikey: publicKey,
          },
        })
      }

      return response
    } catch (err) {
      throw new Error(err)
    }
  }
  useEffect(() => {
    sendRequest(searchTerm)
      .then((response) => {
        setResponse({ data: response, loading: false, error: false })
      })
      .catch((error) => {
        setResponse({ data: null, loading: false, error: true })
        console.log(error)
      })
  }, [searchTerm, startYear, endYear])
  return response
}
export default useFetch