import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Componente para el fondo de pantalla
import BackgroundImage from '../../../components/BackgroundImage';
// Datos que se muestran en las tarjetas
import Data from '../../../data/dataCFP/CursosCFP';
//Componente boton
import Button from '../../../components/Buttons/Buttons';
// Pantalla que muestra todos los cursos 
const CursoScreen = () => {
    const navigation = useNavigation();

    //Navegar hacia la pantalla de agregar curso
    const AgregarCurso = () => {
        navigation.navigate('CrearCursosScreen');
    }
    // Estilo de la carta renderizada
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigation.navigate('CrearCursosScreen', { item })}
            >
                <View style={styles.header}>
                    <Text style={[styles.estado, styles[`estado${item.estado}`]]}>{item.estado}</Text>
                    <Text style={styles.codigo}>{item.Codigo}</Text>
                </View>
                <Text style={styles.nombre}>{item.Nombre}</Text>
                <Text style={styles.instructor}>{item.Instructor}</Text>
                <View style={styles.footer}>
                    <Text style={styles.cantidad}>Cantidad: {item.cantidad}</Text>
                    <Text style={styles.fecha}>Inicio: {item.FechaInicio}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <BackgroundImage background="AdminCFP">
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/myloanLogo.png')}
                    style={styles.logo} />
                <Text style={styles.title}>Listado de cursos registrados</Text>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={Data}
                        numColumns={1} // Número de columnas
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.flatListContent}
                    />
                </View>
                <Button
                    textoBoton={'Agregar'}
                    color={"Amarillo"}
                    accionBoton={AgregarCurso}
                />
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
        padding: 10,
        height: '65%',
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
    estado: {
        fontWeight: 'bold',
        fontSize: 16,
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
    estadoActivo: {
        color: '#2ecc71',
    },
    estadoInactivo: {
        color: '#e74c3c',
    },
    logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        marginBottom: 30,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
    }
});

export default CursoScreen;
