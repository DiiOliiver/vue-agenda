import axios from "axios"

export const http = axios.create({
    baseURL: 'https://api-agenda-diego.herokuapp.com/',
    responseType: 'json'
})