import { Link } from "react-router";
import { useTranslation } from 'react-i18next';

// Componentes
import { buttonVariants } from "@/components/ui/button"

// Header
function Header() {

    const { i18n } = useTranslation();

    return (
        <header className="bg-black">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <Link to="/" className=""><img src="\assets\images\react.svg" className="h-8 w-auto" /></Link>
                <div>
                    <Link className={buttonVariants({ variant: "full_ghost" })} onClick={() => changeLanguage(i18n, 'es')}>Español</Link>
                    <Link className={buttonVariants({ variant: "full_ghost" })} onClick={() => changeLanguage(i18n, 'en')}>English</Link>
                </div>
            </nav>
        </header>
    )
}

export { Header }

// FUNCIONES

// Cambiar idioma
function changeLanguage(i18n, language) {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
}