// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavStack from './src/navegation/NavStack';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function inicia() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true); 
      }
    }
    inicia();
  }, []);

  if (!appIsReady) {
    return null; // o puedes retornar un componente de carga simple
  }

  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}
