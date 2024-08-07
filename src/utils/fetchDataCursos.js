// API o ruta base con la dirección IP
import * as constantes from './constantes';

const fetchDataCursos = async (filename, action, form = null) => {
    const OPTIONS = {
        method: form ? 'POST' : 'GET',
        headers: {
            'Content-Type': form ? 'application/json' : undefined,
        },
        body: form ? JSON.stringify(form) : undefined,
    };

    try {
        const PATH = new URL(`${constantes.IP}/MyLoan-new/api/services/${filename}.php`);
        PATH.searchParams.append('action', action);

        const RESPONSE = await fetch(PATH.href, OPTIONS);

        if (!RESPONSE.ok) {
            const errorText = await RESPONSE.text();
            throw new Error(`HTTP error! status: ${RESPONSE.status}, message: ${errorText}`);
        }

        const TEXT = await RESPONSE.text();
        console.log('Raw response text:', TEXT);

        // Manejar respuesta dividida si es necesario
        const splitResponse = TEXT.split('}{');
        let jsonResponse;

        try {
            if (splitResponse.length > 1) {
                // Si la respuesta está dividida, combínala antes de analizar
                const firstPart = JSON.parse(splitResponse[0] + '}');
                const secondPart = JSON.parse('{' + splitResponse[1]);
                jsonResponse = { ...firstPart, ...secondPart };
            } else {
                // Si la respuesta no está dividida, analízala directamente
                jsonResponse = JSON.parse(TEXT);
            }
        } catch (jsonError) {
            console.error('JSON Parse error:', jsonError);
            console.error('Response text:', TEXT);
            throw new Error('Error parsing JSON response');
        }

        return jsonResponse;
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: true, message: error.message };
    }
};

const deleteCurso = async (id) => {
    const OPTIONS = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    };
    
    try {
        const PATH = new URL(`${constantes.IP}/MyLoan-new/api/services/curso_services.php`);
        PATH.searchParams.append('action', 'deleteCurso');

        const RESPONSE = await fetch(PATH.href, OPTIONS);

        if (!RESPONSE.ok) {
            const errorText = await RESPONSE.text();
            throw new Error(`HTTP error! status: ${RESPONSE.status}, message: ${errorText}`);
        }

        const TEXT = await RESPONSE.text();

        // Manejar respuesta dividida si es necesario
        const splitResponse = TEXT.split('}{');
        let jsonResponse;

        try {
            if (splitResponse.length > 1) {
                // Si la respuesta está dividida, combínala antes de analizar
                const firstPart = JSON.parse(splitResponse[0] + '}');
                const secondPart = JSON.parse('{' + splitResponse[1]);
                jsonResponse = { ...firstPart, ...secondPart };
            } else {
                // Si la respuesta no está dividida, analízala directamente
                jsonResponse = JSON.parse(TEXT);
            }
        } catch (jsonError) {
            console.error('JSON Parse error:', jsonError);
            console.error('Response text:', TEXT);
            throw new Error('Error parsing JSON response');
        }

        return jsonResponse;
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: true, message: error.message };
    }
};

export default fetchDataCursos;
export { deleteCurso };
