import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useLocation, useNavigate } from "react-router";
import clsx from "clsx";

const NavMain = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (url) => {
    navigate(url);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              onClick={() => handleNavigate(item.url)}
              className={clsx(location.pathname === item.url && "bg-gray-200")}
            >
              {item.icon && <item.icon strokeWidth={1.5} />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
