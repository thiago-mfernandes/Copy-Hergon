import { Button } from "@chakra-ui/react";

interface SaveButtonProps {
  onClose: () => void;
}

export function SaveButton({ onClose }: SaveButtonProps){
  return (
    <Button 
      variant='solid'
      backgroundColor="green.500"
      color="white"
      padding="1rem 2rem"
      _hover={{ opacity: "0.8" }}
    >
      Salvar
    </Button>
  );
}