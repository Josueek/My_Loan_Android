import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CodigoInstructorCFP from '../../screens/screenCFP/instructorCFP/CodigoInstructorC';
import InstructorTabNavigator from '../NavegationCFP/InstructorTabNavigator';

const Stack = createStackNavigator();

const InstructorcfpStack = () => {
    return (
        <Stack.Navigator initialRouteName='CodigoInstructorCFP'>
            <Stack.Screen
                name="CodigoInstructorCFP"
                component={CodigoInstructorCFP}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InstructorTabNavigator"
                component={InstructorTabNavigator}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default InstructorcfpStack;
