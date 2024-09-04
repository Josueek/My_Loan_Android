/**
 * Realiza una solicitud HTTP a la API.
 *
 * @param {string} endpoint - El endpoint de la API.
 * @param {string} action - La acción a realizar (por ejemplo, 'getCurso', 'updateCurso').
 * @param {Object} [data] - Los datos a enviar en la solicitud.
 * @returns {Promise<Object>} - La respuesta de la API.
 */
const fetchDataCursos = async (endpoint, action, data = null) => {
    const baseURL = 'http://192.168.15.108/MyLoan-new/api/services/';
    const url = `${baseURL}${endpoint}.php?action=${action}`;
    const options = {
        method: data ? 'POST' : 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
    };

    try {
        const response = await fetch(url, options);
        const rawResponseText = await response.text();

        // Intenta parsear la respuesta como JSON
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(rawResponseText);
        } catch (e) {
            console.error('Error al parsear la respuesta JSON:', e);
            jsonResponse = { status: 0, message: 'Error al procesar la respuesta del servidor.' };
        }

        return jsonResponse;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { status: 0, message: 'Error de red o servidor.' };
    }
};

export default fetchDataCursos;
