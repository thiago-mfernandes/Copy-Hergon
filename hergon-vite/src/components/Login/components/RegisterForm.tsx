import { Input } from "@/components/Inputs/components/Input";
import { Box, Button, Flex, FormControl, HStack, Heading, Link, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { theme } from "@/styles/theme";
import { useState } from "react";
import { useRegisterForm } from "../hooks/useRegisterForm";


export function RegisterForm(){

  const [inputRadioPersonType, setInputRadioPersonType] = useState('Empresa');
  
  const { errors, handleForm, handleSubmit, register, showToast} = useRegisterForm();
  
  
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
          Informar Dados
        </Heading>

        <FormControl>
          <Input 
            {...register("userName", { required: true })}
            type="text" 
            placeholder="Digite seu nome" 
            aria-label="Digite seu nome"
          />
        </FormControl>
        {
          errors.userName?.message && 
          showToast(`${errors.userName.message}`, "error") 
        }

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
            {...register("userPhone", { required: true })}
            type="text" 
            placeholder="Digite seu telefone"
            aria-label="Digite seu telefone"
          />
        </FormControl>
        {
          errors.userPhone?.message && 
          showToast(`${errors.userPhone.message}`, "error") 
        }

        <RadioGroup onChange={setInputRadioPersonType} value={inputRadioPersonType}>
          <Stack direction='row'>
            <Radio 
              colorScheme="green" 
              value='Empresa'
              {...register("userType")}
            >
              Empresa
            </Radio>
            <Radio 
              colorScheme="green" 
              value='Prestador de Serviço'
              {...register("userType")}
            >
              Prestador de Serviço
            </Radio>
          </Stack>
        </RadioGroup>

        <FormControl>
          <Input 
            {...register("userCity", { required: true })}
            type="text" 
            placeholder="Digite sua cidade"
            aria-label="Digite sua cidade"
          />
        </FormControl>
        {
          errors.userCity?.message && 
          showToast(`${errors.userCity.message}`, "error") 
        }

        <FormControl>
          <Input 
            {...register("userState", { required: true })}
            type="text" 
            placeholder="Digite seu estado"
            aria-label="Digite seu estado"
          />
        </FormControl>
        {
          errors.userState?.message && 
          showToast(`${errors.userState.message}`, "error") 
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
              Solicitar Acesso
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