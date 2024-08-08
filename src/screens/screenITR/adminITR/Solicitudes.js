// CursoDetalle.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, RefreshControl } from 'react-native';
//Componente para el fondo de pantalla
import BackgroundImage from '../../../components/BackgroundImage';
import * as Constantes from '../../../utils/constantes';
//Component card
import PrestamosCard from '../../../components/Cards/PrestamosCard';

//Pantalla que muestra los todos los prestamos 
const PrestamoScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const ip = Constantes.IP;
    //Hacemos la peticion en la api
    const fetchData = async () => {
        try {
            const response = await fetch(`${ip}/MyLoan-new/api/services/prestamo_services.php?action=getAllCursos`);
            const result = await response.json();
            if (result.status === 1) {
                const mappedData = result.dataset.map(item => ({
                    //Asignamos los valores de respuesta
                    id: item.id_prestamo,
                    tipo: item.programa_formacion,
                    estado: item.estado_prestamo,
                    Material: item.observacion,
                    persona: item.nombre_empleado,
                    cantidad: item.nombre_curso,
                    fecha: item.fecha_solicitud,
                }));
                setData(mappedData);
            } else {
                console.error('Unexpected data format:', result);
            }
            setLoading(false);
            setRefreshing(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            setRefreshing(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const renderItem = ({ item }) => (
        <PrestamosCard item={item} />
    );
    //Mensaje de carga
    if (loading) {
        return (
            <BackgroundImage background="AdminCFP">
                <View style={styles.container}>
                    <Text>Cargando...</Text>
                </View>
            </BackgroundImage>
        );
    }

    return (
        <BackgroundImage background="AdminCFP">
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/myloanLogo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Solicitudes de préstamos recibidas por parte de Insaford</Text>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={data}
                        numColumns={1}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id ? item.id.toString() : ''}
                        contentContainerStyle={styles.flatListContent}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    />
                </View>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
    },
    flatListContainer: {
        padding: 5,
        marginRight: 0,
        height: '70%',
    },
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
    tipoEquipo: {
        color: '#FF0000',
    },
    tipoHerramienta: {
        color: '#0B7F4B',
    },
    tipoMaterial: {
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
    }, logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        marginLeft: 30,
        marginBottom: 30,
        justifyContent: 'space-between',
    }, title: {
        fontSize: 23,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
    }
});

export default PrestamoScreen;
