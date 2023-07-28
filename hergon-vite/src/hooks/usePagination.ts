//import { WorkstationData } from "@/contexts/Auth/interfaces";
import { useState } from "react";

// aqui pode ser any
export function usePagination(data: any) {

  //console.log(data)

  const [itemsPerPage, setItemPerPage] = useState(10);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  const endOffset = itemOffset + itemsPerPage;
  //console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const currentItems = data?.slice(itemOffset, endOffset);
  //console.log(currentItems);

  const pageCount = Math.ceil((data?.length || 0) / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    //console.log(
      //`User requested page number ${event.selected}, which is offset ${newOffset}`
    //);
    setItemOffset(newOffset);  
  };
  
  return {
    setItemPerPage,
    handlePageClick,
    pageCount,
    currentItems
  }
}