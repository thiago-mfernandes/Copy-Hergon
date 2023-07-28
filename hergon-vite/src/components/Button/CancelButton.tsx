import { Button, HTMLChakraProps } from "@chakra-ui/react";

export function CancelButton({ ...rest }: HTMLChakraProps<"button">){
  return (
    <Button 
      {...rest}
      variant="outline" 
      colorScheme='red' 
      marginRight={3}
    >
      Cancelar
    </Button>
  );
}