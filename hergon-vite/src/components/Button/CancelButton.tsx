import { Button } from "@chakra-ui/react";

interface CancelButtonProps {
  onClose: () => void;
}

export function CancelButton({ onClose }: CancelButtonProps){
  return (
    <Button 
      variant="outline" 
      colorScheme='red' 
      marginRight={3} 
      onClick={onClose}
    >
      Cancelar
    </Button>
  );
}