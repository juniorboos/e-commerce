import axios from 'axios'
// import {
// 	CONFIG_HEADERS,
// } from '../constants/Endpoints'

const CancelToken = axios.CancelToken
let cancel

const api = axios.create({
  baseURL: 'http://192.168.1.36:8080/api/',
})

export const getCategories = async (payload) => {
  cancel && cancel()

  return api
    .get('categories_count')
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const getAllProducts = async (payload) => {
  cancel && cancel()

  return api
    .get('products')
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const getCategoryProducts = async (payload) => {
  cancel && cancel()

  return api
    .get('products_by_category', {
      params: {
        name: payload.name,
      },
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const getProductById = async (payload) => {
  cancel && cancel()

  return api
    .get('product', {
      params: {
        id: payload,
      },
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const getRelatedProducts = async (payload) => {
  cancel && cancel()

  return api
    .get('related_products', {
      params: {
        id: payload,
      },
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const getBestSeller = async () => {
  cancel && cancel()

  return api
    .get('best_seller')
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}

export const checkout = async (payload) => {
  cancel && cancel()

  const data = {
    products: payload,
  }
  return api
    .post('create_relations', data)
    .then((response) => response.data.data)
    .catch((error) => {
      return error
    })
}
