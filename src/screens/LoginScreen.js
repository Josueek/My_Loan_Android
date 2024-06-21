import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
//Componente para establecer los fondos de pantalla
import BackgroundImage from '../components/BackgroundImage';
//Componente Input
import Input from '../components/Inputs/TextInput';
//Componente Button
import Buttons from '../components/Buttons/Buttons';

//Login basico para iniciar sesion 
const authenticateUser = (Usuario, clave) => {
    if (Usuario === 'aa' && clave === '123') {
        return { institucion: 'CFP', level: 'instructorcfp' };
    } else if (Usuario === 'ee' && clave === '123') {
        return { institucion: 'CFP', level: 'admincfp' };
    } else if (Usuario === 'ii' && clave === '123') {
        return { institucion: 'itr', level: 'admin' };
    } else {
        return null;
    }
};

export default function LoginScreen({ navigation }) {
    const [Usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('123');

    const IniciarSesion = () => {
        console.log('Ejecutando handle login')
        const user = authenticateUser(Usuario, clave);
        if (user) {
            console.log("Propiedad", JSON.stringify(user));

            if (user.level === 'instructorcfp') {
                navigation.navigate('InstructorcfpStack');
            } else if (user.level === 'admincfp') {
                navigation.navigate('AdmincfpStack');
            } else {
                Alert.alert('Error', 'Institución no reconocida');
            }
        } else {
            Alert.alert('Error', 'Credenciales incorrectas');
            console.log("Desde authenticate");
        }
    };

    return (
        <BackgroundImage background="login">
            <View style={styles.container}>
                <Image
                    source={require('../../assets/myloanLogo.png')}
                    style={styles.logo}
                />
                <View style={styles.card}>
                    <Text style={styles.title}>Ingresa tu nombre de usuario</Text>
                    <Input
                        placeHolder="Usuario"
                        valor={Usuario}
                        setTextChange={setUsuario}
                        contra={false}
                    />
                    <Text style={styles.title}>Ingresa tu contraseña</Text>
                    <Input
                        placeHolder="Password"
                        valor={clave}
                        setTextChange={setClave}
                        contra={true}
                    />
                    <Buttons
                        textoBoton={'Iniciar sesión'}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        height: '35%',
        justifyContent: 'center',
    },
    Iniciar: {
        marginTop: 20,
    }
});
