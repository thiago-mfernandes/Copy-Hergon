import { textTranslator } from "@/utils/textTranslator";
import { stringShortener } from "@/utils/stringShortener";
import { Td as TdChakra } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TdProps {
  data: any;
  children: ReactNode;
  pathname: string;
}

export function Td({ data, pathname }: TdProps) {
  //const keyOfData: string = data[0];
  const valueOfData: string = data[1];

  return (
    <TdChakra
      //insere o data-label para utilizar no mobile
      data-label={textTranslator(data[0])}
      display={{ base: "block", lg: "flex" }} 
      //texto de cada celula
      textAlign={{ base: "right", lg: "start" }}
      borderBottomWidth={{ base: "1px!important", lg: "0 !important" }}
      borderBottomStyle={{ base: "solid", lg: "none" }}
      borderBottomColor={{ base: "gray.200!important", lg: "transparent" }}
      width={{ base: "100%", lg: "100%" }}
      //exibe cada celula na versao desktop com width maximo
      maxWidth={{ base: "100%", lg: "100%" }}
      //no base, afasta o texto do before para o lado esquerdo, o no lg aplica um padding para espacar cada item
      paddingLeft={{ base: "40%", lg: "4" }}
      overflow="hidden"
      textOverflow="ellipsis"

      //especifico para a celula de id
      _first={{
        base: {
          width: "100%",
          overflow: "hidden !important",
          textOverflow: "ellipsis",
        },
        lg: {
          maxWidth: "6ch",
          overflow: "hidden !important",
          textOverflow: "ellipsis",
        }
      }}

      //especifico para o mobile
      position={{ base: "relative", lg: "unset" }}
      _before={{
        base: {
          content: `attr(data-label)`,
          position: "absolute",
          left: "0",
          width: "50%",
          paddingLeft: "4",
          fontWeight: "700",
          textAlign: "left",
          overflow: "hidden !important",
          textOverflow: "ellipsis",
        },
        lg: {
          contentVisibility: "hidden",
          position: "none",
          paddingleft: "4",
        }
      }}
    >
      {stringShortener(valueOfData, pathname)}
    </TdChakra>
  )
}