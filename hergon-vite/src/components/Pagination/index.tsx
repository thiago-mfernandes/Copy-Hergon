import { Flex } from "@chakra-ui/react";
 
import ReactPaginate from "react-paginate";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import * as S from "./styles";
import { TotalViews } from "../Table";
import { useWideVersion } from "@/hooks/useWideVersion";

interface PaginationProps {
  currentItems: any;
  data: any | undefined;
  handlePageClick: (event: { selected: number; }) => void;
  pageCount: number;
}

export function Pagination({ currentItems, data, handlePageClick, pageCount} : PaginationProps) {

  const { isWideVersion } = useWideVersion();

  return (
    <Flex
    flexDirection={{base: "column", lg: "row"}}
      alignItems={{ base: "flex-start", lg: "center"}}
      justifyContent="space-between"
      padding="0 1.5rem"
    >
      <TotalViews currentItems={currentItems} data={data} />
      <S.ContainerPagination $isWideVersion={isWideVersion}>
        <ReactPaginate
          breakLabel="..." //rótulo que aparece das paginas ocultas
          nextLabel={<FaCaretRight />} //botao avançar
          onPageChange={handlePageClick} //metodo chamado qdo a pag é alterada
          pageRangeDisplayed={2} //qts pag aparece no contador + a atul
          pageCount={pageCount} //numero total de paginas
          previousLabel={<FaCaretLeft />} //botao voltar
          renderOnZeroPageCount={null} //o que renderiza quando pageCount for zero
          containerClassName={"paginationsButtons"} 
          previousClassName={"previousButton"}
          nextClassName={"nextButton"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </S.ContainerPagination>
    </Flex>
  );
}