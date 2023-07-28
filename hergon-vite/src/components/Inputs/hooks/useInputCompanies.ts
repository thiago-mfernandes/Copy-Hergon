import { useAuth } from "@/contexts/Auth";
import { useQuery } from "react-query";
import { InputCompaniesService } from "../services/http/InputCompaniesService";

type CompanyOption = {
  label: string;
  value: string;
};

export function useInputCompanies(){
  //obtenho o usuario
  const { user } = useAuth();

  //obtenho as empresas via useQuery
  const { data, isLoading } = useQuery({
    queryKey: ['getCompaniesByUserId'],
    queryFn: () => InputCompaniesService.getByUserId(user.id),
    enabled: !!user.id
  });
  
  const companiesGroupOptions: CompanyOption[] = (data ?? [])
    .filter((item) => item.userId === user.id)
    .map((item) => ({
      label: item.companyName, 
      value: item.companyName, 
    }));

  return {
    user,
    companiesGroupOptions,
    isLoading,
    data
  }
}
