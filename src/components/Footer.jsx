import { Link } from "react-router";

// Header
function Footer() {
    return (
        <header className="bg-black">
            <nav className="mx-auto flex max-w-7xl justify-center p-6 lg:px-8">
                <Link to="/" className="text-amber-50">Invertiria</Link>
            </nav>
        </header>
    )
}

export { Footer }
