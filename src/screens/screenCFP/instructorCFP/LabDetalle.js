// LabGeneral.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
// Componente para establecer un fondo diferente en cada pantalla
import BackgroundImage from '../../../components/BackgroundImage';
// Importamos los componentes
import Input from '../../../components/Inputs/TextInput';
import ButtonDown from '../../../components/Buttons/ButtonDonw';

// Definición del componente funcional LabGeneral
const LabGeneral = () => {
    // Estado para manejar el nombre del laboratorio
    const [Lab, setLab] = useState('Curso de enca');

    // Pantalla de instructores
    return (
        // Componente View para contener los elementos de la pantalla
        <View style={styles.container}>
            {/* Botón para descargar inventario */}
            <ButtonDown
                textoBoton={'Descargar inventario'}
                color={'DownLoad'}
                iconName="download-outline" />
            {/* Texto descriptivo */}
            <Text style={styles.Texto}>Imagenes del espacio</Text>
        </View>
    );
}

// Definición de los estilos para el componente LabGeneral
const styles = StyleSheet.create({
    // Estilo para el contenedor principal
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 5,
        backgroundColor: '#fff', // Fondo blanco
        padding: 40, // Espaciado interno
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.25, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        elevation: 5, // Elevación para sombras en Android
        width: '100%', // Ancho completo del contenedor
        height: '35%', // Altura del contenedor
    },
    // Estilo para el texto descriptivo
    Texto: {
        marginTop: 20, // Margen superior
        fontWeight: '200', // Peso de la fuente
        padding: 10, // Espaciado interno
        backgroundColor: '#E9E1E1' // Fondo gris claro
    }
});

export default LabGeneral;
