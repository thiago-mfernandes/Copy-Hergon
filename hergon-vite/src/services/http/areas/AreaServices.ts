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
  const { data } = await api.get("/areas");
  return data;
}

async function add(newArea: AreaData) {
  const response = await api.post("/areas", newArea);
  return response;
}

async function edit(editedArea: Partial<AreaData>) {
  const response = await api.put(`/areas/${editedArea.id}`, editedArea);
  return response;
}

async function remove(id: string) {
  const response = await api.delete(`/areas/${id}`);
  return response;
}

export const AreaServices = {
  getAll,
  add,
  edit,
  remove,
}