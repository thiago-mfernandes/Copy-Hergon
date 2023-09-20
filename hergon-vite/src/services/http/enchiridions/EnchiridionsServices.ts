import { api } from "@/services/axios";

export interface EnchiridionsData {
  id: string;
  areaName: string;
  departmentName: string;
  companyName: string;
  role: string;
  workEnvironment: string;
  environmentConditions: string;
  toolsUsed: string;
  photograficRegister: string;
}

async function getAll() {
  try {
    const { data } = await api.get<EnchiridionsData[]>("/enchiridions"); 
    return data;
  } catch (error) {
    console.log('Erro ao obter todos os prontuários cadastrados: ', error);
  }
}

export const EnchiridionsServices = {
  getAll,
}