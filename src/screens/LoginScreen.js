import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackgroundImage from '../components/BackgroundImage';
import Input from '../components/Inputs/TextInput';
import Buttons from '../components/Buttons/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constantes from '../utils/constantes';

export default function LoginScreen({ navigation }) {
    const [Correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const ip = Constantes.IP;

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`${ip}/MyLoan-new/api/services/miperfil_services.php?action=getProfile&id=${userId}`);
            const data = await response.json();

            if (data.status === 1 && data.dataset) {
                const { institucion, cargo } = data.dataset;

                if (institucion === 'Institución A') {
                    if (cargo === 'Gerente' || cargo === 'Supervisor') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AdminTabNavigation' }],
                        });
                    } else if (cargo === 'Técnico') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'InstructoritrStack' }],
                        });
                    } else {
                        Alert.alert('Error', 'Cargo no válido');
                    }
                } else if (institucion === 'Institución B') {
                    if (cargo === 'Gerente') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AdmincfpStack' }],
                        });
                    } else if (cargo === 'Técnico') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'InstructorcfpStack' }],
                        });
                    } else {
                        Alert.alert('Error', 'Cargo no válido');
                    }
                } else {
                    Alert.alert('Error', 'Institución no válida');
                }
            } else {
                Alert.alert('Error', 'No se pudieron obtener los datos del usuario');
            }
        } catch (error) {
            console.error('Fetch User Data Error:', error);
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del usuario');
        }
    };

    const handleLogin = async () => {
        if (Correo.trim() === '' || clave.trim() === '') {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        const form = new FormData();
        form.append('correo_electronico', Correo);
        form.append('contrasena', clave);

        try {
            const response = await fetch(`${ip}/MyLoan-new/api/services/login_services.php?action=login`, {
                method: 'POST',
                body: form,
            });

            const data = await response.json();

            if (data.status === 1) {
                await AsyncStorage.setItem('user_id', data.id_usuario.toString());
                fetchUserData(data.id_usuario);
            } else {
                Alert.alert('Inicio de sesión fallido', data.error || 'Error desconocido');
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
        }
    };

    return (
        <BackgroundImage background="login">
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Ajusta según sea necesario
            >
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.scrollViewContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <Image
                        source={require('../../assets/myloanLogo.png')}
                        style={styles.logo}
                    />
                    <View style={styles.card}>
                        <Text style={styles.title}>Ingresa tu correo electrónico</Text>
                        <Input
                            placeHolder="Correo electrónico"
                            valor={Correo}
                            setTextChange={setCorreo}
                            contra={false}
                            keyboardType="email-address" // Configura el teclado para correo electrónico
                        />
                        <Text style={styles.title}>Ingresa tu contraseña</Text>
                        <Input
                            placeHolder="Contraseña"
                            valor={clave}
                            setTextChange={setClave}
                            contra={true}
                            keyboardType="default" // Configura el teclado para contraseñas
                        />
                        <Buttons
                            textoBoton={'Iniciar sesión'}
                            accionBoton={handleLogin}
                            style={styles.Iniciar}
                            color="Amarillo"
                        />
                    </View>
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
        color: '#000',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 40,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        alignItems: 'center',
        height: 'auto',
        justifyContent: 'center',
    },
    Iniciar: {
        marginTop: 20,
    }
});
