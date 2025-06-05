import { createContext, useContext, useState } from "react";

const LayoutVisibilityContext = createContext({
  hideLayout: false,
  setHideLayout: () => {},
});

export const LayoutVisibilityProvider = ({ children }) => {
  const [hideLayout, setHideLayout] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <LayoutVisibilityContext.Provider
      value={{
        hideLayout,
        setHideLayout,
        pageTitle,
        setPageTitle,
        isModalOpen,
        setModalOpen,
      }}
    >
      {children}
    </LayoutVisibilityContext.Provider>
  );
};

export const useLayoutVisibility = () => useContext(LayoutVisibilityContext);
