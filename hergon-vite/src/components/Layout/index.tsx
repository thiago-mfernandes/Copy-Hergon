import { useWideVersion } from "@/hooks/useWideVersion";
import { RenderIf } from "../RenderIf";
import { HamburguerMenu } from "../HamburguerMenu";
import { PageContainer } from "../PageContainer";
import { Sidebar } from "../Sidebar";
import { Grid } from "../Grid";
import { Breadcrumb } from "../Breadcrumb";
import { Header } from "../Header";
import { Outlet, useLocation } from "react-router-dom";

export function Layout() {

  const { isWideVersion } = useWideVersion();
  const { pathname } = useLocation();

  const unauthenticatedArea = pathname === '/' || pathname === '/forgotPassword' || pathname === '/loginRegister';
  
  return (
    <>
      <RenderIf conditional={!isWideVersion && !unauthenticatedArea}>
        <HamburguerMenu />
      </RenderIf>
      <PageContainer>
        <Sidebar />

        <Grid>
          <RenderIf conditional={!isWideVersion && !unauthenticatedArea}>
            <Breadcrumb />
          </RenderIf>          
          <RenderIf conditional={isWideVersion && !unauthenticatedArea}>
            <Header />
          </RenderIf>

          {/** renderiza os elementos específicos de cada página */}
          <Outlet />

        </Grid>
      </PageContainer>
    </>
  );
}