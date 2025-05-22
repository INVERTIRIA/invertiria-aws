import { Outlet } from "react-router";
import { useLayoutVisibility } from "../../contexts/LayoutVisibilityContext";
import { useEffect, useState } from "react";

// Componentes
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar";
import { Separator } from "../../components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import AppSidebar from "../../components/AppSidebar";
import { useAuth } from "../../contexts/AuthContext";

const Layout = () => {
  const { getInfo } = useAuth();
  const { setHideLayout, pageTitle } = useLayoutVisibility();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setHideLayout(true); // Ocultar el Header y el Footer

    const fecthUserInfo = async () => {
      const res = await getInfo();

      setUserInfo(res);
    };

    if (!userInfo) fecthUserInfo();
  }, []);

  return (
    <div className="-mt-32">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 text-foreground border-border outline-ring/50 bg-background" />
              <Separator orientation="vertical" className="mr-2 !h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {userInfo ? (
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <Outlet context={{ userInfo }} />
            </div>
          ) : (
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
                <div className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
                <div className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-gray-200 md:min-h-min animate-pulse" />
            </div>
          )}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
