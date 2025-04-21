
// Invest result
function InvestResult({title, paragraph, results}) {
    return (
        <div className="bg-black pb-20">
            <div className="px-6 py-24 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-semibold tracking-tight text-balance text-invertiria-1 sm:text-5xl">{title}</h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-white">{paragraph}</p>
                    {results}
                </div>
            </div>
        </div>
    )
}

export { InvestResult }