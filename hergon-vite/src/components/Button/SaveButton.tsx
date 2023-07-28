import { Button, HTMLChakraProps } from "@chakra-ui/react";

export function SaveButton({ ...rest }: HTMLChakraProps<"button">){
  return (
    <Button 
      type="submit"
      variant="solid"
      backgroundColor="green.500"
      color="white"
      padding="1rem 2rem"
      _hover={{ opacity: "0.8" }}
      {...rest}
    >
      Salvar
    </Button>
  );
}