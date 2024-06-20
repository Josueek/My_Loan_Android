
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Input({ placeHolder, Valor, contra, setTextChange, editable = true }) {
  // Componente para establecer un estilo de input general en todo el proyecto
  return (

    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={Valor}
      placeholderTextColor={'#000'}
      secureTextEntry={contra}
      onChangeText={(text) => setTextChange(text)}
      editable={editable}//Propiedad para activar o desactivar
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor: '#fff',
    fontFamily: 'Poppins',
    color: "#000",
    fontWeight: '300',
    width: 250,
    borderRadius: 20,
    borderColor: '#000',
    height: 45,  // Ajustar la altura
    padding: 10,  // Ajustar el padding
    marginVertical: 10,
    borderWidth: 1,
  },

});
