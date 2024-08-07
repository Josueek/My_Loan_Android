// CursoCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CursoCard = ({ item, onEdit, onDelete }) => {
    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => onEdit(item)}
        >
            <View style={styles.header}>
                <Text style={[styles.estado, styles[`estado${item.estado}`]]}>{item.estado}</Text>
                <Text style={styles.codigo}>{item.codigo_curso}</Text>
            </View>
            <Text style={styles.nombre}>{item.nombre_curso}</Text>
            <Text style={styles.instructor}>{item.nombre_empleado}</Text>
            <View style={styles.footer}>
                <Text style={styles.cantidad}>Cantidad: {item.cantidad_personas}</Text>
                <Text style={styles.fecha}>Inicio: {item.fecha_inicio}</Text>
                <TouchableOpacity style={styles.botontrash} onPress={() => onDelete(item)}>
                    <Icon name="trash" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: 375,
        height: 170,
        marginBottom: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    estado: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#2ecc71'
    },
    codigo: {
        fontSize: 14,
        color: '#666',
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
        marginVertical: 20,
    },
    instructor: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cantidad: {
        fontSize: 14,
        color: '#666',
    },
    fecha: {
        fontSize: 14,
        color: '#666',
    }, 
    estadodenegado: {
        color: '#e74c3c',
    }, estadopendiente: {
        color: '#FCBE2D',
    }, estadofinalizado: {
        color: '#0000ff'
    },
    botontrash: {
        backgroundColor: '#ff0000',
        width: 30,
        height: 25,
        borderRadius: 5,
        padding: 3,
        paddingLeft: 5,
        alignContent: 'center',
    }
});

export default CursoCard;
