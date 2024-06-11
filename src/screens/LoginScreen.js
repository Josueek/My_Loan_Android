// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
// Importamos el Input
import Input from '../components/Inputs/TextInput';
//Importamos el button
import Button from '../components/Buttons/Button';
 
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Manejar el inicio de sesión
    Alert.alert('Login', `Email: ${email}, Password: ${password}`);
  };

  //Pantalla de login usando los componentes creados
  return (
    //BackgroundImage contiene el fondo de la pantalla
    <BackgroundImage background="login">
      <View style={styles.container}>
        <Image
          source={require('../../assets/myloanLogo.png')}
          style={styles.logo} />
          
        <View style={styles.card}>
          <Text style={styles.title}>Ingresa tu nombre de usuario</Text>
          <Input
            placeHolder="Email"
            setValor={email}
            contra={false}
            setTextChange={setEmail}
          />
          <Text style={styles.title}>Ingresa tu contraseña</Text>
          <Input
            placeHolder="Password"
            setValor={password}
            contra={true}
            setTextChange={setPassword}
          />
          <Button 
          textoBoton={'Iniciar sesión'}
          accionBoton={handleLogin}
          style={styles.Iniciar}
          color="Amarillo"/>
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
});
