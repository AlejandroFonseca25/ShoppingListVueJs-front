import axios from 'axios'

export const AXIOS = axios.create({
  baseURL: 'https://shopping-list-back.azurewebsites.net/api/v1'
})
