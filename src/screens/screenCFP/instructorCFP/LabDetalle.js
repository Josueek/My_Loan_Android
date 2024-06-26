// LabGeneral.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
//Componente para establecer un fondo diferente en cada pantalla
import BackgroundImage from '../../../components/BackgroundImage';
//Importamos los componentes
import Input from '../../../components/Inputs/TextInput';
import ButtonDown from '../../../components/Buttons/ButtonDonw';

const LabGeneral = () => {
    const [Lab, setLab] = useState('Curso de enca');
    //Pantalls de intructores
    return (
        <View style={styles.container}>
            <ButtonDown
                textoBoton={'Descargar inventario'}
                color={'DownLoad'}
                iconName="download-outline" />
            <Text style={styles.Texto}>Imagenes del espacio</Text>

        </View>
    );
}

    //Funciona para ver el estilo que se va a ver en la pantalla
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        padding: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        height: '35%',
    },Texto:{
        marginTop: 20,
        fontWeight: '200',
        padding: 10,
        backgroundColor: '#E9E1E1'

    }
});
export default LabGeneral;
