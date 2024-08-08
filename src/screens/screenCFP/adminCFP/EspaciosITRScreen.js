import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import BackgroundImage from '../../../components/BackgroundImage';
import * as Constantes from '../../../utils/constantes';
import CardComponent from '../../../components/Cards/EspacioCard';

const { width: screenWidth } = Dimensions.get('window');

const EspaciosScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const ip = Constantes.IP;

    const fetchData = async () => {
        try {
            const response = await fetch(`${ip}/MyLoan-new/api/services/espacios_services.php?action=getAllEspacios`);
            const result = await response.json();
            if (result.status === 1) {
                const mappedData = result.dataset.map(item => ({
                    id: item.id_espacio,
                    nombre: item.nombre_espacio,
                    capacidad: item.capacidad_personas,
                    tipo: item.tipo_espacio,
                    inventario: item.inventario_doc,
                    foto: item.foto_espacio,
                    nombre_especialidad: item.nombre_especialidad,
                    nombre_institucion: item.nombre_institucion,
                    nombre_empleado: item.nombre_empleado,
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

    if (loading) {
        return (
            <BackgroundImage background="AdminCFP">
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
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
                <Text style={styles.title}>Espacios Disponibles</Text>
                <FlatList
                    data={data}
                    numColumns={1}
                    renderItem={({ item }) => <CardComponent item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.flatListContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
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
    flatListContent: {
        paddingBottom: 20,
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
        textAlign: 'center',
    },
});

export default EspaciosScreen;
