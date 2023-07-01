import { ElementType } from "react";
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { iconSelector } from "@/utils/iconSelector";
import { linkSelector } from "@/utils/linkSelector";
import { titleLinkSelector } from "@/utils/titleLinkSelector";

interface SubmenuNavLinkProps {
  linkTitle: string;
  linkPath: string[];
  icon: ElementType;
}


export function SubmenuNavLink({ icon, linkPath, linkTitle }: SubmenuNavLinkProps) {

  return (
    <Accordion allowToggle width="100%">
      <AccordionItem borderStyle="none">
        <h2 style={{ borderColor: "transparent", borderStyle: "none", borderWidth: "0" }}>
          <AccordionButton padding="12px 0">
            <Flex flex='1' textAlign='left' color="gray.600">
              <Icon as={iconSelector(icon)} fontSize="24" color="gray.600" marginRight="2" />
              {linkTitle}
            </Flex>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {
            linkPath.map((link) => (
              <Link
                key={link}
                display="flex"
                alignItems="center"
                color="gray.600"
                padding="12px 0"
                width="100%"
                _hover={{
                  textDecoration: 'none',
                  backgroundColor: 'blackAlpha.50'
                }}
                href={linkSelector(link)}
              >
                <Text textAlign="start" paddingLeft="5">{titleLinkSelector(link)}</Text>
              </Link>
            ))
          }
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}