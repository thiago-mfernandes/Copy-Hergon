
import { Flex, Icon } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { UserProfile } from "../UserProfile";
import { Breadcrumb } from "../Breadcrumb";

export function Header() {
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
      </Flex>
    </Flex>
  )
}