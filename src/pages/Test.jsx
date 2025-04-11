
import { useEffect } from "react";
import { supabase } from "../supabase";

// Pagina de pruebas
function Test() {

    useEffect(() => {
        getMatrizModelo();
    }, [])

    return (
        <>
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