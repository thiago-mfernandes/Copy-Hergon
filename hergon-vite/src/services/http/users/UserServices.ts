import { UserData } from "@/contexts/Auth/interfaces";
import { api } from "@/services/axios";

async function getAllUsers() {
  try {
    const { data } = await api.get<UserData[]>("/users");
    return data;
  } catch (error) {
    console.error('Erro ao obter todos os usuários: ', error);
  }
}

async function getById(id: string) {
  try {
    // Utilize a rota /users/:id para obter um único usuário
    //se passar { params: { id: id }} - vai retornar um array
    const { data } = await api.get<UserData>(`/users/${id}`);
    return data;
  } catch (error) {
    console.error('Erro ao obter o usuário por id: ', error);
  }
}

//dados para a tabela de usuarios
async function getUsersWithFilteredInfo(){
  try {
    const { data } = await api.get<UserData[]>("/users");

    //pegando somente os dados que vou usar na tabela
    const filteredUsers = 
      data.map(({ id, name, email, area, role, company }) => {
        //obtenho todos os id's em um array

        return { id, name, email, area, role, company };
      });
    
    return filteredUsers;
  } catch (error) {
    console.error('Erro ao obter o usuário com informações filtradas: ', error);
  }
}  

async function add(newUser: UserData){
  try {
    const response = await api.post("/users", newUser);  
    return response;
  } catch (error) {
    console.error('Erro ao adicionar o usuário: ', error);
  }
}

async function edit(editedUser: Partial<UserData>){
  try {
    const response = await api.put(`/users/${editedUser.id}`, editedUser);
    return response;
  } catch (error) {
    console.error('Erro ao editar o usuário: ', error);
  }
}

async function remove(id: string){
  try {
    const response = await api.delete(`/users/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao remover o usuário: ', error);
  }
}

async function removeAll(data: string[]) {
  try {
    for(const id of data) {
      await remove(id);
    }
    return 200;
  } catch (error) {
    console.error('Erro ao remover todos os usuários: ', error);
  }
}

export const UserServices = {
  getAllUsers,
  getById,
  getUsersWithFilteredInfo,
  add,
  edit,
  remove,
  removeAll,
}