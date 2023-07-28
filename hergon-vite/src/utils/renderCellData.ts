import { Td } from "@/components/Table"

export function renderCellData(data: any, pathname: string){

  function renderCell(data: any) {
    return (
      <Td data={data} pathname={pathname}>
        {data}
      </Td>
    );
  }

  return { renderCellData };
}