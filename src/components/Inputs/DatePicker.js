import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePickerInput({ placeHolder, valor, setTextChange, editable = true }) {
  const [date, setDate] = useState(valor || new Date()); // Inicializa date con valor o con una nueva fecha si no hay valor
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setTextChange(currentDate); // Actualiza el estado en CrearCursoScreen con la fecha seleccionada
  };

  const showDatepicker = () => {
    if (editable) {
      setShow(true);
    }
  };

  // Función para obtener la fecha en formato de cadena legible
  const getFormattedDate = () => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString(); // Si date es un objeto Date válido, devuelve la fecha formateada
    }
    return ''; // Devuelve una cadena vacía si date no es válido
  };

  return (
    <TouchableOpacity onPress={showDatepicker}>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        value={getFormattedDate()} // Llama a la función getFormattedDate para obtener la fecha formateada
        placeholderTextColor={'#000'}
        editable={false} // Deshabilita la edición directa del input
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    fontFamily: 'Poppins',
    color: "#000",
    fontWeight: '300',
    width: 175,
    borderRadius: 20,
    borderColor: '#000',
    height: 45,  // Ajustar la altura
    padding: 10,  // Ajustar el padding
    marginVertical: 10,
    borderWidth: 1,
  },
});
