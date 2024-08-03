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


// Componente principal de la pantalla de inicio de sesión
export default function LoginScreen({ navigation }) {
    const [Correo, setCorreo] = useState(''); // Estado para el nombre de usuario
    const [clave, setClave] = useState(''); // Estado para la contraseña

    const Fast = () => {
        navigation.navigate('AdminITRStack');
    }


    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
        const form = new FormData();
        //Mandamos los parametros de los datos de correo y clave
        form.append('correo_electronico', Correo);
        form.append('contrasena', clave);

        //Parametros de la API
        const response = await fetchData('login_services', 'login', form);
        //Condicional si los parametros son correctos
        if (response.status === 1) {
            Alert.alert('Sesion iniciada correctamente'.response.message);
            //Condicion para los diferentes niveles
            if (response.institucion === 1) {
                Alert.alert('Sesion iniciada Ricaldone'.response.message);
                navigation.navigate('InstructoritrStack');
            } else {
                Alert.alert('No se encontro una sesion'.response.message);
            }
        } else {
            Alert.alert('Inicio de sesión fallido', response.error || 'Unknown error');
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
                        accionBoton={Fast}
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
