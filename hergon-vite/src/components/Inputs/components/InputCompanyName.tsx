import { forwardRef } from "react";
import { RenderIf } from "../../RenderIf";
import { FormControl, FormLabel, Select, SelectProps } from "@chakra-ui/react";
import { useAuth } from "@/contexts/Auth";
import { api } from "@/services/axios";
import { useQuery } from "react-query";

interface InputSelectProps extends SelectProps {
  name?: string;
  label?: string;
}

export interface CompaniesByIdProps {
  id: string | number;
  userId: string | number;
  company: string;
}

export const InputCompanyName = forwardRef<HTMLInputElement,InputSelectProps>(
  ({ name= '', label, ...rest }, ref) => {


    const { user } = useAuth();

    async function getCompaniesByUserId() {
      const response = 
        await api.get<CompaniesByIdProps[]>("/companies", 
          { params:
            { userId: user.id }
          });
      return response.data;
    }
  
    const { data } = useQuery({
      queryKey: ['getCompaniesByUserId'],
      queryFn: getCompaniesByUserId,
      //enabled: !!user.id
    });

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
        >
          {data?.map((item) => (
            <option key={item.company} value="">{item.company}</option>
          ))}
        </Select>
      </FormControl>
    );
  }
);