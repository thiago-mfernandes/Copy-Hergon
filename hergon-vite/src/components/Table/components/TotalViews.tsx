import { useWideVersion } from "@/hooks/useWideVersion";
import { Box, Text } from "@chakra-ui/react";

interface WorkstationData {
  id: number | string;
  company: string;
  department: string;
  area: string;
  role: string;
}

interface TotalViewsProps {
  currentItems: WorkstationData[];
  data: WorkstationData[] | undefined;
}

export function TotalViews({ currentItems, data }: TotalViewsProps) {

  const { isWideVersion } = useWideVersion();

  return (
    <Box>
      <Text 
        marginBottom={isWideVersion ? "0" : "2"}
      >
        Exibindo
        <span style={{ fontWeight: 'bold' }}> {currentItems?.length} </span>
        registros {isWideVersion ? <></> : <br />} de um total de
        <span style={{ fontWeight: 'bold' }}> {data?.length} </span>
        registros.
      </Text>
    </Box>
  );
}