import { api } from "@/services/axios";
import { removeUserId } from "@/utils/removeUserId";

export interface WorkstationData {
  id: string;
  userId?: string; //esse item precisa ser opcional para funcionar o delete
  companyName: string;
  departmentName: string;
  areaName: string;
  role: string;
  description?: string;
}

async function getAll() {
  try {
    const { data } = await api.get<WorkstationData[]>("/workstations");
    return removeUserId(data);
  } catch (error) {
    console.error('Erro ao obter todos os postos de trabalho: ', error);
  }
}

async function add(newWorkstation: WorkstationData) {
  try {
    const response = await api.post("/workstations", newWorkstation);
    return response;
  } catch (error) {
    console.error('Erro ao adicionar o posto de trabalho: ', error);
  }
}

async function edit(editedWorkstation: WorkstationData) {
  try {
    const response = await api.put(`/workstations/${editedWorkstation.id}`, editedWorkstation);
    return response;
  } catch (error) {
    console.error('Erro ao editar o posto de trabalho: ', error);
  }
}

async function remove(id: string) {
  try {
    const response = await api.delete(`/workstations/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao remover o posto de trabalho: ', error);
  }
}

async function removeAll(data: string[]) {
  try {
    for(const id of data) {
      await remove(id);
    }
    return 200;
  } catch (error) {
    console.error('Erro ao remover todos os postos de trabalho: ', error);
  }
}

export const WorkstationServices = {
  getAll,
  add,
  edit,
  remove,
  removeAll,
}