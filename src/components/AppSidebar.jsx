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

const navMain = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Mi perfil",
    url: "/user/dashboard",
    icon: UsersRound,
  },
  {
    title: "Mis inversiones",
    url: "/user/investments",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Acceso delegado",
    url: "/user/delegado",
    icon: Handshake,
  },
  {
    title: "Cambiar de perfil",
    url: "/user/change-profile",
    icon: Repeat,
  },
];

const AppSidebar = ({ ...props }) => {
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
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
