import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllMasks } from '/src/lib/masks';

const GlobalContext = createContext();

// Contexto global
function GlobalProvider({ children }) {

    const { i18n} = useTranslation();
    const [masks, setMasks] = useState(null);

    useEffect(() => {
        fetchMasks()
    }, [i18n.language]);

    // Funcion obtener todas las mascaras
    async function fetchMasks() {
        try {
            const masks = await getAllMasks(localStorage.getItem('language'), 'Argentina');
            setMasks(masks);
        } catch (error) {
            console.error(error);
        }
    };

    // Funcion obtener mascara especifica
    function getMask(clave_mascara) {
        const mask = masks.find(mask => mask.clave_mascara === clave_mascara);
        return mask ? mask.mascara : null;
    };

    return (
        <GlobalContext.Provider value={{ masks, getMask }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider };