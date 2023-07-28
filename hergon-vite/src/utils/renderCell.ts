import { Td } from "@/components/Table";


export function renderCell(data: any) {
    
  const cells: any = [];
  //pega cada par de chave e valor do objeto recebido
  for (const [key, value] of Object.entries(data)) {
    /**
     * e colocar um array dentro de cells: ['Id', '1']
     * com esse array eu utilizo o value dentro da celula
     * e a key pra aplicar no data-label de cada td
     */
    cells.push([key, value])
  }

  return (
    cells.map((item:any) => (
      <Td data={item} pathname={pathname}>
        {item}
      </Td>
    ))    
  );
} 