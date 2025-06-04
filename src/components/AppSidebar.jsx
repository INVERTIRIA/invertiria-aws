import {
  ChartColumnIncreasing,
  Handshake,
  House,
  Repeat,
  UsersRound,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";

import NavMain from "./NavMain";
import NavUser from "./NavUser";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { routes } from "../constants";

const AppSidebar = ({ ...props }) => {
  const { user } = useAuth();
  const [nav, setNav] = useState([]);

  useEffect(() => {
    if (user) {
      setNav(routes[user.user_metadata.role]);
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
                  <img
                    src="/assets/images/logo.png"
                    alt=""
                    className="size-6 "
                  />
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
