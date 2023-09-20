export function linkSelector(link: string) {

  switch (link) {

    case "/companies":
      return "/companies";

    case "/departments":
      return "/departments";

    case "/areas":
      return "/areas";

    case "/users":
      return "/users";

    case "/workstations":
      return "/workstations";

    case "/enchiridions":
      return "/enchiridions";
    
    case "/risks":
      return "/risks";

    case "/revalidateRisk":
      return "/revalidateRisk";

    default:
      return "/";
  }
}