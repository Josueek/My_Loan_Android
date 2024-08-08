// Importamos las dependencias necesarias de React y React Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavStack from './src/navegation/NavStack';

// Componente principal de la aplicación
export default function App() {
  // Declaramos un estado para controlar si la app está lista
  const [appIsReady, setAppIsReady] = useState(false);

  // useEffect que se ejecuta una vez al montar el componente
  useEffect(() => {
    // Función asíncrona para simular la inicialización de la app
    async function inicia() {
      try {
        // Simulamos un tiempo de espera de 3 segundos antes de continuar
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        // Si ocurre un error, lo mostramos en la consola
        console.warn(e);
      } finally {
        // Una vez completado, marcamos la app como lista
        setAppIsReady(true); 
      }
    }
    // Llamamos a la función de inicialización
    inicia();
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez

  // Si la app no está lista, no renderizamos nada (puede ser un spinner o una pantalla de carga)
  if (!appIsReady) {
    return null; // o puedes retornar un componente de carga simple
  }

  // Una vez que la app está lista, renderizamos el contenedor de navegación
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}
