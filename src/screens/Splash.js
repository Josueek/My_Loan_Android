// src/screens/SplashScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../components/BackgroundImage';

export default function SplashScreen() {
    const [counter, setCounter] = useState(3);
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(prevCounter => prevCounter - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (counter === 0) {
            // Navegar a la pantalla de inicio de sesión después de que el temporizador llegue a cero
            navigation.navigate('Login');
        }
    }, [counter]);

    return (
        <BackgroundImage background="login">
            <View style={styles.container}>
                <Image
                    source={require('../../assets/myloanLogo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>
                    Administra de la mejor manera
                </Text>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
});
