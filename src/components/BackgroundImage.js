// src/components/BackgroundImage.js
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundImage = ({ children, background }) => {
    const backgrounds = {
        //Aca se manejan los diferentes fondos para el proyecto
        login: require('../../assets/FondosScreen/splashFondo.png'),
        // Añade aquí otros fondos que necesites
        //login: require('../../assets/FondosScreen/loginFondo.png'),
        // etc.
    };

    return (
        <ImageBackground
            source={backgrounds[background]}
            style={styles.background}
        >
            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BackgroundImage;
