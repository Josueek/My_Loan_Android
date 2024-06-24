import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
//Componente para establecer los fondos de pantalla
import BackgroundImage from '../components/BackgroundImage';
//Componente Input
import Input from '../components/Inputs/TextInput';
//Componente Button
import Buttons from '../components/Buttons/Buttons';

// Función para autenticar al usuario
const authenticateUser = (Usuario, clave) => {
    // Verifica las credenciales y retorna un objeto con información del usuario si coinciden
    if (Usuario === 'aa' && clave === '123') {
        return { institucion: 'CFP', level: 'instructorcfp' };
    } else if (Usuario === 'ee' && clave === '123') {
        return { institucion: 'CFP', level: 'admincfp' };
    } else if (Usuario === 'ii' && clave === '123') {
        return { institucion: 'itr', level: 'admin' };
    } else {
        return null; // Retorna null si las credenciales no coinciden
    }
};

// Componente principal de la pantalla de inicio de sesión
export default function LoginScreen({ navigation }) {
    const [Usuario, setUsuario] = useState(''); // Estado para el nombre de usuario
    const [clave, setClave] = useState('123'); // Estado para la contraseña

    // Función para manejar el inicio de sesión
    const IniciarSesion = () => {
        console.log('Ejecutando handle login');
        const user = authenticateUser(Usuario, clave); // Autentica al usuario
        if (user) {
            console.log("Propiedad", JSON.stringify(user));

            // Redirige al usuario según su nivel de acceso
            if (user.level === 'instructorcfp') {
                navigation.navigate('InstructorcfpStack');
            } else if (user.level === 'admincfp') {
                navigation.navigate('AdmincfpStack');
            } else {
                Alert.alert('Error', 'Institución no reconocida');
            }
        } else {
            Alert.alert('Error', 'Credenciales incorrectas'); // Muestra una alerta si las credenciales son incorrectas
            console.log("Desde authenticate");
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
                    <Text style={styles.title}>Ingresa tu nombre de usuario</Text>
                    <Input
                        placeHolder="Usuario" // Campo de entrada para el nombre de usuario
                        valor={Usuario}
                        setTextChange={setUsuario}
                        contra={false}
                    />
                    <Text style={styles.title}>Ingresa tu contraseña</Text>
                    <Input
                        placeHolder="Password" // Campo de entrada para la contraseña
                        valor={clave}
                        setTextChange={setClave}
                        contra={true}
                    />
                    <Buttons
                        textoBoton={'Iniciar sesión'} // Botón para iniciar sesión
                        accionBoton={IniciarSesion}
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
