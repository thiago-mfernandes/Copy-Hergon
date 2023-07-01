export function stringShortener(string: string, pathname: string){

  if(pathname === '/workstations') {
    return string.toString().substring(0, 15);
  } else {
    return string;
  }
}