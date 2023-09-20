import { Heading, Image, Text, VStack } from "@chakra-ui/react";

interface UploadCardProps {
  title: string;
  description: string;
  img: string;
}

export function UploadCard({ title, description, img }: UploadCardProps) {
  return (
    <VStack
      backgroundColor="gray.50"
      borderRadius="md" 
      boxShadow="md" 
      padding="4"  
      flexDirection="column"
      width={{ base: "100%", lg:"32%" }}
      marginBottom={{ base: "4", lg: "0"}}
    >
      <Heading 
        color="gray.800" 
        fontWeight="semibold" 
        fontSize="md"  
        whiteSpace="normal" 
        width="100%"
        wordBreak="break-word"
      >
        {title}
      </Heading>
      <Text 
        color="gray.800" 
        width="100%" 
        whiteSpace="normal" 
      >
        {description}
      </Text>
      <Image src={img} objectFit="contain" boxSize="315px" />
    </VStack>
  );
}

