import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/Splash';
//Importamos las pantallas a presentar, navegabilidad
import LoginScreen from '../screens/LoginScreen';
import InstructorcfpStack from './NavegationCFP/InstructorcfpStack';
import AdmincfpStack from './NavegationCFP/AdmincfpStack';

const Stack = createStackNavigator();

const NavStack = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InstructorcfpStack"
                component={InstructorcfpStack}
                options={{ headerShown: false }}
            />
             <Stack.Screen
                name="AdmincfpStack"
                component={AdmincfpStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default NavStack;
