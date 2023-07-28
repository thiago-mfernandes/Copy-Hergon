import { Menu, VStack } from "@chakra-ui/react";
import * as S from "../"
import { DeleteButton, EditButton, SeeMoreButton, TableActionButton } from "@/components/Button";
import { MenuList } from "@/components/OverlayMenu";

export function TableRow({ item, pathname }: any) {
  
  function renderCell(data: any) {

    return (
      <S.Td data={data} pathname={pathname}>
        {data}
      </S.Td>
    );
  }

  const cells = [];
  for (const [key, value] of Object.entries(item)) {
    cells.push([key, value])
  }

  return (
    <S.Tr key={item.id}>
      {cells.map((item) => renderCell(item))}
      <S.TdActions>
        <Menu>
          <TableActionButton />
          <MenuList padding="2">

            <VStack spacing="2">
              <SeeMoreButton />
              <EditButton
                // onClick={() => [
                //   setDataEdit(item),
                //   onOpen()
                // ]}
              />
              <DeleteButton />          
            </VStack>

          </MenuList>
        </Menu> 
      </S.TdActions>
    </S.Tr>
  )
}