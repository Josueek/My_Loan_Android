import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function NumberInput({ value, onChange, placeholder }) {
  const handleChange = (text) => {
    // Filtrar solo números
    const numericText = text.replace(/[^0-9]/g, '');
    onChange(numericText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 45,
    width: 175, 
    fontWeight: '300',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
});
