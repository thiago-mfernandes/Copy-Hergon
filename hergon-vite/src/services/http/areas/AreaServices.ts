import { api } from "@/services/axios";

export interface AreaData {
  id: string;
  companyName: string | undefined;
  departmentName: string | undefined;
  areaName: string | undefined;
  numberOfEmployees: string;
  description: string | undefined;
}

async function getAll() {
  try {
    const { data } = await api.get("/areas");
    return data;
  } catch (error) {
    console.log("Erro ao obter todos os registros das areas: ", error);
  }
}

async function add(newArea: AreaData) {
  try {
    const response = await api.post("/areas", newArea);
    return response;
  } catch (error) {
    console.log("Erro ao adicionar registros das areas: ", error);
  }
}

async function edit(editedArea: Partial<AreaData>) {
  try {
    const response = await api.put(`/areas/${editedArea.id}`, editedArea);
    return response;
  } catch (error) {
    console.log("Erro ao editar registros das areas: ", error);
  }
}

async function remove(id: string) {
  try {
    const response = await api.delete(`/areas/${id}`);
    return response;
  } catch (error) {
    console.log("Erro ao remover registros das areas: ", error);
  }
}

async function removeAll(data: string[]) {
  try {
    for(const id of data) {
      await remove(id);
    }
    return 200;
  } catch (error) {
    console.log("Erro ao remover todas as areas: ", error);
  }
}

export const AreaServices = {
  getAll,
  add,
  edit,
  remove,
  removeAll,
}