import { RenderIf } from "@/components/RenderIf";
import { useAuth } from "@/contexts/Auth";
import { api } from "@/services/axios";
import {
  Container,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  HStack,
  useBoolean
} from "@chakra-ui/react";
import { Select, OptionBase, GroupBase } from "chakra-react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useQuery } from "react-query";

interface InputValues {
  companiesGroup: CompaniesGroupSelect[]
}

interface CompaniesGroupSelect extends OptionBase {
  label?: string;
  value?: string;
}

export interface CompaniesByIdProps {
  id: string | number;
  userId: string | number;
  company: string;
}

interface InputExampleProps {
  label?: string;
}


export function InputExample({ label }: InputExampleProps){
  
  
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
  
  //retorno um novo objeto pra ser usado no Select
  const companiesGroupSelect = data?.map((item) => {
    return {
      label: item.company,
      value: item.company
    }
  })

  console.log(companiesGroupSelect)

  async function handleSubmitSelectGroup(data:any) {
    console.log(data)
  }

  const { control, handleSubmit, reset } = useForm({});
  
  return (
    <Container as="form" onSubmit={handleSubmit(handleSubmitSelectGroup)} padding="0">
      <Controller
        control={control}
        name="companiesGroup"
        rules={{ required: "É obrigatório selecionar uma empresa." }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { error }
        }) => (
          <FormControl py={4} isInvalid={!!error} id="companiesGroup">
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

            <Select<CompaniesGroupSelect, true, GroupBase<CompaniesGroupSelect>>
              //isMulti
              name={name}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              options={companiesGroupSelect}
              placeholder="Selecione"
              closeMenuOnSelect={false}
              variant="filled" 
            />

            <FormErrorMessage>{error && error.message}</FormErrorMessage>
          </FormControl>
        )}
      />
    </Container>
  );
}