import { 
  FormControl, 
  FormLabel, 
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps
} from "@chakra-ui/react";
import { RenderIf } from "../../RenderIf";
import { forwardRef } from "react";

interface InputProps extends ChakraTextareaProps {
  name?: string;
  label?: string;
  type?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement,InputProps>(
  ({ type = 'text', name= '', label, ...rest }, ref) => {
    return (
      <FormControl gridColumn="1/3">
        {/**caso o label exista (!!label verifica se é true) */}
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
        <ChakraTextarea 
          ref={ref}
          name={name} 
          type={type}
          id={name} 
          gridColumn="1/3"
          backgroundColor="gray.100"
          variant="filled"
          size="md"
          {...rest}
        />
      </FormControl>
    );
  }
);