import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function InputMultiline({ placeHolder, Valor, contra, setTextChange, editable = true, multiline = false }) {
    // Componente para establecer un estilo de input general en todo el proyecto
    return (
        <TextInput
            style={[styles.Input, multiline && styles.multilineInput]}
            placeholder={placeHolder}
            value={Valor}
            placeholderTextColor={'#000'}
            secureTextEntry={contra}
            onChangeText={(text) => setTextChange(text)}
            editable={editable} // Propiedad para activar o desactivar
            multiline={multiline} // Activar o desactivar el modo multilinea
        />
    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#fff',
        fontFamily: 'Poppins',
        color: "#000",
        fontWeight: '200',
        width: 325,
        borderRadius: 20,
        borderColor: '#000',
        height: 45,  // Ajustar la altura
        padding: 10,  // Ajustar el padding
        marginVertical: 10,
        borderWidth: 1,
    },
    multilineInput: {
        height: 150, // Ajustar la altura para el campo de comentario
        textAlignVertical: 'top', // Alinear el texto al principio del campo
        paddingTop: 10, // Ajustar el padding superior para el campo de comentario
    },
});