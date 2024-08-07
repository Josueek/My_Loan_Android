// src/screens/SplashScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../components/BackgroundImage';

export default function SplashScreen() {
    const [counter, setCounter] = useState(3); // Estado para el contador, inicializado en 3 segundos
    const navigation = useNavigation(); // Hook para manejar la navegación

    useEffect(() => {
        // Efecto para decrementar el contador cada segundo
        const timer = setInterval(() => {
            setCounter(prevCounter => prevCounter - 1);
        }, 1000);

        return () => clearInterval(timer); // Limpia el intervalo cuando el componente se desmonta
    }, []);

    useEffect(() => {
        if (counter === 0) {
            // Reemplaza la pila de navegación actual con la pantalla de inicio de sesión
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }, [counter]); // Efecto se ejecuta cada vez que cambia el valor del contador

    return (
        <BackgroundImage background="login"> 
            <View style={styles.container}>
                <Image
                    source={require('../../assets/myloanLogo.png')} // Muestra el logo de la aplicación
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
        flex: 1, // Ocupa todo el espacio disponible
        justifyContent: 'center', // Centra el contenido verticalmente
        alignItems: 'center', // Centra el contenido horizontalmente
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20, // Estilo del logo
    },
    title: {
        fontSize: 20,
        textAlign: 'center', // Estilo del texto de bienvenida
    },
});
