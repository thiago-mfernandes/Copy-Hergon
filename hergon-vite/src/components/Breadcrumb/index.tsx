import { textTranslator } from "@/utils/textTranslator";
import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink, Link } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export function Breadcrumb() {

  function DinamicBreadcrumb() {

    const { pathname } = useLocation();

    let currentLink = "";

    const crumbs = pathname.split('/')
      .filter(crumb => crumb !== '')
      .map(crumb => {
        currentLink = `/${crumb}`

        return (
          <BreadcrumbItem key={crumb}>
            <BreadcrumbLink
              as={Link}
              href={currentLink}
              fontSize="1rem"
              color="cyan.500"
            >
              {textTranslator(crumb)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })
    return crumbs;
  }


  return (
    <>
      <ChakraBreadcrumb separator=">">
        <BreadcrumbItem alignItems="baseline">
          <BreadcrumbLink
            as={Link}
            href="/dashboard"
            color="gray.700"
            fontWeight="700"
            fontSize="1.125rem"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {DinamicBreadcrumb()}
      </ChakraBreadcrumb>
    </>
  )
}