import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useShowToast } from "@/hooks/useShowToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from 'uuid';
import { queryClient } from "@/services/queryClient";
import { UserServices } from "@/services/http/users/UserServices";
import { UserData } from "@/contexts/Auth/interfaces";
import { objIsEmpty } from "@/utils/isObjectEmpty";
import { UserModalFormTypes } from "../types/UserModalFormTypes";
import { useUserStore } from "../store/useUserStore";
import { formUserModalSchema } from "../schema/formUserModalSchema";
import { useCheckboxStore } from "@/components/Checkbox/store/useCheckboxStore";
import { useDeleteManyStore } from "../../DeleteManyModal/store/useDeleteManyStore";

export function useUserModal() {

  const { showToast } = useShowToast();
  const navigate = useNavigate();
  const { onDeleteManyModalClose } = useDeleteManyStore();
  const { setSelectedCheckbox } = useCheckboxStore();
  const { userToEdit, onClose } = useUserStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  }
    = useForm<UserModalFormTypes>({
      resolver: zodResolver(formUserModalSchema),
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      defaultValues: {
        company: null,
        role: null,
        name: "",
        email: "",
        area: "",
      }
    });

  async function addUser(data: UserModalFormTypes) {
    //construo um objeto do tipo
    const newUser: UserData = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      avatarUrl: null,
      area: data.area,
      company: data.company?.value,
      password: null,
      newsletter: null,
      openingVideo: true,
      myPlan: null,
      refreshToken: null,
      role: data.role?.value,
      token: null,
      isDeleted: false,
    }
    //envio a requisicao
    const response = await UserServices.add(newUser);

    if (response?.status === 201) {
      //em caso de sucesso
      showToast("Usuário criado com sucesso.", "info");
      //revalidar os dados da tabela de usuarios
      queryClient.invalidateQueries(["usersData"]);
      //limpar o modal
      reset();
      //fechar o modal
      onClose();
    } else {
      showToast("Não foi possível adicionar o usuário. Tente Novamente.", "error");
    }

    navigate("/users");
  }

  async function editUser(id: string, data: UserModalFormTypes) {
    
    //pegar o usuario pelo id:
    const userByIdToEdit = await UserServices.getById(id);
    
    if(userByIdToEdit !== undefined) {

      const editedUser: UserData = { 
        id: userByIdToEdit.id,
        name: data.name,
        email: data.email,
        avatarUrl: userByIdToEdit.avatarUrl,
        area: data.area,
        company: data.company?.value,
        password: userByIdToEdit.password,
        newsletter: userByIdToEdit.newsletter,
        openingVideo: true,
        myPlan: userByIdToEdit.myPlan,
        refreshToken: userByIdToEdit.refreshToken,
        role: data.role?.value,
        token: userByIdToEdit.token,
        isDeleted: userByIdToEdit.isDeleted,
       };

       //envio a requisicao
       const response = await UserServices.edit(editedUser);
   
       if (response?.status === 200) {
         //em caso de sucesso
         showToast("Usuário editado com sucesso.", "info");
         //revalidar os dados da tabela de usuarios
         queryClient.invalidateQueries(["usersData"]);
         //limpar o modal
         //reset();
         //fechar o modal
         onClose();
       } else {
         showToast("Não foi possível editar o usuário. Tente Novamente.", "error");
       }
   
       navigate("/users");
    }
    
  }

  async function removeUser(id: string) {
    //envio a requisição 
    const response = await UserServices.remove(id);

    if (response?.status === 200) {
      //em caso de sucesso
      showToast("Usuário excluído com sucesso.", "info");
      //revalidar os dados da tabela de usuarios
      queryClient.invalidateQueries(["usersData"]);
      //limpar o modal
      reset();
      //fechar o modal
      onClose();
    } else {
      showToast("Não foi possível excluir o usuário. Tente Novamente.", "error");
    }
  }

  async function removeAllUsers(data: string[]) {
    
    const response = await UserServices.removeAll(data);
    

    if(response == 200) {
      showToast("Usuários removidas com sucesso", "info");
      queryClient.invalidateQueries(["usersData"]);
      setSelectedCheckbox([]);
      //fechar o modal
      onDeleteManyModalClose();
    } else {
      showToast("Não foi possível excluir os usuários. Tente novamente.", "error");
    }
  }

  async function onSubmitUserModal(data: UserModalFormTypes) {
    if (objIsEmpty(userToEdit)) {
      await addUser(data);
    } else {
      if(userToEdit?.id !== undefined) {
        await editUser(userToEdit.id, data);
      }
    }
  }

  return {
    showToast,
    register,
    handleSubmit,
    control,
    reset,
    errors,
    addUser,
    editUser,
    removeUser,
    removeAllUsers,
    onSubmitUserModal,
  }
}

