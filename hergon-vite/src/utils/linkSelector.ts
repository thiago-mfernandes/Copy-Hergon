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
    case "/registercompany":
      return "/companies/registercompany"
    case "/registeruser":
      return "/users/registeruser";
    default:
      return "/company";
  }
}