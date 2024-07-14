// src/components/BackgroundImage.js
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundImage = ({ children, background }) => {
    const backgrounds = {
        //Aca se manejan los diferentes fondos para el proyecto
        login: require('../../assets/FondosScreen/splashFondo.png'),
        /*Fondos para la pantalla de instructores CFP*/
        InstructorCFPC: require('../../assets/FondosScreen/CodigoInstructorSceen.png'),
        CursoInstructor: require('../../assets/FondosScreen/screenCursoInstructor.png'),
        LabInstructor: require('../../assets/FondosScreen/LabGeneralScreen.png'),
        /* Fondos para adminstradores CFP */
        AdminCFP: require('../../assets/FondosScreen/adminSplash.png'),
        EspaciosITR: require('../../assets/FondosScreen/EspaciosScreen.png'),
        //Fondos para instructores ITR
        InstructoritrScreen: require('../../assets/FondosScreen/InstructoritrScreen.png'),
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
