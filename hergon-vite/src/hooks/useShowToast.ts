import { UseToastOptions, useToast } from "@chakra-ui/react";


export function useShowToast() {

  const toast = useToast();

  function showToast(title: string, status: UseToastOptions["status"], duration = 4000 ) {
    return toast({
      title: title,
      status: status,
      duration: duration,
      isClosable: true,
      position: 'top-right',
    })
  }

  return { showToast };
}