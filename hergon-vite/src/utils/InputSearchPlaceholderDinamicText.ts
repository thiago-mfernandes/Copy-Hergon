export function InputSearchPlaceholderDinamicText(pathname: string) {
  const input = "Pesquisar"
  switch(pathname){
    case "/workstations":
      return `${input} Função`;
    case "/companies":
      return `${input} Empresa`;
    case "/departments":
      return `${input} Setor`;
    case "/areas":
      return `${input} Área`;
    case "/users":
      return `${input} Usuário`;
    case "/enchiridions":
      return `${input} Função`;
    default:
      return "NotFound";
  }
}