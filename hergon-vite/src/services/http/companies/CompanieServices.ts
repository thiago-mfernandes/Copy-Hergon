import { api } from "@/services/axios";
import { removeUserId } from "@/utils/removeUserId";

export interface CompaniesData {
  id?: string;
  userId?: string;
  companyName: string;
}

async function getAll(){
  try {
    const { data } = await api.get<CompaniesData[]>("/companies");
    return removeUserId(data);
  } catch (error) {
    console.error('Erro ao obter registros das empresas: ', error);
  }
}

async function add(newCompany: CompaniesData) {
  try {
    const response = await api.post("/companies", newCompany);
    return response;
  } catch (error) {
    console.error('Erro ao adicionar a empresa: ', error);
  }
}

async function edit(editedCompany: Partial<CompaniesData>) {
  try {
    const response = await api.put(`/companies/${editedCompany.id}`, editedCompany);
    return response;
  } catch (error) {
    console.error('Erro ao editar a empresa: ', error);
  }
}

async function remove(id: string) {
  try {
    const response = await api.delete(`/companies/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao remover a empresa: ', error);
  }
}

async function removeAll(data: string[]) {
  try {
    for(const id of data) {
      await remove(id);
    }
    return 200;

  } catch (error) {
    console.error('Erro ao remover todas as empresas: ', error);
  }
}

export const CompanieServices = {
  getAll,
  add,
  edit,
  remove,
  removeAll,
}