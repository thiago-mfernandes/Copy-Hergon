export function textTranslator(data: string) {
  switch(data) {
    case "workstations":
      return "Postos de Trabalho";
    case "companies":
      return "Empresas";
    case "company":
      return "Empresa";
    case "companyName":
      return "Empresa";
    case "registercompany":
      return "Cadastrar Empresa";
    case "id":
      return "Id";
    case "userId":
      return "Id";
    case "department":
      return "Setores";
    case "departments":
      return "Setores";
    case "departmentName":
      return "Setor";
    case "area":
      return "Área";
    case "areaName":
      return "Área";
    case "areas":
      return "Áreas";
    case "role":
      return "Função";
    case "roleValue":
      return "Permissão";
    case "numberOfEmployees":
      return "Nº de Funcionários";
    case "users":
      return "Usuários";
    case "name":
      return "Nome";
    case "email":
      return "Email";
    case "roles": 
      return "Permissão";
    case "description":
      return "Descrição";
    default:
      return "Not found";
  }
}