import { Image } from "@chakra-ui/react";
import Logoname from "@/assets/logoname.svg";

export function LoginLogo() {
  return (
    <Image 
      src={Logoname} 
      width={{ base:"70%", md: "50%" }} 
      marginBottom="2.5rem"
    />
  );
}