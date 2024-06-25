import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CodigoInstructorCFP from '../../screens/screenCFP/instructorCFP/CodigoInstructorC';
import InstructorTabNavigator from '../NavegationCFP/InstructorTabNavigator';
import LabDetalles from '../NavegationCFP/InstructorLabMenu';
//Pantalla de Cursos
import CursoDetalles from '../NavegationCFP/InstructorCursoMenu';
const Stack = createStackNavigator(); // Crea una pila de navegación

const InstructorcfpStack = () => {
    return (
        // Define la pila de navegación con las pantallas iniciales y sus opciones
        <Stack.Navigator initialRouteName='CodigoInstructorCFP'>
            <Stack.Screen
                name="CodigoInstructorCFP"
                component={CodigoInstructorCFP}
                options={{ headerShown: false }} // Oculta el encabezado para esta pantalla
            />
            <Stack.Screen
                name="InstructorTabNavigator"
                component={InstructorTabNavigator}
                options={{ headerShown: false }} // Oculta el encabezado para esta pantalla
            />
            <Stack.Screen
                name="CursoDetalles"
                component={CursoDetalles}
                options={{ headerShown: false }} // Oculta el encabezado para esta pantalla
            />
            <Stack.Screen
                name="LabDetalles"
                component={LabDetalles}
                options={{ headerShown: false }} // Oculta el encabezado para esta pantalla
            />
        </Stack.Navigator>
    );
}

export default InstructorcfpStack; // Exporta la pila de navegación