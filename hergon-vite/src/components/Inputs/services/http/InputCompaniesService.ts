import { api } from "@/services/axios";

//interface para receber os dados da api
interface CompaniesById {
  id: string;
  userId: string | number;
  companyName: string;
}

async function getByUserId(userId: string) {
  const { data } = await api.get<CompaniesById[]>("/companies", 
      { params:
        { userId: userId }
      });
  return data;
}

export const InputCompaniesService = {
  getByUserId,
}