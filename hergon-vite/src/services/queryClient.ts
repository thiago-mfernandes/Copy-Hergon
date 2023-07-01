import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //toda vez que clicar ou "der foco" na tela, faz uma requisição
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 30 //30 seconds
    }
  }
});