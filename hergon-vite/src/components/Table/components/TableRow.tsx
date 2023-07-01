import { Td, TdActions, Tr } from "../";

export function TableRow({ item, pathname }: any) {
  function renderCell(data: any) {

    return (
      <Td data={data} pathname={pathname}>
        {data}
      </Td>
    );
  }

  const cells = [];
  for (const [key, value] of Object.entries(item)) {
    cells.push([key, value])
  }

  return (
    <Tr key={item.id}>
      {cells.map((item) => renderCell(item))}
      <TdActions />
    </Tr>
  )
}