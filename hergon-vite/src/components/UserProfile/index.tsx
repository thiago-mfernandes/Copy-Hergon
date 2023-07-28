import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useAuth } from "@/contexts/Auth";
import { useWideVersion } from "@/hooks/useWideVersion";

export function UserProfile() {

  const { user } = useAuth();
  const { isWideVersion } = useWideVersion();  

  return (
    <Flex
      alignItems="center"
      flexDirection="row-reverse"
      marginTop={isWideVersion ? "auto" : "0"}
    >
      <Flex
        justifyContent="space-between"
        marginLeft={isWideVersion ? '0' : '4'}
        flexDirection={isWideVersion ? 'row-reverse' : 'row'}
      >
        <Flex 
          key={user.id} 
          flexDirection="column"
          alignItems={isWideVersion ? "flex-start": "flex-end"}
          justifyContent="center"
          marginRight="4"
          paddingLeft="4"
          borderLeftWidth={isWideVersion ? "0" : "1px"}
          borderLeftStyle={isWideVersion ? "unset" : "solid"}
          borderLeftColor={isWideVersion ? "transparent" : "gray.200"}
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
        <Avatar src="https://avatars.githubusercontent.com/u/91342038?v=4" size="md"/>
      </Flex>
    </Flex>
  )
}


