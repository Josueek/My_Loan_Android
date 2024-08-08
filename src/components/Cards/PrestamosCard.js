import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Card component para mostrar los registros de prestamos
*/
const CardComponent = ({ item }) => {
    const getTipoStyle = (tipo) => {
        //Casos para asignar diferentes tipos de colores
        switch (tipo) {
            case 'HTP':
                return styles.tipoHTP;
            case 'EC':
                return styles.tipoEC;
            case 'FCAT':
                return styles.tipoFCAT;
            default:
                return {};
        }
    };

    const getEstadoStyle = (estado) => {
        switch (estado) {
            case 'Aceptado':
                return styles.estadoAceptado;
            case 'Denegado':
                return styles.estadoDenegado;
            case 'En espera':
                return styles.estadoEnEspera;
            default:
                return {};
        }
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <Text style={[styles.tipo, getTipoStyle(item.tipo)]}>{item.tipo}</Text>
                <Text style={[styles.estado, getEstadoStyle(item.estado)]}>{item.estado}</Text>
            </View>
            <Text style={styles.material}>{item.Material}</Text>
            <Text style={styles.persona}>{item.persona}</Text>
            <View style={styles.footer}>
                <Text style={styles.cantidad}>Nombre curso: {item.cantidad}</Text>
                <Text style={styles.fecha}>{item.fecha}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: 350,
        height: 150,
        marginBottom: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tipo: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    estado: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    material: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
        marginVertical: 20,
    },
    persona: {
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
    tipoHTP: {
        color: '#FF0000',
    },
    tipoEC: {
        color: '#0B7F4B',
    },
    tipoFCAT: {
        color: '#FCBE2D',
    },
    estadoAceptado: {
        color: '#2ecc71',
    },
    estadoDenegado: {
        color: '#e74c3c',
    },
    estadoEnEspera: {
        color: '#f1c40f',
    },
});

export default CardComponent;
