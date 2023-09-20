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
    
    case "/workstations":
      return "Funções";
    
    case "/enchiridions":
      return "Prontuários";

    case "/risks":
      return "Riscos";

    case "/revalidateRisk":
      return "Revalidar Risco";

    default:
      return "/company";
  }
}