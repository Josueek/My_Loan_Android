import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, RefreshControl, Alert, TurboModuleRegistry } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundImage from '../../../components/BackgroundImage';
import * as Constantes from '../../../utils/constantes';
import { useNavigation } from '@react-navigation/native';
import Buttons from '../../../components/Buttons/Buttons';
import InputShort from '../../../components/Inputs/InputShort';
import InputMultiline from '../../../components/Inputs/InputMultiline';

const DetallePrestamo = () => {
    const ip = Constantes.IP;
    const navigation = useNavigation();
    const [cantidad, setCantidad] = useState('');
    const [unidad, setUnidad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idPrestamo, setIdPrestamo] = useState('');
    const [nombreEspacio, setNombreEspacio] = useState('');
    const [nombreEquipo, setNombreEquipo] = useState('');
    const [nombreMaterial, setNombreMaterial] = useState('');
    const [nombreHerramienta, setNombreHerramienta] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const volver = () => {
        navigation.navigate('AdmincfpTabNavigator');
    };

    // Fetch para hacer la petición
    const fetchData = async () => {
        try {
            const id = await AsyncStorage.getItem('selectedId'); // Obtener el ID desde AsyncStorage
            if (!id) {
                Alert.alert('Error', 'No se encontró el préstamo.');
                return;
            }

            const response = await fetch(`${ip}/MyLoan-new/api/services/solicitud_services.php?action=getDetallePrestamo&id=${id}`);
            const result = await response.json();

            if (result.status === 1) {
                // Actualizar el estado con los datos  
                const item = result.dataset[0];

                console.log("Item del dataset:", item);
                  setCantidad(item.cantidad ? item.cantidad.toString() : 'N/A');
                setUnidad(item.unidad || 'N/A');
                setDescripcion(item.descripcion || 'N/A');
                setIdPrestamo(item.id_prestamo ? item.id_prestamo.toString() : 'N/A');
                setNombreEspacio(item.nombre_espacio || 'N/A');
                setNombreEquipo(item.nombre_equipo || 'N/A');
                setNombreMaterial(item.nombre_material || 'N/A');
                setNombreHerramienta(item.nombre_herramienta || 'N/A');
            } else {
                Alert.alert('Error', 'Formato de respuesta incorrecto.');
            }
        } catch (error) {
            console.error('Error al obtener los datos del préstamo:', error);
        } finally {
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

    return (
        <BackgroundImage background="AdminCFP">
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.container}>
                    <Image
                        source={require('../../../../assets/myloanLogo.png')}
                        style={styles.logo}
                    />
                    <View style={styles.card}>
                        <Text style={styles.Texts}>Detalles del préstamo</Text>
                        <View style={styles.row}>
                            <View style={styles.column}>

                                <Text>Núm de préstamo:</Text>
                                <InputShort
                                    contra={false}
                                    editable={false}
                                    Valor={idPrestamo}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Unidad:</Text>
                                <InputShort
                                    contra={false}
                                    editable={false}
                                    Valor={unidad}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Descripción del préstamo:</Text>
                                <InputMultiline
                                    placeHolder="Detalle"
                                    multiline={true}
                                    editable={false}
                                    Valor={descripcion}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Cantidad:</Text>
                                <InputShort
                                    contra={false}
                                    editable={false}
                                    Valor={cantidad}                                  
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Equipo:</Text>
                                <InputShort
                                    contra={false}
                                    editable={false}
                                    Valor={nombreEquipo}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Material:</Text>
                                <InputShort
                                    contra={false}
                                    editable={false}
                                    Valor={nombreMaterial}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Herramienta:</Text>
                                <InputShort
                                    contra={false}
                                    editable={false}
                                    Valor={nombreHerramienta}
                                />
                            </View>
                        </View>
                    </View>
                    <Buttons
                        accionBoton={volver}
                        textoBoton={"Regresar"}
                        color={"Amarillo"}
                    />
                </View>
            </ScrollView>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        marginBottom: 30,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: 375,
        marginBottom: 30,
    },
    Texts: {
        fontWeight: '800',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 15,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        marginRight: 20
    },
    column: {
        flex: 0,
        marginTop: 10,
        paddingLeft: 0,
        marginRight: 5,
    },
});

export default DetallePrestamo;
