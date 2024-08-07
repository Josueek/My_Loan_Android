/**
 * fetchData para hacer peticiones a la API
 * Plantilla para hacer las peticiones 
 * se mandan dos datos
 * nombre del archivo y la accion
 */
//API o ruta base con la direccion IP
import * as constantes from './constantes';

const fetchData = async (filename, action, form = null) => {
    const OPTIONS = {};
    if (form) {
        OPTIONS.method = 'POST';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'GET'; 
    }
    try {
        const PATH = new URL(`${constantes.IP}/MyLoan-new/api/services/${filename}.php`);
        PATH.searchParams.append('action', action);

        const RESPONSE = await fetch(PATH.href, OPTIONS);
        const TEXT = await RESPONSE.text();
        
        if (!RESPONSE.ok) { 
            throw new Error(`HTTP error! status: ${RESPONSE.status}, message: ${TEXT}`);
        }
        
        try {
            return JSON.parse(TEXT);
        } catch (jsonError) {
            throw new Error(`JSON Parse error: ${jsonError.message}, response: ${TEXT}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: true, message: error.message };
    }
};

export default fetchData;
