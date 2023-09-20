import { useCheckboxStore } from "../store/useCheckboxStore";

export function useCheckbox(data: [] | []) {

  const { 
    selectedCheckbox,
    selectAllCheckbox,
    setSelectAllCheckbox,
    setSelectedCheckbox
  } = useCheckboxStore();


  function handleCheckboxIsChecked(checkboxId: string) { 
    if(selectedCheckbox !== undefined) {
      setSelectedCheckbox([...selectedCheckbox, checkboxId]);
    }
  }

  function handleCheckboxIsUncheck(checkboxId: string) {
    //retornar uma nova lista sem o valor desmarcado
    if(selectedCheckbox !== undefined) {
      setSelectedCheckbox(selectedCheckbox.filter(item => item !== checkboxId));
    }
  }

  function handleSelectAllChange() {  
    //altera o estado do selectAllCheckbox
    setSelectAllCheckbox(!selectAllCheckbox);

    //se checkbox for true
    if (!selectAllCheckbox) {
      const allIds = data.map((item: any) => item.id);
      setSelectedCheckbox(allIds);
    } else {
      //se checkbox for false
      setSelectedCheckbox([]);
    }
  }


  return {
    handleCheckboxIsChecked,
    handleCheckboxIsUncheck,
    handleSelectAllChange,
  }
}