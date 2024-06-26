// Importamos la librería React para poder utilizar JSX y otras funcionalidades de React.
import React from 'react';

// Importamos la función createStackNavigator de @react-navigation/stack, que nos permitirá crear una navegación en stack.
import { createStackNavigator } from '@react-navigation/stack';

import PrestamosScreen from '../../screens/screenITR/adminITR/PrestamosScreen';

// Creamos una instancia del Stack Navigator.
const Stack = createStackNavigator();

// Definimos el componente InstructoritrStack que representará el stack de navegación.
const AdminitrStack = () => {
    return (
       
        <Stack.Navigator initialRouteName='PrestamosScreen'>
            <Stack.Screen
                name="PrestamosScreen"
                component={EspaciosAsignados}
                options={{ headerShown: false }} // Oculta el encabezado (header) de la pantalla.
            />
        </Stack.Navigator>
    );
}


export default AdminitrStack;
