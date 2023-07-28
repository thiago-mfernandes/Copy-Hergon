import { api } from "@/services/axios";
import { removeCompanyId } from "@/utils/removeCompanyId";

export interface DepartmentsData {
  id: string;
  companyId?: string;
  companyName?: string;
  departmentName?: string;
  description?: string;
}

async function getAll(){
  const { data } = await api.get<DepartmentsData[]>("/departments");
  return removeCompanyId(data);
}

async function getByCompanyName(companyName: string) {
  const { data } = await api.get<DepartmentsData[]>("/departments");
  const departments = data;
    
  // Filtrar os departments com base no companyName
  const departmentsByCompany = departments.filter((department) => 
    department.companyName === companyName
  );

  return departmentsByCompany;
}

async function add(newDepartment: DepartmentsData) {
  const response = await api.post("/departments", newDepartment)
  return response;
}

async function edit(editedDepartment: Partial<DepartmentsData>){
  const response = await api.put(`/departments/${editedDepartment.id}`, editedDepartment);
  return response;
}

async function remove(id: string){
  const response = await api.delete(`/departments/${id}`);
  return response;
}

export const DepartmentServices = {
  getAll,
  getByCompanyName,
  add,
  edit,
  remove,
}