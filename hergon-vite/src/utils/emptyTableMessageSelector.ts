export function emptyTableMessageSelector(pathname: string) {
  switch(pathname){
    case "/workstations":
      return "Funções cadastradas";
    case "/companies":
      return "Empresas cadastradas";
    case "/departments":
      return "Setores cadastrados";
    case "/areas":
      return "Áreas cadastradas";
    case "/users":
      return "Usuários cadastrados";
    default:
      return "NotFound";
  }
}