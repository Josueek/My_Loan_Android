import * as constantes from './constantes';

const fetchDataCursos = async (filename, action, form = null) => {
    const OPTIONS = {
        method: form ? 'POST' : 'GET',
        headers: {
            'Content-Type': form ? 'application/json' : undefined,
        },
        body: form ? JSON.stringify(form) : undefined,
    };

    console.log('Datos que se envían:', form);
    console.log('Opciones de la solicitud:', OPTIONS);

    try {
        const PATH = new URL(`${constantes.IP}/MyLoan-new/api/services/${filename}.php`);
        PATH.searchParams.append('action', action);

        console.log('URL final:', PATH.href);

        const RESPONSE = await fetch(PATH.href, OPTIONS);

        if (!RESPONSE.ok) {
            const errorText = await RESPONSE.text();
            console.error(`Error HTTP: ${RESPONSE.status}, Mensaje: ${errorText}`);
            throw new Error(`Error HTTP ${RESPONSE.status}: ${errorText}`);
        }

        const TEXT = await RESPONSE.text();
        console.log('Raw response text:', TEXT);

        // Intentar extraer el JSON de la respuesta
        const jsonStartIndex = TEXT.indexOf('{');
        const jsonEndIndex = TEXT.lastIndexOf('}') + 1;

        if (jsonStartIndex === -1 || jsonEndIndex === -1) {
            console.error('No se encontró un JSON válido en la respuesta.');
            throw new Error('No se encontró un JSON válido en la respuesta.');
        }

        const jsonResponseText = TEXT.substring(jsonStartIndex, jsonEndIndex);

        let jsonResponse;
        try {
            jsonResponse = JSON.parse(jsonResponseText);
        } catch (jsonError) {
            console.error('Error al parsear el JSON:', jsonError);
            console.error('Texto de la respuesta:', jsonResponseText);
            throw new Error('Error al parsear la respuesta JSON');
        }

        return jsonResponse;
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
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
            console.error(`Error HTTP: ${RESPONSE.status}, Mensaje: ${errorText}`);
            throw new Error(`Error HTTP ${RESPONSE.status}: ${errorText}`);
        }

        const TEXT = await RESPONSE.text();

        // Intentar extraer el JSON de la respuesta
        const jsonStartIndex = TEXT.indexOf('{');
        const jsonEndIndex = TEXT.lastIndexOf('}') + 1;

        if (jsonStartIndex === -1 || jsonEndIndex === -1) {
            console.error('No se encontró un JSON válido en la respuesta.');
            throw new Error('No se encontró un JSON válido en la respuesta.');
        }

        const jsonResponseText = TEXT.substring(jsonStartIndex, jsonEndIndex);

        let jsonResponse;
        try {
            jsonResponse = JSON.parse(jsonResponseText);
        } catch (jsonError) {
            console.error('Error al parsear el JSON:', jsonError);
            console.error('Texto de la respuesta:', jsonResponseText);
            throw new Error('Error al parsear la respuesta JSON');
        }

        return jsonResponse;
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        return { error: true, message: error.message };
    }
};



export default fetchDataCursos;
export { deleteCurso };
