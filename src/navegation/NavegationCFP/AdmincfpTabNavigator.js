import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Libreria de iconos
import Icon from 'react-native-vector-icons/Ionicons';
//Pantallas a mostrar en el menu
import PrestamoScreen from '../../screens/screenCFP/adminCFP/PrestamoScreen';
import CursoScreen from '../../screens/screenCFP/adminCFP/CursoScreen';

const Tab = createBottomTabNavigator();

const AdmincfpTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    //Definimos los iconos
                    if (route.name === 'Prestamo') {
                        iconName = 'notifications';
                    } else if (route.name === 'CursoScreen') {
                        iconName = 'bookmarks';
                    }

                    return <Icon name={iconName} color={color} size={size} />;
                },
                headerShown: false,
                tabBarActiveTintColor: '#FCBE2D',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: { fontWeight: 'bold' },
            })}
        >
            <Tab.Screen
                name="Prestamo"
                component={PrestamoScreen}
                options={{ tabBarLabel: 'Préstamo' }} // Aunque no se mostrará, es recomendable mantenerlo para referencia
            />
            <Tab.Screen
                name="CursoScreen"
                component={CursoScreen}
                options={{ tabBarLabel: 'Cursos' }} // Aunque no se mostrará, es recomendable mantenerlo para referencia
            />
        </Tab.Navigator>
    );
}

export default AdmincfpTabNavigator;
