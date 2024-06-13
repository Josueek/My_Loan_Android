import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import BackgroundImage from '../../../components/BackgroundImage';
import Input from '../../../components/Inputs/TextInput';
import Button from '../../../components/Buttons/Buttons';

export default function LoginScreen({ navigation }) { // Recibe navigation como prop
    const Siguiente = () => {
        navigation.replace('InstructorTabNavigator');
    }

    return (
        <BackgroundImage background="InstructorCFPC">
            <View style={styles.container}>
                <Text style={styles.title}>El código se envió a tu correo electrónico</Text>
                <Image
                    source={require('../../../img/NotificacionCelular.png')}
                    style={styles.logoCelular}
                />
                <Text style={styles.Texto}>Si no tienes acceso al código comunicate
                    con tu superiores</Text>
                <Input
                    placeHolder={'Ingresa el código'}
                    contra={false}
                    style={styles.Input} />
                <Button
                    textoBoton={'Continuar'}
                    color={"Amarillo"}
                    accionBoton={Siguiente} />
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingVertical: 100,
    },
    title: {
        position: 'absolute',
        top: '19%',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
        textAlign: 'center',
        width: 250,
        color: '#fff',

    }, logoCelular: {
        position: 'relative',
        bottom: 0,
        width: 150,
        height: 150,
        marginTop: 50,
        marginVertical: 60,
    }, Texto: {

        width: 250,
        marginVertical: 30,
        textAlign: 'center',
        fontSize: 15,
    },
    input: {
        marginVertical: 50,
    }
});
