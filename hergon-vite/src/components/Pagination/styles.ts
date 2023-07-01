import { HTMLAttributes } from "react";
import { styled } from "styled-components";

interface ContainerPaginationProps extends HTMLAttributes<HTMLDivElement> {
  $isWideVersion: boolean | undefined;
}

export const ContainerPagination = styled.div<ContainerPaginationProps>`
  display: flex;  
  width: ${({ $isWideVersion }) => $isWideVersion ? "100%" : "35%"};

  .paginationsButtons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    
    font-size: 1rem;
    width: 100%;
    max-width: 100vw;
    height: 8rem;
    color: #72cda1;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      border-radius: 4px;
      padding: 6px;
      width: 40px;
      height: 40px;
    }
  }
  
  .previousButton, .nextButton {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #72cda1;
    color: #FFF;
    border: 0;
    border-radius: 4px;
    padding: 6px;
    width: 40px;
    height: 40px;

    svg {
      font-size: 1rem;
      display: flex;
    }
  }

  .paginationsButtons > .paginationActive {
    
    background-color: #72cda1;    
    color: #FFF;
  }

  .paginationDisabled {
    background-color: #72cda1; 
  }
`;