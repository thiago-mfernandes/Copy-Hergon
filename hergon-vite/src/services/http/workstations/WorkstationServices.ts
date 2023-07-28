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
  const { data } = await api.get<WorkstationData[]>("/workstations");
  return removeUserId(data);
}

async function add(newWorkstation: WorkstationData) {
  const response = await api.post("/workstations", newWorkstation);
  return response;
}

async function edit(editedWorkstation: WorkstationData) {
  const response = await api.put(`/workstations/${editedWorkstation.id}`, editedWorkstation);
  return response;
}

async function remove(id: string) {
  const response = await api.delete(`/workstations/${id}`);
  return response;
}

export const WorkstationServices = {
  getAll,
  add,
  edit,
  remove
}