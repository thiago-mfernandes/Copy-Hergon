import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useShowToast } from "@/hooks/useShowToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from 'uuid';
import { queryClient } from "@/services/queryClient";
import { UserServices } from "@/services/http/users/UserServices";
import { UserData } from "@/contexts/Auth/interfaces";
import { objIsEmpty } from "@/utils/isObjectEmpty";
import { formUserModalSchema } from "../schema/formUserModalSchema";
import { UserModalFormTypes } from "../types/UserModalFormTypes";
import { useUserStore } from "../store/useUserStore";

export function useUserModal() {

  const { showToast } = useShowToast();
  const navigate = useNavigate();

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
      company: data.company.value,
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

    if (response.status === 201) {
      //em caso de sucesso
      showToast("Usuário criado com sucesso.", "info");
      //revalidar os dados da tabela de usuarios
      queryClient.invalidateQueries(["usersData"]);
      //limpar o modal
      //reset();
      //fechar o modal
      onClose();
    } else {
      showToast("Não foi possível adicionar o usuário. Tente Novamente.", "error");
    }

    navigate("/users");
  }

  async function editUser(_id: string, data: Partial<UserData>) {
    //spread do antigo usuario com as novas informacoes do form(data)
    const editedUser = { ...userToEdit, ...data };
    //envio a requisicao
    const response = await UserServices.edit(editedUser);

    if (response.status === 200) {
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

  async function removeUser(id: string) {
    //envio a requisição 
    const response = await UserServices.remove(id);

    if (response.status === 200) {
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
    onSubmitUserModal,
  }
}

