// Importamos la librería React para poder utilizar JSX y otras funcionalidades de React.
import React from 'react';

// Importamos la función createStackNavigator de @react-navigation/stack, que nos permitirá crear una navegación en stack.
import { createStackNavigator } from '@react-navigation/stack';

// Importamos la pantalla EspaciosAsignados desde su ruta correspondiente.
import EspaciosAsignados from '../../screens/screenITR/profesorITR/EspaciosAsignados';

// Creamos una instancia del Stack Navigator.
const Stack = createStackNavigator();

// Definimos el componente InstructoritrStack que representará el stack de navegación.
const InstructoritrStack = () => {
    return (
        // Stack.Navigator es un contenedor que gestiona la navegación entre diferentes pantallas.
        <Stack.Navigator initialRouteName='EspaciosAsignados'>
            {/* 
                Stack.Screen define una pantalla dentro del Stack Navigator.
                - name: Nombre de la ruta de la pantalla, que se utilizará para navegar a ella.
                - component: El componente de React que se renderizará cuando se navegue a esta pantalla.
                - options: Configuraciones adicionales para esta pantalla.
            */}
            <Stack.Screen
                name="EspaciosAsignados"
                component={EspaciosAsignados}
                options={{ headerShown: false }} // Oculta el encabezado (header) de la pantalla.
            />
        </Stack.Navigator>
    );
}

// Exportamos el componente InstructoritrStack para que pueda ser utilizado en otras partes de la aplicación.
export default InstructoritrStack;
