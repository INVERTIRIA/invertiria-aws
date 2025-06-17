import { useEffect } from "react";
import { useLayoutVisibility } from "@/contexts/LayoutVisibilityContext";

const PageTitle = ({ title }) => {
  const { setPageTitle } = useLayoutVisibility();
  useEffect(() => setPageTitle(title), [title]);

  return <title>{`${title} | ${import.meta.env.VITE_PROJECT_NAME}`}</title>;
};

export default PageTitle;
