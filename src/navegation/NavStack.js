import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/Splash';
import LoginScreen from '../screens/LoginScreen';
import InstructorcfpStack from './NavegationCFP/InstructorcfpStack';
import AdmincfpStack from './NavegationCFP/AdmincfpStack';
import InstructoritrStack from './NavegationITR/InstructoritrStack';
import AdminTabNavigation from '../navegation/NavegationITR/AdminTabNavigation';
import { Alert } from 'react-native';

const Stack = createStackNavigator();

const NavStack = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
               
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InstructorcfpStack"
                component={InstructorcfpStack}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="AdmincfpStack"
                component={AdmincfpStack}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}

            />
            <Stack.Screen
                name="InstructoritrStack"
                component={InstructoritrStack}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name='AdminTabNavigation'
                component={AdminTabNavigation}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default NavStack;
