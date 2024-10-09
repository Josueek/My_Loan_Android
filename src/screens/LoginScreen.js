import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, ScrollView } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import Input from '../components/Inputs/TextInput';
import Buttons from '../components/Buttons/Buttons';
import fetchData from '../utils/fetchData'; // Asegúrate de que esta función está bien configurada para hacer fetch
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [Correo, setCorreo] = useState(''); // Estado para el correo electrónico
    const [clave, setClave] = useState(''); // Estado para la contraseña

    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
        if (Correo.trim() === '' || clave.trim() === '') {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        try {
            const form = new FormData();
            form.append('correo_electronico', Correo);
            form.append('contrasena', clave);

            // Enviar la petición al backend (Asegúrate que esta URL es correcta)
            const response = await fetchData('login_services', 'login', form); 

            // Verificar si el login fue exitoso o falló por bloqueo
            if (response.status === 1) {
                // Caso de éxito: manejar roles e instituciones 
                const institucion = parseInt(response.institucion);
                const cargo = parseInt(response.cargo);
                console.log('Response:', response);

                // Guardar el id del usuario en AsyncStorage
                if (response.id_usuario) {
                    await AsyncStorage.setItem('user_id', response.id_usuario.toString());
                } else {
                    console.log('id_usuario no está definido en la respuesta');
                    console.log(response.id_usuario)
                }

                // Navegación según el rol y la institución
                if (institucion === 1) { // Institución ITR
                    if (cargo === 1 || cargo === 2) { // Administrador
                        Alert.alert('Bienvenido', response.nombre);
                        navigation.navigate('AdminTabNavigation'); // Redirige al Admin de ITR
                    } else if (cargo === 3) { // Instructor
                        Alert.alert('Bienvenido', response.nombre);
                        navigation.navigate('InstructoritrStack'); // Redirige al Instructor de ITR
                    }
                } else if (institucion === 2) { // Institución CFP
                    if (cargo === 1 || cargo === 2) { // Administrador
                        Alert.alert('Bienvenido', response.nombre);
                        navigation.navigate('AdmincfpStack'); // Redirige al Admin de CFP
                    } else if (cargo === 3) { // Instructor.
                        Alert.alert('Bienvenido', response.nombre);
                        navigation.navigate('InstructorcfpStack'); // Redirige al Instructor de CFP
                    }
                } else {
                    Alert.alert('Acceso denegado', 'Cuenta no válida');
                }

            } else if (response.error) {
                // Si hubo un error en el inicio de sesión (cuenta bloqueada, etc.)
                Alert.alert('Error de inicio de sesión', response.error);
                console.log('Error: ', response.error);
            } else {
                Alert.alert('Error', 'Credenciales incorrectas. Verifica tu correo o contraseña.');
            }
        } catch (error) {
            Alert.alert('Error de conexión', 'Ocurrió un problema al conectarse con el servidor.');
            console.error('Login error:', error);
        }
    };

    return (
        <BackgroundImage background="login">
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/myloanLogo.png')} // Asegúrate de que la ruta del logo es correcta
                        style={styles.logo}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.title}>Ingresa tu correo electrónico</Text>
                    <Input
                        placeHolder="Correo electrónico"
                        valor={Correo}
                        setTextChange={setCorreo}
                        contra={false}
                    />
                    <Text style={styles.title}>Ingresa tu contraseña</Text>
                    <Input
                        placeHolder="Contraseña"
                        valor={clave}
                        setTextChange={setClave}
                        contra={true}
                    />
                    <Buttons
                        textoBoton={'Iniciar sesión'}
                        accionBoton={handleLogin}
                        style={styles.Iniciar}
                        color="Amarillo"
                    />
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
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
        justifyContent: 'center',
    },
    Iniciar: {
        marginTop: 20,
    }
});
