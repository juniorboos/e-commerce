import axios from 'axios'
// import {
// 	CONFIG_HEADERS,
// } from '../constants/Endpoints'

const CancelToken = axios.CancelToken
let cancel

export const getProducts = (payload) => {
  cancel && cancel()
  const { page, numItems } = payload

  const parameters = {
    page: page ? `&page=${page}` : '',
    numItems: numItems ? `&per_page=${numItems}` : '',
  }

  return axios
    .get(
      `https://api.github.com/search/users?q=c${
        parameters.page + parameters.numItems
      }`,
      {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c
        }),
        // headers: CONFIG_HEADERS(),
      }
    )
    .then((response) => response)
    .catch((error) => {
      return error
    })
}

export const getRelatedProducts = (payload) => {}
