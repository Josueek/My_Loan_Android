import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Constantes from '../../utils/constantes';

const { width: screenWidth } = Dimensions.get('window');

const EspacioCard = ({ item }) => {
    const ip = Constantes.IP;

    const openPdf = (url) => {
        WebBrowser.openBrowserAsync(url);
    };

    const getTipoStyle = (tipo) => {
        switch (tipo) {
            case 'Laboratorio':
                return styles.laboratorio;
            case 'Taller':
                return styles.taller;
            default:
                return {};
        }
    };

    const getEspecialidadStyle = (especialidad) => {
        switch (especialidad) {
            case 'Informática':
                return styles.informatica;
            case 'Electrónica':
                return styles.electronica;
            case 'Mecánica':
                return styles.mecanica;
            case 'Diseño':
                return styles.diseno;
            default:
                return {};
        }
    };

    const getInstitucionStyle = (institucion) => {
        switch (institucion) {
            case 'Ricaldone':
                return styles.ricaldone;
            case 'Insaford':
                return styles.insaford;
            default:
                return {};
        }
    };

    return (
        <View style={styles.cardContainer}>
            {item.foto && (
                <Image source={{ uri: `${ip}/MyLoan-new/api/images/espacios/${item.foto}` }} style={styles.foto} />
            )}
            <View style={styles.textContainer}>
                <Text style={[styles.tipo, getTipoStyle(item.tipo)]}>{item.tipo}</Text>
                <Text style={[styles.nombre]}>{item.nombre}</Text>
                <Text style={styles.capacidad}>Capacidad: {item.capacidad} personas</Text>
                <Text style={[styles.especialidad, getEspecialidadStyle(item.nombre_especialidad)]}>
                    Especialidad: {item.nombre_especialidad}
                </Text>
                {item.nombre_institucion && (
                    <Text style={[styles.institucion, getInstitucionStyle(item.nombre_institucion)]}>
                        Institución: {item.nombre_institucion}
                    </Text>
                )}
                <Text style={styles.empleado}>Empleado: {item.nombre_empleado}</Text>
                {item.inventario && (
                    <TouchableOpacity onPress={() => openPdf(`${ip}/MyLoan-new/api/inventario/${item.inventario}`)}>
                        <Text style={styles.inventario}>Ver Inventario</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: screenWidth * 0.9,
        marginBottom: 20,
    },
    foto: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginRight: 10,
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    tipo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    laboratorio: {
        color: '#33A1FF',
    },
    taller: {
        color: '#FFBD33',
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    capacidad: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    especialidad: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    institucion: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
        fontWeight: '800'
    },
    empleado: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    inventario: {
        fontSize: 14,
        color: '#0066cc',
        textDecorationLine: 'underline',
    },
    informatica: {
        color: '#1E90FF',
    },
    electronica: {
        color: '#FF4500',
    },
    mecanica: {
        color: '#32CD32',
    },
    diseno: {
        color: '#DAA520',
    },
    ricaldone: {
        color: '#006400',
    },
    insaford: {
        color: '#8B0000',
    },
});

export default EspacioCard;
