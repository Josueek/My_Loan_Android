//API o ruta base con la direccion IP
import * as constantes from './constantes';

const fetchDataCursos = async (filename, action, form = null) => {
    const OPTIONS = {};
    if (form) {
        OPTIONS.method = 'POST';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'GET'; 
    }
    try {
        const PATH = new URL(`${constantes.IP}/services/${filename}.php`);
        PATH.searchParams.append('action', action);

        const RESPONSE = await fetch(PATH.href, OPTIONS);
        const TEXT = await RESPONSE.text();
        
        if (!RESPONSE.ok) { 
            throw new Error(`HTTP error! status: ${RESPONSE.status}, message: ${TEXT}`);
        }
        
        try {
            // Intentar analizar la respuesta como JSON
            return JSON.parse(TEXT);
        } catch (jsonError) {
            // Si falla el análisis JSON, intentar manipular la respuesta
            const fixedResponseText = TEXT.replace(/}{/g, '},{');
            const fixedResponseJson = JSON.parse(`[${fixedResponseText}]`);
            // Buscar el objeto JSON válido dentro del array
            const validResponse = fixedResponseJson.find(r => r.status === 1);
            if (validResponse) {
                return validResponse;
            } else {
                throw new Error(`JSON Parse error: ${jsonError.message}, response: ${TEXT}`);
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: true, message: error.message };
    }
};

export default fetchDataCursos;
