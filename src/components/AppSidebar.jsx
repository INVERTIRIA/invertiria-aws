import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "./ui/sidebar";

import NavMain from "./NavMain";
import NavUser from "./NavUser";
import { Link, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import { routes } from "../constants";

const AppSidebar = ({ userInfo, ...props }) => {
  const { user, hasPermissions } = useAuth();
  const [nav, setNav] = useState([]);
  const effectRan = useRef(false);

  const location = useLocation();
  const { setOpenMobile, openMobile, isMobile } = useSidebar();

  useEffect(() => {
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user && !effectRan.current) {
      const items = routes[user.user_metadata.role];
      const res = [];

      // Validar si tiene permisos para cada página
      items.forEach(async (item) => {
        if (!item.validateModule) {
          res.push(item);
        } else if (item.validateModule) {
          const isPermitted = await hasPermissions(item.validateModule);
          if (isPermitted) res.push(item);
        }
      });

      setNav(res);
      effectRan.current = true;
    }
  }, [user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/">
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img src="/assets/svg/logo-2.svg" alt="" className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {import.meta.env.VITE_PROJECT_NAME}
                  </span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={nav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userInfo={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
