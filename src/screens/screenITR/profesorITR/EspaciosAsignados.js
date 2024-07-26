import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Componente para definir el fondo
import BackgroundImage from '../../../components/BackgroundImage';
import Buttons from '../../../components/Buttons/Buttons';
// datos para crear las card
import Data from '../../../data/dataCFP/EspaciosITR';

const EspaciosAsignados = () => {
    // Navegabilidad
    const navigation = useNavigation();
    // Accion del boton
    const Observacion = () => {
        navigation.navigate('DatosEspacios');
    };

    //Cerrar sesion
    const CerrarSession = () => {
        navigation.navigate('Login');
    };

    // Filtrar los datos para que solo incluyan los registros con el ID específico
    const filteredData = Data.filter(item => item.id === '2' || item.id === '4' || item.id === '1' || item.id === '3');

    // Filtrar el instructor específico
    const instructorData = Data.find(item => item.id === '2'); // Cambia '2' por el ID que necesitas

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
        <BackgroundImage background="InstructoritrScreen">
            <View style={styles.container}>
                <View style={styles.Logos}>
                    <Image source={require('../../../../assets/myloanLogo.png')} style={styles.logo} />
                    <Image source={require('../../../../assets/LogoRicaldone.png')} style={styles.logoRical} />
                </View>

                {/* Mostrar el nombre del instructor específico */}
                {instructorData && (
                    <Text style={styles.instructorLog}>
                        Instructor: {instructorData.Instructor}
                    </Text>
                )}

                <Text style={styles.title}>Listado de espacios asignados</Text>
                <FlatList
                    style={styles.lista}
                    data={filteredData} // Pasa los datos filtrados aquí
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
                <View style={styles.Cerrar}>
                    <Buttons
                        color={'Rojo'}
                        textoBoton={"Cerrar sesión"}
                        accionBoton={CerrarSession} // Asegúrate de pasar la función onPress
                    />
                </View>
            </View>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'space-between', // Asegura que los elementos estén distribuidos
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
        marginBottom: 20,
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
    },
    logoRical: {
        width: 100,
        height: 100,
        marginTop: 50,
        marginBottom: 30,
    },
    Logos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    instructorLog: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    lista: {
        marginBottom: 40,
    },
    Cerrar: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
    }
});

export default EspaciosAsignados;
