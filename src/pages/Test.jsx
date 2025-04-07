
import { useEffect } from "react";
import { supabase } from "../supabase";

// Pagina de pruebas
function Test() {

    useEffect(() => {
        getMatrizModelo();
    }, [])

    return (
        <>
        <h1>Test Page</h1>
        </>
    )

    // Obtener matriz modelo
    async function getMatrizModelo() {
        try {
            const { data, error } = await supabase.from("matriz_modelo_duplicate").select();
            if (error) throw error;
            console.log(data);

            console.log('primer elemento de la matriz:', data[0].matriz[0][0])
            console.log('primer elemento de la matriz jsonb:', data[0].matriz_2[0][0])

        } catch (error) {
            console.error("Error fetching matriz modelo:", error);
        }
    }
}

export { Test }