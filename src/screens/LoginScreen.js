import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
//Componente para establecer los fondos de pantalla
import BackgroundImage from '../components/BackgroundImage';
//Componente Input
import Input from '../components/Inputs/TextInput';
//Componente Button
import Buttons from '../components/Buttons/Buttons';
//Plantilla para la hacer las peticiones
import fetchData from '../utils/fetchData';
// Guardar el id del cliente iniciado
import AsyncStorage from '@react-native-async-storage/async-storage';


// Componente principal de la pantalla de inicio de sesión
export default function LoginScreen({ navigation }) {
    const [Correo, setCorreo] = useState(''); // Estado para el nombre de usuario
    const [clave, setClave] = useState(''); // Estado para la contraseña

    const Fast = () => {
        navigation.navigate('AdminTabNavigation');
    }

    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
        if (Correo.trim() === '' || clave.trim() === '') {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        const form = new FormData();
        // Mandamos los parametros de los datos de correo y clave
        form.append('correo_electronico', Correo);
        form.append('contrasena', clave);

        // Parametros de la API
        const response = await fetchData('login_services', 'login', form);

        //Condicional para verificar los niveles de usuario
        if (response.status === 1) {
            //Si la sesion es correcta, guardamos el id del usuario logueado
            await AsyncStorage.setItem('user_id', response.id_usuario.toString());

            //institucion de Ricaldone === 1
            if (response.institucion === 1) {
                //Cargo === 1 es Admin
                if (response.cargo === 1 || response.cargo === 2) {
                    //Muestra el nombre y luego pasa al menu correspondiente
                    Alert.alert('Bienvenido', response.nombre)
                    navigation.navigate('AdminTabNavigation'); // Adwhmin ITR

                } else if (response.cargo === 3) {
                    Alert.alert('Bienvenido, ', response.nombre)
                    navigation.navigate('InstructoritrStack'); // Instructor ITR
                }
            } //Institucion === 2 es CFP
            else if (response.institucion === 2) {
                //Cargo 1 es admin 
                if (response.cargo === 1) {
                    Alert.alert('Bienvenido', response.nombre)
                    navigation.navigate('AdmincfpStack'); // Admin CFP
                } else if (response.cargo === 3) {
                    Alert.alert('Bienvenido', response.nombre)
                    navigation.navigate('InstructorcfpStack'); // Instructor CFP
                }
            } else {
                Alert.alert('Acceso denegado, cuenta no valida');
            }
        } else {
            Alert.alert('Inicio de sesión fallido', response.error || 'Error desconocido');
        }
    };

    return (
        <BackgroundImage background="login">
            <View style={styles.container}>
                <Image
                    source={require('../../assets/myloanLogo.png')} // Muestra el logo de la aplicación
                    style={styles.logo}
                />
                <View style={styles.card}>
                    <Text style={styles.title}>Ingresa tu correo electrónico</Text>
                    <Input
                        placeHolder="Correo electrónico" // Campo de entrada para el nombre de usuario
                        valor={Correo}
                        setTextChange={setCorreo}
                        contra={false}
                    />
                    <Text style={styles.title}>Ingresa tu contraseña</Text>
                    <Input
                        placeHolder="Contraseña" // Campo de entrada para la contraseña
                        valor={clave}
                        setTextChange={setClave}
                        contra={true}
                    />
                    <Buttons
                        textoBoton={'Iniciar sesión'} // Botón para iniciar sesión
                        accionBoton={handleLogin}
                        style={styles.Iniciar}
                        color="Amarillo"
                    />
                </View>
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
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
        color: '#000', // Estilo del texto del título
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20, // Estilo del logo
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
        height: '35%',
        justifyContent: 'center', // Estilo de la tarjeta que contiene el formulario de inicio de sesión
    },
    Iniciar: {
        marginTop: 20, // Estilo del botón de inicio de sesión
    }
});
