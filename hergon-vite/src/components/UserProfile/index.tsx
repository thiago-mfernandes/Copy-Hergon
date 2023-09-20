import { Avatar, Flex, Icon, Text } from "@chakra-ui/react";
import { useAuth } from "@/contexts/Auth";
import { useWideVersion } from "@/hooks/useWideVersion";
import { TbLogout } from "react-icons/tb";
import { RenderIf } from "../RenderIf";

export function UserProfile() {

  const { user, signOut } = useAuth();
  const { isWideVersion } = useWideVersion();  

  return (
    <Flex
      alignItems="center"
      flexDirection="row-reverse"
      marginTop={isWideVersion ? "0" : "auto"}
    >
      <Flex
        justifyContent="space-between"
        marginLeft={isWideVersion ? '4' : '0'}
        marginRight={isWideVersion ? '4' : '0'}
        flexDirection={isWideVersion ? 'row' : 'row-reverse'}
        borderRightWidth={isWideVersion ? "1px" : "0"}
        borderRightStyle={isWideVersion ? "solid" : "unset"}
        borderRightColor={isWideVersion ? "gray.200" : "transparent"}
      >
        <Flex alignItems="center">
          <Flex
            key={user.id}
            flexDirection="column"
            alignItems={isWideVersion ? "flex-end": "flex-start"}
            justifyContent="center"
            marginRight="4"
            paddingLeft="4"
            borderLeftWidth={isWideVersion ? "1px" : "0"}
            borderLeftStyle={isWideVersion ? "solid" : "unset"}
            borderLeftColor={isWideVersion ? "gray.200" : "transparent"}
          >
            <Text
              color="gray.600"
              fontWeight="600"
              fontSize="0.75rem"
              whiteSpace="nowrap"
            >
              {user.name}
            </Text>
            <Text
              color="gray.600"
              fontWeight="400"
              fontSize="0.75rem"
              whiteSpace="nowrap"
            >
              {user.email}
            </Text>
          </Flex>
          <RenderIf conditional={!isWideVersion}>
            <Icon
              as={TbLogout}
              fontSize="24"
              color="gray.600"
              onClick={() => signOut()}
            />
          </RenderIf>
        </Flex>
        <Avatar 
          src="https://avatars.githubusercontent.com/u/91342038?v=4" 
          size="md" 
          marginRight={isWideVersion ? "4" : 0 }
        />
      </Flex>
    </Flex>
  )
}


