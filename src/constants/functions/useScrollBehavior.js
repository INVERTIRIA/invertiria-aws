import { useEffect } from "react";
import { useLocation } from "react-router";

const useScrollBehavior = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const elementId = hash.replace("#", "");

      const scrollToElement = () => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });

          // Eliminar el hash de la URL después del scroll
          setTimeout(() => {
            const newUrl = window.location.href.split("#")[0];
            window.history.replaceState(null, "", newUrl);
          }, 2000);

          return true;
        }
        return false;
      };

      if (scrollToElement()) return;

      const observer = new MutationObserver(() => {
        if (scrollToElement()) observer.disconnect();
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => observer.disconnect();
    } else {
      // Si no hay hash, hacer scroll al top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);
};
export default useScrollBehavior;
