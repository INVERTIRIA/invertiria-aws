
import { useEffect } from "react";
import { supabase } from "../supabase";

// Pagina de pruebas
function Test() {

    useEffect(() => {
        getMatrizModelo();
    }, [])

    return (
        <>
            <h1>Hola mundo</h1>
        </>
    )

    // Obtener matriz modelo
    async function getMatrizModelo() {
        try {
            const { data, error } = await supabase.from("matriz_modelo_duplicate").select();
            if (error) throw error;
            console.log(data);
        } catch (error) {
            console.error("Error fetching matriz modelo:", error);
        }
    }
}

export { Test }