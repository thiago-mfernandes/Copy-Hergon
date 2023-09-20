import { useBreakpointValue } from "@chakra-ui/react";

export interface isWideVersionProps {
  isWideVersion?: boolean;
}

export function useWideVersion() {

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  
  return { isWideVersion };
}

export function IsWideVersion(){
  const wideVersion = useWideVersion();
  return wideVersion;
}