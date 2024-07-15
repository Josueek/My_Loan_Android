// src/screens/SplashScreen.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../../components/BackgroundImage';

// Definición del componente funcional SplashScreen
export default function SplashScreen() {
    // No se están utilizando useState ni useEffect, pero se podrían usar para agregar lógica de temporización o inicialización si fuera necesario.

    return (
        // El componente BackgroundImage se usa para establecer una imagen de fondo en toda la pantalla.
        <BackgroundImage background="AdminCFP">
            {/* View contenedor para centrar el contenido */}
            <View style={styles.container}>
                {/* Logo de la aplicación */}
                <Image
                    source={require('../../../../assets/myloanLogo.png')}
                    style={styles.logo}
                />
                {/* Texto de título o slogan */}
                <Text style={styles.title}>
                    Administra de la mejor manera
                </Text>
            </View>
        </BackgroundImage>
    );
}

// Estilos para el componente SplashScreen
const styles = StyleSheet.create({
    // Estilo para el contenedor principal: ocupa todo el espacio disponible, centra su contenido vertical y horizontalmente
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilo para la imagen del logo: tamaño 150x150, mantiene su proporción y agrega un margen inferior
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    // Estilo para el texto del título: tamaño de fuente 20, alineación centrada
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
});
