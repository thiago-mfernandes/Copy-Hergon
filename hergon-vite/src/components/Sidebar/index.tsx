import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Image } from "@chakra-ui/react";
import { SidebarNav } from "./components/SidebarNav";
import logo from "@/assets/logo.svg";
import { useSidebarDrawer } from "@/contexts/SidebarDrawerContext";
import { useWideVersion } from "@/hooks/useWideVersion";

export function Sidebar() {

  const { isOpen, onClose } = useSidebarDrawer();

  const { isWideVersion } = useWideVersion();

  if(isWideVersion) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent backgroundColor="gray.50">
              <DrawerCloseButton />
              <DrawerHeader>
                <Image src={logo} alt={""} />
              </DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <>
      <Box
        as="aside"
        width="64"
        marginRight="8"
      >
        <SidebarNav />
      </Box>
    </>
  )
}