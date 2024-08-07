import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Libreria de iconos
import Icon from 'react-native-vector-icons/Ionicons';
//Pantallas a mostrar en el menu
import PrestamoScreen from '../../screens/screenCFP/adminCFP/PrestamoScreen';
import CursoScreen from '../../screens/screenCFP/adminCFP/CursoScreen';
import EspaciosScreen from '../../screens/screenCFP/adminCFP/EspaciosITRScreen';
import Ajuestes from '../../screens/screenCFP/adminCFP/Ajustes';

const Tab = createBottomTabNavigator();

const AdmincfpTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    //Definimos los iconos y con el name se asigna
                    if (route.name === 'Prestamo') {
                        iconName = 'notifications-outline';
                    } else if (route.name === 'CursoScreen') {
                        iconName = 'bookmarks-outline';
                    } else if (route.name === 'EspaciosScreen') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Ajuestes') {
                        iconName = 'cog';
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
            <Tab.Screen
                name="EspaciosScreen"
                component={EspaciosScreen}
                options={{ tabBarLabel: 'Espacios' }}
            />
            <Tab.Screen
                name="Ajuestes"
                component={Ajuestes}
                options={{ tabBarLabel: 'Ajuestes' }}
            />
        </Tab.Navigator>
    );
}

export default AdmincfpTabNavigator;
