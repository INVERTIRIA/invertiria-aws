import { createContext, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const GlobalContext = createContext();

// Contexto global
function GlobalProvider({ children }) {

    const { i18n } = useTranslation();

    useEffect(() => {
        console.log('Idioma cambiado');
    }, [i18n.language]);

    return (
        <GlobalContext.Provider value={{ GlobalContext }}>
            {children}
        </GlobalContext.Provider>
    );
}

// Hook para acceder al contexto
function useGlobalContext() {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext };