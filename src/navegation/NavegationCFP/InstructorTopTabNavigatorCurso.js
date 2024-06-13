import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Importamos las pantallas que se van a mostrar
import CursoGeneral from '../../screens/screenCFP/instructorCFP/CursoGeneral';
import CursoDetalle from '../../screens/screenCFP/instructorCFP/CursoDetalle';

const Tab = createBottomTabNavigator();

const InstructorTopTabNavigatorCurso = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#AAA',
                tabBarLabelStyle: { fontSize: 16 },
                tabBarStyle: { position: 'absolute', top: StatusBar.currentHeight , left: 0, right: 0, backgroundColor: '#FCBE2D' } // Mueve el tabBar a la parte superior
            }}>
                {/*"/*<Tab.Screen name="General" component={CursoGeneral} options={{tabBArVisible: false}}/>"*/}
                <Tab.Screen name="CursoGeneral" component={CursoGeneral} options={{tabBArVisible: false}}/>
                <Tab.Screen name="CursoDetalle" component={CursoDetalle} options={{tabBArVisible: false}}/>
        </Tab.Navigator>
    );
}
export default InstructorTopTabNavigatorCurso;