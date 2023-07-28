import { forwardRef } from "react";
import { 
  FormControl, 
  FormLabel, 
  Input as ChakraInput, 
  InputProps as ChakraInputProps 
} from "@chakra-ui/react";
import { RenderIf } from "../../RenderIf";

interface InputProps extends ChakraInputProps {
  name?: string;
  label?: string;
  type?: string;
}

// type InputProps = InputHTMLAttributes<HTMLInputElement>;

// preciso receber as propriedades normais do input pra recer o type do input:
// entao faço a extensao da tipagem
// pego essas props como ...rest e repasso no componente

export const Input = forwardRef<HTMLInputElement,InputProps>(
  ({ type = 'text', name= '', label, ...rest }, ref) => {
    return (
      <FormControl gridColumn="1/3">
        <RenderIf conditional={!!label}>
          <FormLabel 
            color="gray.700" 
            fontWeight="semibold" 
            fontSize="sm" 
            htmlFor={name}
            marginBottom="0.25rem"
            >
              {label}
          </FormLabel>
        </RenderIf>
        <ChakraInput 
          gridColumn="1/3"
          backgroundColor="gray.100"
          variant="filled"
          size="md"
          ref={ref}
          name={name} 
          type={type}
          id={name} 
          {...rest}
        />
      </FormControl>
    );
  }
);
