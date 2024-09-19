import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import BackgroundImage from '../../../components/BackgroundImage';


const LabEspaciosITR = () => {
    const [espacios, setEspacios] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        // Fetch data from API
        axios.get('http://10.10.2.143/myloan-new/api/services/espacios_services.php?action=getAllEspacios')
            .then(response => {
                if (response.data.status === 1) {
                    console.log('Datos obtenidos de la API:', response.data.dataset); // Mostrar los datos obtenidos de la API
                    setEspacios(response.data.dataset); // Update state with fetched data
                } else {
                    console.error('Failed to fetch data:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePress = async (id) => {
        try {
            await AsyncStorage.setItem('selectedEspacioId', id.toString()); // Guardar el ID como string
            navigation.navigate('LabDetalles'); // Navegar a la pantalla LabGeneral
        } catch (error) {
            console.error('Error al guardar el ID del espacio:', error);
        }
    };
    
    

    const renderItem = ({ item }) => {
        console.log('Espacio renderizado:', item); // Mostrar los datos de cada espacio renderizado
        const imageUrl = `http://10.10.2.143/myloan-new/api/images/espacios/${item.foto_espacio}`;
        console.log('Ruta de la imagen:', imageUrl); // Mostrar la ruta de la imagen
    
        return (
            <TouchableOpacity onPress={() => handlePress(item.id_espacio)}>
                
                <View style={styles.card}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <View style={styles.cardContent}>
                        <Text style={[styles.tipoEspacio, item.tipo_espacio === 'Taller' ? styles.taller : styles.laboratorio]}>
                            {item.tipo_espacio}
                        </Text>
                        <Text style={styles.nombreEspacio}>{item.nombre_espacio}</Text>
                        <Text style={styles.capacidad}>Capacidad: {item.capacidad_personas} personas</Text>
                        <Text style={styles.instructor}>Especialidad: {item.nombre_especialidad || 'N/A'}</Text>
                        <Text style={styles.instructor}>Empleado: {item.nombre_empleado || 'N/A'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    

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
        height: 180, // Hacemos la tarjeta más alta
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
    instructor: {
        marginTop: 10,
        fontSize: 12,
        color: '#7c7c7c',
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
