import { StyleSheet, Text, TouchableOpacity } from 'react-native'; 

export default function Buttons({ textoBoton, accionBoton, color }) {
    // Definimos un objeto con los colores
    const Colores = {
        Amarillo: '#FCBE2D',
        Gris: '#C4C4C4',
    };

    // Si el color proporcionado coincide con una clave del objeto Colores, usamos ese color
    const buttonColor = Colores[color] || color;

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor, borderColor: buttonColor }]} onPress={accionBoton}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        width: 185,
        borderRadius: 13,
        padding: 10,
        marginVertical: 5
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF",
        fontWeight: '800',
        fontSize: 15,
    }
});
