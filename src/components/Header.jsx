import { Link } from "react-router";

// Componentes
import { LanguageSelector } from "./LanguageSelector"

// Header
function Header() {
    return (
        <header className="bg-black">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <Link to="/"><img src="/assets/images/logo-original.png" className="h-8 w-auto" /></Link>
                <LanguageSelector />
            </nav>
        </header>
    )
}

export { Header }
