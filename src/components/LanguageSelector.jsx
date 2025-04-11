import { useState } from "react"
import { useEffect } from "react"
import { useTranslation } from 'react-i18next';

// Componentes
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { buttonVariants } from "@/components/ui/button"
import { Link } from 'react-router';

// Selector de idioma
function LanguageSelector({ }) {

    const { i18n, t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState("Español")

    // Obtener idioma
    useEffect(() => {
        changeLanguage(localStorage.getItem('language') || 'es');
    }, [])

    return <DropdownMenu>
        <DropdownMenuTrigger>
            <Link className={buttonVariants({ variant: "full_ghost" })}>
                <img
                    src={`/assets/images/${localStorage.getItem('language')}.svg`}
                    width={24}
                    height={24}
                    className="rounded-full"
                    style={{ aspectRatio: "24/24", objectFit: "cover" }}
                />
                <span className="font-medium">{selectedLanguage}</span>
                <ChevronDownIcon className="h-4 w-4" />
            </Link>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>{t("select_language")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => changeLanguage("es")}>
                <img
                    src={`/assets/images/es.svg`}
                    width={24}
                    height={24}
                    className="rounded-full"
                    style={{ aspectRatio: "24/24", objectFit: "cover" }}
                />
                <span className="font-medium">Español</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLanguage("en")}>
                <img
                    src={`/assets/images/en.svg`}
                    width={24}
                    height={24}
                    className="rounded-full"
                    style={{ aspectRatio: "24/24", objectFit: "cover" }}
                />
                <span className="font-medium">English</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu >

    // Funcion cambiar idioma
    function changeLanguage(language) {
        const label = { es: "Español", en: "English" }
        setSelectedLanguage(label[language])
        i18n.changeLanguage(language)
        localStorage.setItem('language', language)
    }
}

export { LanguageSelector }

// Componente svg flecha abajo
function ChevronDownIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}