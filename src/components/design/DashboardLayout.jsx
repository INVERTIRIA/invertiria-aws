import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLayoutVisibility } from "../../contexts/LayoutVisibilityContext";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../AppSidebar";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Outlet } from "react-router";
import Skeleton from "./Skeleton";

const DashboardLayout = () => {
  const { getInfo } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const { setHideLayout, pageTitle } = useLayoutVisibility();

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
            <Skeleton />
          )}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
