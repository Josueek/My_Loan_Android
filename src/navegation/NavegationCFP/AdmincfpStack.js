import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//TabNavigator
import AdmincfpTabNavigator from '../NavegationCFP/AdmincfpTabNavigator';
//Pantallas
import CrearCursosScreen from '../../screens/screenCFP/adminCFP/CrearCursoScreen';
const Stack = createStackNavigator();

const InstructorcfpStack = () => {
    return (
        <Stack.Navigator initialRouteName='AdmincfpTabNavigator'>
            <Stack.Screen
                name="AdmincfpTabNavigator"
                component={AdmincfpTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CrearCursosScreen"
                component={CrearCursosScreen}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default InstructorcfpStack;
