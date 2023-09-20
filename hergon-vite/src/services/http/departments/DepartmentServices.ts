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
  try {
    const { data } = await api.get<DepartmentsData[]>("/departments");
    return removeCompanyId(data);
  } catch (error) {
    console.error('Erro ao obter todos os setores: ', error);
  }
}

async function getByCompanyName(companyName: string) {
  try {
    const { data } = await api.get<DepartmentsData[]>("/departments");
    const departments = data;
      
    // Filtrar os departments com base no companyName
    const departmentsByCompany = departments.filter((department) => 
      department.companyName === companyName
    );

    return departmentsByCompany;
  } catch (error) {
    console.error('Erro ao obter o setor por nome: ', error);
  }
}

async function add(newDepartment: DepartmentsData) {
  try {
    const response = await api.post("/departments", newDepartment)
    return response;
  } catch (error) {
    console.error('Erro ao adicionar o setor: ', error);
  }
}

async function edit(editedDepartment: Partial<DepartmentsData>){
  try {
    const response = await api.put(`/departments/${editedDepartment.id}`, editedDepartment);
    return response;
  } catch (error) {
    console.error('Erro ao editar o setor: ', error);
  }
}

async function remove(id: string){
  try {
    const response = await api.delete(`/departments/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao remover os setores: ', error);
  }
}

async function removeAll(data: string[]) {
  try {
    for(const id of data) {
      await remove(id);
    }
    return 200;
  } catch (error) {
    console.error('Erro ao remover todos os setores: ', error);
  }
}

export const DepartmentServices = {
  getAll,
  getByCompanyName,
  add,
  edit,
  remove,
  removeAll
}