
import { Flex, Icon } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { UserProfile } from "../UserProfile";
import { Breadcrumb } from "../Breadcrumb";
import { RenderIf } from "../RenderIf";
import { useWideVersion } from "@/hooks/useWideVersion";
import { useAuth } from "@/contexts/Auth";

export function Header() {

  const { isWideVersion } = useWideVersion();
  const { signOut } = useAuth();

  return (
    <Flex
      alignItems="center"
      width="100%"
      justifyContent="space-between"
      height="fit-content"
      gridColumn="1/3"
    >
      <Breadcrumb />
      <Flex alignItems="center">
        <Icon as={FaBell} fontSize="24" color="gray.600" />
        <UserProfile />
        <RenderIf conditional={isWideVersion}>
          <Icon 
            as={TbLogout} 
            fontSize="24" 
            color="gray.600" 
            onClick={signOut}
            _hover={{ base: { cursor: "pointer" }}}
          />
        </RenderIf>
      </Flex>
    </Flex>
  )
}