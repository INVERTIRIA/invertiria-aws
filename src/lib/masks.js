import { supabase } from "../supabase";

// Funcion obtener mascaras de texto
export async function getMasks(language, country) {
    try {
        const { data, error } = await supabase
            .from("mascaras_texto")
            .select(`*, paises!inner(nombre)`)
            .eq('paises.nombre', country)
            .eq('idioma', language)
        if (error) return error;
        return data
    } catch (error) {
        return error
    }
}