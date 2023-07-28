import { createContext, useContext, useState, useEffect } from "react";
import { parseCookies, setCookie } from "nookies";
import { useNavigate } from "react-router-dom";

import { useShowToast } from "@/hooks/useShowToast";
import { api } from "@/services/axios";

import { AuthContextData, AuthProviderProps, SignInCredentials, UserData } from "./interfaces";

//props que meu contexto retorna e vai possuir:
const AuthContext = createContext({} as AuthContextData);

//provedor de contexto das props
export function AuthProvider({ children } : AuthProviderProps) {

  //precisa iniciar o estado user com um objeto vazio do tipo UserData
  const [user, setUser] = useState<UserData>({} as UserData);
  const isAuthenticated = !!user;
  //emitir os feedbacks aos usuarios
  const { showToast } = useShowToast();
  //redirecionamento do usuario
  const navigate = useNavigate();

  //após ter feito login, recupero os dados do usuario
  useEffect(() => {
    //parseCookies devolve uma lista de cookies salvos
    const { 'hergonAuth.token': token } = parseCookies();
    // como eu nao posso desestruturar por causa do ponto, passar o cookie e renomear

    if(token) {
      api.get(`/users?token=${token}`)
        //em resposta a minha requisicao
        .then(response => {
          // extrair os dados
          const { 
            id,
            name,
            email,
            avatarUrl,
            area,
            company,
            newsletter,
            openingVideo,
            myPlan,
            refreshToken,
            role,
            token,
            isDeleted
          } = response.data[0];
          // setar no estado
          setUser({
            id,
            name,
            email,
            avatarUrl,
            area,
            company,
            newsletter,
            openingVideo,
            myPlan,
            refreshToken,
            role,
            token,
            isDeleted
          })
        })
    }
  },[]);

  async function signIn({ userEmail, userPassword }: SignInCredentials) {

    try {
      const response = await api.get(`/users?email=${userEmail}&password=${userPassword}`);    
    
      if(response.data.length === 0) {
        return showToast("Usuário ou senha inválidos. Tente novamente", "error");
      } 
    
      if(response.data[0].token === "") {
        return showToast("Acesso expirado. Faça login novamente", "warning");
      }    
      
      //obter todos os dados, EXCETO password
      const { 
        id,
        name,
        email,
        avatarUrl,
        area,
        company,
        newsletter,
        openingVideo,
        myPlan,
        refreshToken,
        role,
        token,
        isDeleted,
      } = response.data[0];

      //setar no estado do user
      setUser({
        id,
        name,
        email,
        avatarUrl,
        area,
        company,
        newsletter,
        openingVideo,
        myPlan,
        refreshToken,
        role,
        token,
        isDeleted,
      });

      //salvar os tokens no cookies 
      /*
        * 1.parametro: se nao for ssr, é undefined, 
        * 2.param nome do token, 
        * 3.param valor do token 
        * 4.param objeto 
      */
      setCookie(undefined, "hergonAuth.token", token, {
        maxAge: 60 * 60 * 24 * 30, //30dias
        path: "/", //qualquer lugar da aplicacao tem acesso a esse cookie
      });

      setCookie(undefined, "hergonAuth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30dias
        path: "/", //qualquer lugar da aplicacao tem acesso a esse cookie
      });

      //atualizar no cabecalho de requisicoes o token do usuario logado
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      showToast("É bom ter você de volta!!", "info");
      navigate("/dashboard");
    } catch (error) {
      console.log(error)
    }       
  }

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

