import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import InstructorTopTabNavigatorCurso from './InstructorTopTabNavigatorCurso';
import InstructorTopTabNavigatorLab from './InstructorTopTabNavigatorLab';

const Tab = createBottomTabNavigator();
//Menu principal en la parte de instructores
const InstructorTopTabNavigator = () => {
    return (
        //En esta parte especificamos los colores para los botones activos e inactivos
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Curso') {
                        iconName = 'book-outline';
                    } else if (route.name === 'Lab') {
                        iconName = 'flask-outline';
                    }

                    return <Icon name={iconName} color={color} size={size} />;
                },
                tabBarActiveTintColor: '#FCBE2D', // Color cuando la pestaña está activa
                tabBarInactiveTintColor: 'gray',  // Color cuando la pestaña está inactiva
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', } // Tamaño de la letra de la etiqueta

           })}>
            <Tab.Screen name="Curso" component={InstructorTopTabNavigatorCurso} options={{ tabBarLabel: 'Curso' }} />
            <Tab.Screen name="Lab" component={InstructorTopTabNavigatorLab} options={{ tabBarLabel: 'Lab' }} />
        </Tab.Navigator>
    );
}

export default InstructorTopTabNavigator;
