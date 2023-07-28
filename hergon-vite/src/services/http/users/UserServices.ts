import { UserData } from "@/contexts/Auth/interfaces";
import { api } from "@/services/axios";

async function getAllUsers() {
  const { data } = await api.get<UserData[]>("/users");
  return data;
}

//dados para a tabela de usuarios
async function getUsersWithFilteredInfo(){
  const { data } = await api.get<UserData[]>("/users");

  //pegando somente os dados que vou usar na tabela
  const filteredUsers = 
    data.map(({ id, name, email, area, role, company }) => {
      //obtenho todos os id's em um array

      return { id, name, email, area, role, company };
    });
  
  return filteredUsers;
}  

async function add(newUser: UserData){
  const response = await api.post("/users", newUser);  
  return response;
}

async function edit(editedUser: Partial<UserData>){
  const response = await api.put(`/users/${editedUser.id}`, editedUser);
  return response;
}

async function remove(id: string){
  const response = await api.delete(`/users/${id}`);
  return response;
}

export const UserServices = {
  getAllUsers,
  getUsersWithFilteredInfo,
  add,
  edit,
  remove,
}