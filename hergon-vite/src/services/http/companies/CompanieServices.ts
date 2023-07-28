import { api } from "@/services/axios";
import { removeUserId } from "@/utils/removeUserId";

export interface CompaniesData {
  id?: string;
  userId?: string;
  companyName: string;
}

async function getAll(){
  const { data } = await api.get<CompaniesData[]>("/companies");
  return removeUserId(data);
}

async function add(newCompany: CompaniesData) {
  const response = await api.post("/companies", newCompany);
  return response;
}

async function edit(editedCompany: Partial<CompaniesData>) {
  const response = await api.put(`/companies/${editedCompany.id}`, editedCompany);
  return response;
}

async function remove(id: string) {
  const response = await api.delete(`/companies/${id}`);
  return response;
}

export const CompanieServices = {
  getAll,
  add,
  edit,
  remove,
}