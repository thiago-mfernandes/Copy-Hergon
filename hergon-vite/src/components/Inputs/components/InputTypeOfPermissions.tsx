import { RenderIf } from "@/components/RenderIf";
import { useAuth } from "@/contexts/Auth";
import { FormControl, FormLabel, Select, SelectProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputSelectProps extends SelectProps {
  name?: string;
  label?: string;
  register?: UseFormRegister<FieldValues>;
}

export const InputTypeOfPermissions = forwardRef<HTMLSelectElement,InputSelectProps>(
  ({ name= '', label, register, ...rest }, ref) => {

    const { user } = useAuth();
    
    return (
      <FormControl>
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
        <Select 
          placeholder="Selecionar" 
          {...rest} 
          backgroundColor="gray.200" 
          color="gray.700"
          ref={ref}
          //{...register("roles")}
        >
          {user?.roles.includes("Super Gestor") 
            ? //Usuário pagante
              <>
                <option value="Super Gestor">Super Gestor</option>
                <option value="Gestor">Gestor</option>
              </>
            : //Super Usuário
              <>
                <option value="Super Admin">Super Admin</option>
                <option value="Super Gestor">Super Gestor</option>
                <option value="Gestor">Gestor</option>
              </>
          }
        </Select>
      </FormControl>
    );
  }
);
