// src/components/BackgroundImage.js
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundImage = ({ children, background }) => {
    const backgrounds = {
        //Aca se manejan los diferentes fondos para el proyecto
        login: require('../../assets/FondosScreen/splashFondo.png'),
         /*Fondos para la pantalla de instructores CFP*/
         InstructorCFPC: require('../../assets/FondosScreen/CodigoInstructorSceen.png')
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
