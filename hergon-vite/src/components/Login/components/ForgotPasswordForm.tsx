import { Link as ReactRouterLink } from "react-router-dom";
import { 
  Box, 
  Button, 
  Flex, 
  FormControl, 
  HStack, 
  Heading, 
  Link, 
  VStack 
} from "@chakra-ui/react";
import { Input } from "@/components/Inputs/components/Input";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import { theme } from "@/styles/theme";

export function ForgotPasswordForm() {

  const { errors, handleForm, handleSubmit, register, showToast } = useForgotPasswordForm();

  return(
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
          Digite seu e-mail
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
              Enviar
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
              <Link as={ReactRouterLink} to="/" _hover={{textDecoration: "underline"}}>
                Login
              </Link>
            </Button>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
}