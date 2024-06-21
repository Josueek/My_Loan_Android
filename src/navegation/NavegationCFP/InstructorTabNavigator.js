import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import InstructorCursoMenu from '../../navegation/NavegationCFP/InstructorCursoMenu';
import LabGeneral from '../../navegation/NavegationCFP/InstructorLabMenu';

const Tab = createBottomTabNavigator(); // Crea un navegador de pestañas

const InstructorTopTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // Configura las opciones de pantalla para cada pestaña
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    // Define los íconos según el nombre de la ruta
                    if (route.name === 'Curso del instructor') {
                        iconName = 'book-outline';
                    } else if (route.name === 'Laboratorio asignado') {
                        iconName = 'flask-outline';
                    }

                    // Retorna el ícono correspondiente
                    return <Icon name={iconName} color={color} size={size} />;
                },
                headerShown: false, // Oculta el encabezado
                tabBarActiveTintColor: '#FCBE2D', // Color de ícono activo
                tabBarInactiveTintColor: 'gray', // Color de ícono inactivo
                tabBarLabelStyle: { fontWeight: 'bold' }, // Estilo del texto de la etiqueta
            })}
        >
            <Tab.Screen
                name="Curso del instructor"
                component={InstructorCursoMenu}
                options={{ tabBarLabel: 'Curso' }} // Nombre de la pestaña (no se mostrará, pero es útil para referencia)
            />
            <Tab.Screen
                name="Laboratorio asignado"
                component={LabGeneral}
                options={{ tabBarLabel: 'Lab' }} // Nombre de la pestaña (no se mostrará, pero es útil para referencia)
            />
        </Tab.Navigator>
    );
}

export default InstructorTopTabNavigator; // Exporta el navegador de pestañas
