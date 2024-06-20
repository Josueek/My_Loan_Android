import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import InstructorCursoMenu from '../../navegation/NavegationCFP/InstructorCursoMenu';
import LabGeneral from '../../navegation/NavegationCFP/InstructorLabMenu';

const Tab = createBottomTabNavigator();

const InstructorTopTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Curso del instructor') {
                        iconName = 'book-outline';
                    } else if (route.name === 'Laboratorio asignado') {
                        iconName = 'flask-outline';
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
                name="Curso del instructor"
                component={InstructorCursoMenu}
                options={{ tabBarLabel: 'Curso' }} // Aunque no se mostrará, es recomendable mantenerlo para referencia
            />
            <Tab.Screen
                name="Laboratorio asignado"
                component={LabGeneral}
                options={{ tabBarLabel: 'Lab' }} // Aunque no se mostrará, es recomendable mantenerlo para referencia
            />
        </Tab.Navigator>
    );
}

export default InstructorTopTabNavigator;
