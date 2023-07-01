import { useBreakpointValue } from "@chakra-ui/react";

export interface isWideVersionProps {
  isWideVersion?: boolean;
}

export function useWideVersion() {

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false,
  });
  
  return { isWideVersion };
}

export function IsWideVersion(){
  const wideVersion = useWideVersion();
  return wideVersion;
}