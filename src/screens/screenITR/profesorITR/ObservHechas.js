import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
//Componente para establecer un fondo diferente en cada pantalla
import BackgroundImage from '../../../components/BackgroundImage';
// datos para crear las card
import Data from '../../../data/dataCFP/EspaciosITR';
import { useNavigation } from '@react-navigation/native';

const ObservHechas = () => {

    //Navegabilidad
    const navigation = useNavigation();

    //Seleccionamos la imagen para renderizarla
    const imageToDisplay = Data.length > 0 ? Data[0].Imagen : null;

    return (
        <BackgroundImage background="InstructoritrScreen">
            <View style={styles.container}>
                <View style={styles.Logos}>
                    <Image source={require('../../../../assets/myloanLogo.png')} style={styles.logo} />
                    <Image source={require('../../../../assets/LogoRicaldone.png')} style={styles.logoRical} />
                </View>
                {imageToDisplay && (
                    <View style={styles.ImageContainer}>
                        <Image Source={imageToDisplay} style={styles.image} />
                    </View>
                )}
                <View>

                </View>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    }, logoRical: {
        width: 100,
        height: 100,
        marginTop: 60,
        marginBottom: 30,
    }, Logos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    }, logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        marginBottom: 30,
    }, image: {
        width: 50
    }
});
export default ObservHechas;