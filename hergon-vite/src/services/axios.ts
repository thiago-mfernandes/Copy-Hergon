import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies['hergonAuth.token']}`
  }
});

//interceptar requisicoes antes da requisicao ser feita ao backend

/**
 * 1.parm: o que fazer se a resposta der: 'success'
 */
api.interceptors.response.use(response => {
  //'success'
  return response;
}, (error: AxiosError) => {
  //'error'
  //ver o erro que o backend retorna
  console.log(error);
})