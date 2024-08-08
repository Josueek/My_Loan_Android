import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CustomButton({ label, onPress, backgroundColor, textColor, borderRadius, paddingHorizontal }) {
    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                { backgroundColor: backgroundColor || '#6200EE', borderRadius: borderRadius || 10, paddingHorizontal: paddingHorizontal || 20 }
            ]}
            onPress={onPress}
        >
            <View style={styles.buttonContent}>
                <Text style={[styles.buttonText, { color: textColor || '#FFF' }]}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // Añade una sombra en Android
        shadowColor: '#000', // Añade una sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase', // Convierte el texto a mayúsculas
    }
});
