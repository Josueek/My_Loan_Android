// CursoDetalle.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
//Componente para el fondo de pantalla
import BackgroundImage from '../../../components/BackgroundImage';
//Datos que se muestran en las tarjetas
import Data from '../../../data/dataCFP/PrestamosCFP';
//Pantalla que muestra los todos los prestamos 
const PrestamoScreen = () => {
    //Estilo de la carte renderizado
    const renderItem = ({ item }) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.header}>
                    <Text style={[styles.tipo, styles[`tipo${item.tipo}`]]}>{item.tipo}</Text>
                    <Text style={[styles.estado, styles[`estado${item.estado}`]]}>{item.estado}</Text>
                </View>
                <Text style={styles.material}>{item.Material}</Text>
                <Text style={styles.persona}>{item.persona}</Text>
                <View style={styles.footer}>
                    <Text style={styles.cantidad}>Cantidad: {item.cantidad}</Text>
                    <Text style={styles.fecha}>{item.fecha}</Text>
                </View>
            </View>
        );
    };
   

    return (
        <BackgroundImage background="AdminCFP">
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/myloanLogo.png')}
                    style={styles.logo} />

                <Text style={styles.title}
                //*Recreacion de la tarjeta*/
                >Solicitudes recibidas por parte de Insaford</Text>
                
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={Data}
                        numColumns={1} // Número de columnas
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.flatListContent}
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
