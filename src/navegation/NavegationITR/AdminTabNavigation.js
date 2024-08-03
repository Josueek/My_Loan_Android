import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
 
import PrestamoScreen from '../../screens/screenITR/adminITR/PrestamosScreen';
import Solicitudes from '../../screens/screenITR/adminITR/Solicitudes';

const Tab = createBottomTabNavigator(); // Crea un navegador de pestañas

const AdminTabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // Configura las opciones de pantalla para cada pestaña
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    // Define los íconos según el nombre de la ruta
                    if (route.name === 'InstructorCurso') {
                        iconName = 'book-outline';
                    } else if (route.name === 'LabGeneral') {
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
                name="PrestamoScreen"
                component={PrestamoScreen}
                options={{ tabBarLabel: 'Prestamos' }} // Nombre de la pestaña (no se mostrará, pero es útil para referencia)
            />
            <Tab.Screen
                name="LabGeneral"
                component={LabGeneral}
                options={{ tabBarLabel: 'Lab' }} // Nombre de la pestaña (no se mostrará, pero es útil para referencia)
            />
             
        </Tab.Navigator>
    );
}

export default AdminTabNavigation; // Exporta el navegador de pestañas
