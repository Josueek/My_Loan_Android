import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BackgroundImage from '../../../components/BackgroundImage';

const LabEspaciosITR = () => {
    const [espacios, setEspacios] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        // Fetch data from API
        axios.get('http://192.168.0.12/myloan-new/api/services/espacios_services.php?action=getAllEspacios')
            .then(response => {
                if (response.data.status === 1) {
                    setEspacios(response.data.dataset); // Update state with fetched data
                } else {
                    console.error('Failed to fetch data:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePress = (id) => {
        // Save the selected ID to local storage
        localStorage.setItem('selectedEspacioId', id);
        navigation.navigate('LabDetalles');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id_espacio)}>
            <View style={styles.card}>
                <Image source={{ uri: `http://192.168.0.12/myloan-new/api/images/espacios/${item.foto_espacio}` }} style={styles.image} />
                <View style={styles.cardContent}>
                    <Text style={[styles.tipoEspacio, item.tipo_espacio === 'Taller' ? styles.taller : styles.laboratorio]}>
                        {item.tipo_espacio}
                    </Text>
                    <Text style={styles.nombreEspacio}>{item.nombre_espacio}</Text>
                    <Text style={styles.capacidad}>Capacidad: {item.capacidad_personas} personas</Text>
                    <Text style={styles.instructor}>Especialidad: {item.id_especialidad}</Text>
                    <Text style={styles.instructor}>Empleado: {item.id_empleado}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <BackgroundImage background="EspaciosITR">
            <View style={styles.container}>
                <Image source={require('../../../../assets/myloanLogo.png')} style={styles.logo} />
                <Text style={styles.title}>Listado de espacios asignados</Text>
                <FlatList
                    data={espacios}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id_espacio.toString()}
                    contentContainerStyle={styles.list}
                />
            </View>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
    },
    list: {
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: 380,
        height: 150,
    },
    image: {
        width: 150,
        height: 150,
    },
    cardContent: {
        padding: 20,
        marginBottom: 50,
        flex: 1,
    },
    tipoEspacio: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 15,
    },
    taller: {
        color: '#FFBD33',
    },
    laboratorio: {
        color: '#33A1FF',
    },
    nombreEspacio: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 10,
    },
    capacidad: {
        fontSize: 14,
        color: '#7c7c7c',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    estadoOcupado: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 5,
    },
    estadoLibre: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
        marginTop: 5,
    },
    curso: {
        fontSize: 12,
        color: '#7c7c7c',
    },
    instructor: {
        marginTop: 10,
        fontSize: 12,
        color: '#7c7c7c',
        marginTop: 10,
    },
    logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        marginBottom: 30,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        padding: 20,
        alignItems: 'center',
    },
});

export default LabEspaciosITR;
