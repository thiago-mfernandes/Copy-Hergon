import { Box, Stack, useBreakpointValue, Image } from "@chakra-ui/react";
import logoname from "@/assets/logoname.svg";
import sidebarData from "@/mocks/sidebar.json";
import { SubmenuNavLink } from "./SubmenuNavLink";
import { ElementType } from "react";
import { NavLink } from "./NavLink";
import { UserProfile } from "../../UserProfile";
import { RenderIf } from "../../RenderIf";

export function SidebarNav() {

  //aqui precisa ser assim, nao pode ser useWideVersion
  const isDrawerSidebar = useBreakpointValue({
    //375px
    base: false,
    //1024px
    lg: true,
  })

  return (
    <Box
      display="flex"
      flexDirection={isDrawerSidebar ? 'column' : 'column'}
      alignItems={isDrawerSidebar ? 'center' : 'flex-start'}
      justifyContent="flex-start"
      height="100%"
      paddingBottom={isDrawerSidebar ? "0" : "8"}
      marginTop={isDrawerSidebar ? "3" : "0"}      
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom={isDrawerSidebar ? '12' : '0'}
      >
        <RenderIf conditional={isDrawerSidebar}>
          <Image
            src={logoname}
            alt={"Logotipo Hergon"}
            width={120}
          />
        </RenderIf>
      </Box>
      <Stack 
        spacing="6" 
        alignItems="flex-start" 
        my="4"
      >
        {
          sidebarData.map((item) => (
            item.subMenu
              ? <SubmenuNavLink
                key={item.id}
                linkTitle={item.linkTitle}
                linkPath={item.linkPath as string[]}
                icon={item.icon as ElementType}
              />
              : <NavLink
                key={item.id}
                linkTitle={item.linkTitle}
                linkPath={item.linkPath as string}
                icon={item.icon as ElementType}
              />
          ))
        }
      </Stack>
      {
        !isDrawerSidebar &&
        <UserProfile />
      }
    </Box>
  );
}