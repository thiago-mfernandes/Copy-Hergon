export function usePermissionTypes(){

  const userPermissionsGroup = [
    {
      label: "Super Gestor",
      value: "Super Gestor"
    },
    {
      label: "Gestor",
      value: "Gestor"
    }
  ];
  
  //vai renderi
  const userAdminPermissionsGroup = [
    {
      label: "Super Admin",
      value: "Super Admin"
    },
    {
      label: "Super Gestor",
      value: "Super Gestor"
    },
    {
      label: "Gestor",
      value: "Gestor"
    }
  ];

  return {
    userAdminPermissionsGroup,
    userPermissionsGroup,
  }
}