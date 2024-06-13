// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
//Componente para establecer un fondo diferente en cada pantalla
import BackgroundImage from '../../../components/BackgroundImage';


export default function LoginScreen() {
    const Siguiente = () => {

    }
    //Pantalla de login usando los componentes creados
    return (
        //BackgroundImage contiene el fondo de la pantalla
        <BackgroundImage>
            <View style={styles.container}>
                
                <Text style={styles.Texto}>Si no tienes acceso al código comunicate
                    con tu superiores</Text>
               
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

