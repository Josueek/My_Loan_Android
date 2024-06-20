import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Buttons({ textoBoton, accionBoton, color, iconName }) {
    // Definimos un objeto con los colores
    const Colores = {
        Amarillo: '#FCBE2D',
        Gris: '#C4C4C4',
        DownLoad: '#F9E5B6'
    };

    // Si el color proporcionado coincide con una clave del objeto Colores, usamos ese color
    const buttonColor = Colores[color] || color;

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor, borderColor: buttonColor }]} onPress={accionBoton}>
            <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>{textoBoton}</Text>
                {iconName && <Icon name={iconName} size={20} color="#FFF" style={styles.icon} />}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        width: 300,
        borderRadius: 25,
        padding: 10,
        marginVertical: 5
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 5, // Cambiado de marginRight a marginLeft
        backgroundColor: '#FCBE2D',
        padding: 5,

    },
    buttonText: {
        flex: 1,
        textAlign: 'left', // Cambiado de center a left
        color: "#FCBE2D",
        fontWeight: '800',
        fontSize: 15,
    }
});
