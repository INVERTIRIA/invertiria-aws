import { Routes, Route } from "react-router";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

// Paginas
import { App } from './pages/App';
import { Investment } from './pages/Investment';
import { Test } from './pages/Test'

// Rutas de la aplicacion
function AppRoutes() {

    const { i18n } = useTranslation();

    // Obtener idioma
    useEffect(() => {
        changeLanguage(localStorage.getItem('language') || 'es');
    }, [])

    // Retornar rutas
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    )

    // Funcion cambiar idioma
    function changeLanguage(language) {
        i18n.changeLanguage(language)
        localStorage.setItem('language', language)
    }
}

export { AppRoutes }
