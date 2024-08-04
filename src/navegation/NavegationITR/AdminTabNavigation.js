import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

//Prestamos hechos por el ricaldone
import PrestamoScreen from '../../screens/screenITR/adminITR/PrestamosScreen';
//Solicitudes recibidas de parte de insaford
import Solicitudes from '../../screens/screenITR/adminITR/Solicitudes';
//Espacios registrador por el ricaldone en el sistema web
import Espacios from '../../screens/screenITR/adminITR/Espacios';
//Ajustes
import Ajustes from '../../screens/screenITR/adminITR/Ajustes';
const Tab = createBottomTabNavigator(); // Crea un navegador de pestañas

const AdminTabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // Configura las opciones de pantalla para cada pestaña
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    // Define los íconos según el nombre de la ruta
                    if (route.name === 'PrestamoScreen') {
                        iconName = 'notifications-outline';
                    } else if (route.name === 'Solicitudes') {
                        iconName = 'document-text-outline';
                    } else if (route.name === 'Espacios') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Ajustes'){
                        iconName = 'cog-outline';
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
                options={{ tabBarLabel: 'Préstamos' }} // Nombre de la pestaña (no se mostrará, pero es útil para referencia)
            />
            <Tab.Screen
                name="Solicitudes"
                component={Solicitudes}
                options={{ tabBarLabel: 'Solicitudes' }} // Nombre de la pestaña (no se mostrará, pero es útil para referencia)
            />
            <Tab.Screen
                name="Espacios"
                component={Espacios}
                options={{ tabBarLabel: 'Espacios' }}
            />
            <Tab.Screen
                name="Ajustes"
                component={Ajustes}
                options={{ tabBarLabel: 'Ajustes' }}
            />

        </Tab.Navigator>
    );
}

export default AdminTabNavigation; // Exporta el navegador de pestañas
