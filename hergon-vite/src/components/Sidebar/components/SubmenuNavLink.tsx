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
          <AccordionButton padding="12px 0">
            <Flex flex='1' textAlign='left' color="gray.600" alignItems="center">
              <Icon as={iconSelector(icon)} fontSize="18" color="gray.600 important!" marginRight="2" />
              {linkTitle}
            </Flex>
            <AccordionIcon  color="gray.600" /> {/**chevron-down */}
          </AccordionButton>
        <AccordionPanel>
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