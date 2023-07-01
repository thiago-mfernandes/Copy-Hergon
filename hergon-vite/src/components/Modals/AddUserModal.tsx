import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { Input, InputCompanyName, InputTypeOfPermissions } from "../Inputs";
import { CancelButton } from "../Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputExample } from "../Inputs/components/InputTest";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModalSchema = z.object({
  company: z.string(),
  roles: z.string(),
  name: z.string().min(3, "O nome deve conter no mínimo 3 caracteres."),
  email: z.string().min(6, 'Digite um email válido.'),
  area: z.string().min(1, "A area deve conter no mínimo 1 caractere."),
});

export type AddUserModalData = z.infer<typeof AddUserModalSchema>;


export function AddUserModal({ isOpen, onClose }: AddUserModalProps){
    
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(AddUserModalSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  
  function handleAddUserModal(data: any) {
    //console.log("clicado");
    console.log(data);
  }
  console.log(errors);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      isCentered 
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent margin="1rem">
        <ModalHeader 
          color="gray.700" 
          fontWeight="bold" 
          fontSize="2xl" 
          marginBottom="1.5rem"
        >
          Adicionar Usuário
        </ModalHeader>
        <ModalCloseButton top="1rem" right="1.25rem" />

        <ModalBody>
          <Box 
            as="form" 
            id="AddUserModal" //para o botao submit encontrar o form
            onSubmit={handleSubmit(handleAddUserModal)}
          >
            <VStack spacing="4">

              <InputCompanyName 
                label="Nome da Empresa"
                {...register("company")}
              />
              {
                <InputExample label="Tipo de Permissão"/>
                /**
                 * 
                 * https://codesandbox.io/s/chakra-react-select-single-react-hook-form-with-zod-validation-typescript-m1dqme?file=/app.tsx
                 * 
                 * 
                 */
              }

              <InputTypeOfPermissions
                label="Tipo de Permissão"
                //ref={register}
                {...register("roles")}
              />

              <Input 
                type="text" 
                placeholder="Informe" 
                label="Nome do usuário"
                {...register("name", { required: true })}
              />

              <Input 
                type="email" 
                placeholder="user@gmail.com" 
                label="Email"
                {...register("email", { required: true })}
              />

              <Input 
                type="text" 
                placeholder="Informe" 
                label="Nome da Área"
                {...register("area", { required: true })}
              />
            </VStack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <CancelButton onClose={onClose} />

          <Button 
            type="submit"
            variant='solid'
            backgroundColor="green.500"
            color="white"
            padding="1rem 2rem"
            _hover={{ opacity: "0.8" }}
            form="AddUserModal" //para o form ouvir o submit
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}