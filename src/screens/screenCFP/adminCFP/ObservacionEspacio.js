// src/screens/EspaciosITR.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Componente para definir el fondo
import BackgroundImage from '../../../components/BackgroundImage';
// datos para crear las card
import Data from '../../../data/dataCFP/EspaciosITR';
// Input
import TextInput from '../../../components/Inputs/TextInput';
import InputMultiline from '../../../components/Inputs/InputMultiline';
import Buttons from '../../../components/Buttons/Buttons';

const ObservacionEspacio = () => {
    // Navegabilidad
    const navigation = useNavigation();
    // Accion del boton
    const Volver = () => {
        navigation.navigate('AdmincfpTabNavigator');
    };
    const [text, setText] = useState('');

    // Selecciona la primera imagen del array Data
    const imageToDisplay = Data.length > 0 ? Data[0].Imagen : null;

    return (
        <BackgroundImage background="EspaciosITR">
            <View style={styles.container}>
                <Image source={require('../../../../assets/myloanLogo.png')} style={styles.logo} />
                {imageToDisplay && (
                    <View style={styles.imageContainer}>
                        <Image source={imageToDisplay} style={styles.image} />
                    </View>
                )}
                <View style={styles.card}>
                    <Text style={styles.title}>Comentarios antes del préstamo</Text>
                    <TextInput placeHolder={"Comentario"}
                        setTextChange={setText}
                        editable={true} />
                </View>
                <View style={styles.cardM}>
                    <Text style={styles.title}>Añade un comentario o observación</Text>
                    <InputMultiline placeHolder={"Comentario"}
                        multiline={true}
                        editable={true}
                        setTextChange={setText} />
                </View>
              
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Buttons color={"Amarillo"} textoBoton={'Agregar'} />
                    </View>
                    <View style={styles.column}>
                        <Buttons textoBoton={'Volver'} color="Gris" accionBoton={Volver} />
                    </View>
                </View>
            </View>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,

    },
    logo: {
        width: 125,
        height: 80,
        marginTop: 25,
        marginBottom: 30,
    },
    imageContainer: {
        alignItems: 'center', // Center image horizontally
        marginVertical: 10,
    },
    image: {
        width: 150,
        height: 150,
    },
    card: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 25,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: 380,
        height: 150,
    },
    title: {
        fontSize: 15,
        marginBottom: 20,
    },
    cardM: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 30,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: 380,
        height: 250,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    column: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
});

export default ObservacionEspacio;
