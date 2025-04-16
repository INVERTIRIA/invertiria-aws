import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { getMasks } from '/src/lib/masks'
import { useTranslation } from 'react-i18next';

// Pagina de pruebas
function Test() {

    const { i18n, t } = useTranslation();
    const [masks, setMasks] = useState(null);

    useEffect(() => {
        getMatrizModelo();
    }, [])

    useEffect(() => {
        const fetchMasks = async () => {
            try {
                const masks = await getMasks(localStorage.getItem('language'), 'Argentina');
                setMasks(masks);
                console.log(masks);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMasks();
    }, [i18n.language]);

    return (
        <>
            <br />

            <div className="self-stretch pb-6 md:pb-24 flex flex-col justify-center items-center overflow-hidden">
                <div className="w-full max-w-[1280px] px-4 md:px-8 flex flex-col justify-start items-start gap-4 md:gap-8">
                    <div className="self-stretch p-6 md:p-16 bg-orange-50 rounded-2xl flex flex-col lg:flex-row justify-between items-start gap-6">
                        <div className="flex-1 flex flex-col justify-start items-start gap-2 md:gap-4 min-w-0">
                            <h2 className="w-full text-invertiria-1 text-xl md:text-3xl font-semibold leading-7 md:leading-9">
                                {masks?.find(mask => mask.clave_mascara === 'departamento')?.mascara || t("masks.departamento")}
                            </h2>
                            <p className="w-full text-invertiria-1 text-base md:text-xl font-normal leading-normal md:leading-loose">
                                Join over 4,000+ startups already growing with Untitled.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-start items-start gap-3 w-full lg:w-auto">
                            <button className="px-4 md:px-5 py-2 md:py-3 bg-white rounded-lg shadow-sm border border-zinc-300 flex justify-center items-center gap-2 w-full sm:w-auto">
                                <span className="text-invertiria-1 text-sm md:text-base font-semibold">Learn more</span>
                            </button>
                            <button className="px-4 md:px-5 py-2 md:py-3 bg-invertiria-1 rounded-lg shadow-sm flex justify-center items-center gap-2 w-full sm:w-auto">
                                <span className="text-white text-sm md:text-base font-semibold">Get started</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <br />
            <br />
        </>
    )

    // Obtener matriz modelo
    async function getMatrizModelo() {
        try {
            const { data, error } = await supabase.from("matriz_modelo").select();
            if (error) throw error;
            console.log(data);
        } catch (error) {
            console.error("Error fetching matriz modelo:", error);
        }
    }
}

export { Test }