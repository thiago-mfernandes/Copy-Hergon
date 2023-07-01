import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/queryClient";
import { AppProvider } from "./contexts";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider> {/**authContext, sideBarContext */}   
        <ChakraProvider theme={theme}>
          <Outlet/>   
        </ChakraProvider>        
      </AppProvider>
    </QueryClientProvider>
  )
}
