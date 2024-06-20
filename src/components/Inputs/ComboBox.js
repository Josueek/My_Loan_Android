import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// Libreria de iconos
import Icon from 'react-native-vector-icons/Ionicons';

//Componente tipo combobox
export default function ComboBox({ selectedValue, onValueChange, items, placeholder }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleValueChange = (itemValue) => {
        onValueChange(itemValue);
        setDropdownVisible(false);
    };

    const renderItem = ({ item }) => (
        //Se define el campo con el placeHolder, para luego abrir el flatList
        <TouchableOpacity
            style={styles.item}
            onPress={() => handleValueChange(item.value)}
        >
            <Text style={styles.itemText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => setDropdownVisible(!dropdownVisible)}
            >
                <Text style={styles.selectedText}>
                    {selectedValue ? items.find(item => item.value === selectedValue).label : placeholder}
                </Text>
                <Icon name={dropdownVisible ? "chevron-up" : "chevron-down"} size={20} color="#000" />
            </TouchableOpacity>

            {dropdownVisible && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.value}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        height: 45, // Ajustar altura
        width: 175,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedText: {
        color: '#000',
        flex: 1,
    },
    dropdown: {
        position: 'absolute',
        top: 50, // Ajusta según sea necesario
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        zIndex: 1,
    },
    item: {
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    itemText: {
        color: '#000',
        fontWeight: '300',
    },
});
