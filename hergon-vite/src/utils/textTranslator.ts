export function textTranslator(data: string) {
  switch(data) {
    case "workstations":
      return "Postos de Trabalho";
    case "companies":
      return "Empresas";
    case "company":
      return "Empresa";
    case "registercompany":
      return "Cadastrar Empresa";
    case "id":
      return "Id";
    case "department":
      return "Setores";
    case "departments":
      return "Setores";
    case "area":
      return "Área";
    case "areas":
      return "Áreas";
    case "role":
      return "Função";
    case "numberOfEmployees":
      return "Nº de Funcionários";
    case "users":
      return "Usuários";
    case "name":
      return "Nome";
    case "email":
      return "Email";
    case "roles": 
      return "Permissão"
    default:
      return "Not found";
  }
}