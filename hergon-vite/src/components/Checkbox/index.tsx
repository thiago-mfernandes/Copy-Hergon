import { Checkbox as ChakraCheckbox, CheckboxProps } from "@chakra-ui/react";
import { RenderIf } from "../RenderIf";
import { useWideVersion } from "@/hooks/useWideVersion";


export function Checkbox({ ...rest }: CheckboxProps) {

  const { isWideVersion } = useWideVersion();

  return (
    <RenderIf conditional={isWideVersion}>
      <ChakraCheckbox 
        marginRight="2"
        padding="4"
        {...rest}
      />
    </RenderIf>
  );
  

}