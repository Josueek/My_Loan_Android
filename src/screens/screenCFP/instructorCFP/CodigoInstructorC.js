import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import BackgroundImage from '../../../components/BackgroundImage';
import Input from '../../../components/Inputs/TextInput';
import Button from '../../../components/Buttons/Buttons';

export default function LoginScreen({ navigation }) { // Componente principal de la pantalla de inicio de sesión, recibe navigation como prop
    const Siguiente = () => {
        // Función para navegar a la siguiente pantalla
        navigation.replace('InstructorTabNavigator'); // Reemplaza la pantalla actual con la pantalla 'InstructorTabNavigator'
    }

    return (
        <BackgroundImage background="InstructorCFPC"> {/* Establece una imagen de fondo */}
            <View style={styles.container}>
                <Text style={styles.title}>El código se envió a tu correo electrónico</Text> {/* Texto de información */}
                <Image
                    source={require('../../../img/NotificacionCelular.png')} // Muestra una imagen de notificación
                    style={styles.logoCelular}
                />
                <Text style={styles.Texto}>Si no tienes acceso al código comunicate con tus superiores</Text> {/* Texto adicional */}
                <Input
                    placeHolder={'Ingresa el código'} // Campo de entrada para el código
                    contra={false}
                    style={styles.Input} />
                <Button
                    textoBoton={'Continuar'} // Botón para continuar
                    color={"Amarillo"}
                    accionBoton={Siguiente} /> {/* Llama a la función Siguiente al presionar el botón */}
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa todo el espacio disponible
        justifyContent: 'center', // Centra el contenido verticalmente
        alignItems: 'center', // Centra el contenido horizontalmente
        padding: 20,
        paddingVertical: 100,
    },
    title: {
        position: 'absolute',
        top: '19%', // Posición del título en la parte superior
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff', // Color del texto del título
        textAlign: 'center',
        width: 250,
    }, 
    logoCelular: {
        position: 'relative',
        bottom: 0,
        width: 150,
        height: 150,
        marginTop: 50,
        marginVertical: 60,
    }, 
    Texto: {
        width: 250,
        marginVertical: 30,
        textAlign: 'center', // Centra el texto adicional
        fontSize: 15,
    },
    input: {
        marginVertical: 50, // Margen vertical para el campo de entrada
    }
});