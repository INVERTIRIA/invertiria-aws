import { Link } from "react-router";

// Footer
function Footer() {
    return (
        <footer className="bg-invertiria-1">
            <nav className="mx-auto flex max-w-7xl justify-center p-6 lg:px-8">
                <Link to="/" className="text-amber-50"><img src="/assets/images/logo-completo.png" className="h-8 w-auto" /></Link>
            </nav>
        </footer>
    )
}

export { Footer }
