import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Componente para definir el fondo
import BackgroundImage from '../../../components/BackgroundImage';
// datos para crear las card
import Data from '../../../data/dataCFP/EspaciosITR';

const EspaciosAsignados = () => {
    // Navegabilidad
    const navigation = useNavigation();
    // Accion del boton
    const Observacion = () => {
        navigation.navigate('LabDetalles');
    };

    // Filtrar los datos para que solo incluyan los registros con el ID específico
    const filteredData = Data.filter(item => item.id === '2' || item.id === '4'); // Cambia '1' y '4' por los IDs que necesitas

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={Observacion}>
            <View style={styles.card}>
                <Image source={item.Imagen} style={styles.image} />
                <View style={styles.cardContent}>
                    <Text style={[styles.tipoEspacio, item.tipoEspacio === 'Taller' ? styles.taller : styles.laboratorio]}>
                        {item.tipoEspacio}
                    </Text>
                    <Text style={styles.nombreEspacio}>{item.NombreEspacio}</Text>
                    <View style={styles.row}>
                        <Text style={item.Estado === 'Ocupado' ? styles.estadoOcupado : styles.estadoLibre}>
                            {item.Estado}
                        </Text>
                        {item.Curso ? <Text style={styles.curso}>{item.Curso}</Text> : null}
                    </View>
                    <Text style={styles.instructor}>{item.Instructor}</Text>
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
                    data={filteredData} // Pasa los datos filtrados aquí
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
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

export default EspaciosAsignados;