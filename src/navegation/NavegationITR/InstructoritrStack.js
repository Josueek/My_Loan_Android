// Importamos la librería React para poder utilizar JSX y otras funcionalidades de React.
import React from 'react';
// Importamos la función createStackNavigator de @react-navigation/stack, que nos permitirá crear una navegación en stack.
import { createStackNavigator } from '@react-navigation/stack';
// Importamos la pantalla EspaciosAsignados desde su ruta correspondiente.
import EspaciosAsignados from '../../screens/screenITR/profesorITR/EspaciosAsignados';
//Pantalla para ver los datos del espacio
import DatosEspacios from '../../screens/screenITR/profesorITR/DatosEspacio'
//Pantalla para ver las observaciones realizadas
import ObservHechas from '../../screens/screenITR/profesorITR/ObservHechas';

// Creamos una instancia del Stack Navigator.
const Stack = createStackNavigator();

// Definimos el componente InstructoritrStack que representará el stack de navegación.
const InstructoritrStack = () => {
    return (
        // Stack.Navigator es un contenedor que gestiona la navegación entre diferentes pantallas.
        <Stack.Navigator initialRouteName='EspaciosAsignados'>
            <Stack.Screen
                name="EspaciosAsignados"
                component={EspaciosAsignados}
                options={{ headerShown: false }} // Oculta el encabezado (header) de la pantalla.
            />
            <Stack.Screen
                name="DatosEspacios"
                component={DatosEspacios}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ObservHechas"
                component={ObservHechas}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

// Exportamos el componente InstructoritrStack para que pueda ser utilizado en otras partes de la aplicación.
export default InstructoritrStack;
