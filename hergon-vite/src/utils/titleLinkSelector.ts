export function titleLinkSelector(link: string) {
  switch (link) {
    case "/companies":
      return "Empresas";
    case "/departments":
      return "Setores";
    case "/areas":
      return "Áreas";
    case "/users":
      return "Usuários";
    case "/registercompany":
      return "Cadastrar Empresa"
    case "/registeruser":
      return "Cadastrar Usuário";
    default:
      return "/company";
  }
}