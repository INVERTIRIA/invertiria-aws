import { createContext, useContext, useState } from "react";

const LayoutVisibilityContext = createContext({
  hideLayout: false,
  setHideLayout: () => {},
});

export const LayoutVisibilityProvider = ({ children }) => {
  const [hideLayout, setHideLayout] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  return (
    <LayoutVisibilityContext.Provider
      value={{ hideLayout, setHideLayout, pageTitle, setPageTitle }}
    >
      {children}
    </LayoutVisibilityContext.Provider>
  );
};

export const useLayoutVisibility = () => useContext(LayoutVisibilityContext);
