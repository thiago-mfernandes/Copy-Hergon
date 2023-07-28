import { Td } from "@/components/Table";

interface RenderCellProps {
  data: any;
  pathname: string;
}

//recebe algum tipo de json
export function RenderCell({ data, pathname }: RenderCellProps) {
  const cells: any = [];
   
   //pega cada par de chave e valor do objeto recebido
  for (const [key, value] of Object.entries(data)) {
    /**
     * e colocar um array dentro de cells: ['Id', '1']
     * com esse array eu utilizo o value dentro da celula
     * e a key pra aplicar no data-label de cada td
    */
    let cellValue = value;

    //verificar se o valor recebido é um objeto
    if (typeof value === 'object') {
      /**
       * Esse aviso é gerado pelo ESLint com a regra no-prototype-builtins.
       * A regra sugere evitar o acesso direto ao método hasOwnProperty do protótipo do objeto.
       * Em vez disso, ela sugere o uso da função global Object.prototype.hasOwnProperty.call(obj, prop) 
       * para verificar se um objeto possui uma determinada propriedade.
       */

      if (Array.isArray(value) && value.length > 0 && 'companyId' in value[0]) {
        // Verifica se o valor é um array com a propriedade 'companyId'
        cellValue = value.map((item: any) => item.companyId).join(', ');


      } else if (typeof value === 'object' && value !== null) {


        if ('label' in value) {
          // Verifica se o objeto tem a propriedade 'label'
          cellValue = value.label;
        } else {
          // Se não tiver a propriedade 'label', converte todo o objeto em uma string
          cellValue = JSON.stringify(value);
        }
      }        
    }  
    cells.push([key, cellValue]);
  }

  return (
    cells.map((item:any) => (
      <Td data={item} pathname={pathname} key={item[0]}>
        {item[1]}
      </Td>
    ))    
  );
} 


