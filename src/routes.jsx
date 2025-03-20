import { Routes, Route } from "react-router";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

// Paginas
import { App } from './pages/App';
import { Investment } from './pages/Investment';
 
// Rutas de la aplicacion
function AppRoutes() {

    const { i18n } = useTranslation();
    
    // Obtener idioma
    useEffect(() => {
        changeLanguage(i18n, localStorage.getItem('language') || 'es');
    }, [])

    // Retornar rutas
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/investment" element={<Investment />} />
        </Routes>
    )
}

export { AppRoutes }

// FUNCIONES

// Cambiar idioma
function changeLanguage(i18n, language) {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
}