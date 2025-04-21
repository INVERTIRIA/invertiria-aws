import { Link } from 'react-router';

// Componentes
import { buttonVariants } from "@/components/ui/button"

// CTA Section
function CTASection({title, paragraph, buttonText, buttonText2, buttonLink, buttonLink2}) {
    return (
        <div className="bg-black pb-120">
            <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-semibold tracking-tight text-balance text-invertiria-1 sm:text-5xl">{title}</h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-cyan-50">{paragraph}</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to={buttonLink} className={buttonVariants({ variant: "secondary" })}>{buttonText}</Link>
                        <Link to={buttonLink2} className={buttonVariants({ variant: "full_ghost" })}>{buttonText2} <span aria-hidden="true">→</span></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CTASection }
