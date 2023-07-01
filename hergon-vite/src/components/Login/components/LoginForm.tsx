import { Input } from "@/components/Inputs/components/Input";
import { Box, Button, Flex, FormControl, HStack, Heading, Link, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { theme } from "@/styles/theme";
import { useLoginForm } from "../hooks/useLoginForm";


export function LoginForm(){

  const { errors, handleForm, handleSubmit, register, showToast} = useLoginForm();

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit(handleForm)}
      display="flex"
      flexDirection="column" 
      width={{ base: "100%", md: "60%", lg: "100%"}} 
      marginBottom="2.5rem"
    >
      <VStack spacing="4">
        <Heading fontSize="2rem" color="green.900">
          Entrar
        </Heading>

        <FormControl>
          <Input 
            {...register("userEmail", { required: true })}
            type="email" 
            placeholder="Digite seu e-mail" 
            aria-label="Digite seu e-mail"
          />
        </FormControl>
        {
          errors.userEmail?.message && 
          showToast(`${errors.userEmail.message}`, "error") 
        }
        <FormControl>
          <Input 
            {...register("userPassword", { required: true })}
            type="password" 
            placeholder="Digite sua senha"
            aria-label="Digite sua senha"
          />
        </FormControl>
        {
          errors.userPassword?.message && 
          showToast(`${errors.userPassword.message}`, "error") 
        }


        <Link as={ReactRouterLink} to="/forgotPassword">Esqueceu sua senha?</Link>
        <Flex>
          <HStack spacing="2">
            <Button
              type="submit"
              textColor="white"
              background={theme.color.orangeGradient}
              boxShadow="xl"
              padding="1rem 2.5rem"
              _hover={{ opacity: "0.8" }}
            >
              Login
            </Button>
            <Button
              textColor="gray.700"
              backgroundColor="transparent"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.200"
              padding="1rem 2.5rem"
              _hover={{ opacity: "1" }}
            >
              <Link as={ReactRouterLink} to="/loginRegister" _hover={{textDecoration: "underline"}}>
                Cadastrar
              </Link>
            </Button>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
}