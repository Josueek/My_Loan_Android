import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, ScrollView, TextInput as RNTextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../../components/BackgroundImage';
import ButtonDown from '../../../components/Buttons/ButtonDonw';
import Buttons from '../../../components/Buttons/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constantes from '../../../utils/constantes';

const DatosEspacio = () => {
    const navigation = useNavigation();
    const ip = Constantes.IP;

    const [nombre, setNombre] = useState('');
    const [encargado, setEncargado] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [tipoEspacio, setTipoEspacio] = useState('');
    const [grupo, setGrupo] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [foto, setFoto] = useState('');

    useEffect(() => {
        const cargarEspacio = async () => {
            try {
                const idEspacio = await AsyncStorage.getItem('idEspacioSelect');
                console.log('ID del espacio:', idEspacio);
                if (idEspacio) {
                    fetchDataEspaciosID(idEspacio);
                } else {
                    Alert.alert('Error', 'ID del espacio no encontrado.');
                }
            } catch (error) {
                console.error('Error al cargar el ID del espacio: ', error);
                Alert.alert('Error', 'Error al cargar el ID del espacio.');
            }
        };        
        cargarEspacio();
    }, []);

    const fetchDataEspaciosID = async (idEspacio) => {
        try {
            const response = await fetch(`${ip}/MyLoan-new/api/services/espacios_services.php?action=getEspacioById`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idEspacio }),
            });
            const result = await response.json();

            console.log('Resultado de fetchDataEspaciosID:', result);

            if (result.status === 1 && result.dataset) {
                const espacioData = result.dataset;
                console.log(espacioData, 'valor de datas')
                setNombre(espacioData.nombre_espacio || 'Nombre no disponible');
                setEncargado(espacioData.nombre_empleado || 'Encargado no disponible');
                setCapacidad(espacioData.capacidad_personas || 'Capacidad no disponible');
                setTipoEspacio(espacioData.tipo_espacio || 'Tipo no disponible');
                setGrupo(espacioData.nombre_curso || 'Grupo no disponible');
                setEspecialidad(espacioData.nombre_especialidad || 'Especialidad no disponible');
                setFoto(espacioData.foto_espacio || '');
            } else {
                Alert.alert('Error', result.message || 'No se encontraron datos del espacio.');
            }
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
            Alert.alert('Error', 'No se pudieron obtener los datos.');
        }
    };

    const verObservacion = () => {
        navigation.navigate('ObservHechas');
    };

    const volver = () => {
        navigation.navigate('EspaciosAsignados');
    };

    return (
        <BackgroundImage background="InstructoritrScreen">
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.logos}>
                        <Image source={require('../../../../assets/myloanLogo.png')} style={styles.logo} />
                        <Image source={require('../../../../assets/LogoRicaldone.png')} style={styles.logoRical} />
                    </View>
                    <Text style={styles.title}>Información sobre el espacio asignado</Text>
                    <View style={styles.card}>
                        <ButtonDown
                            textoBoton={'Descargar inventario'}
                            color={'DownLoad'}
                            iconName="download-outline"
                        />
                        <Image source={foto ? { uri: foto } : require('../../../../assets/default.png')} style={styles.espacioImage} resizeMode="contain" />
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Nombre del laboratorio:</Text>
                                <RNTextInput
                                    value={nombre}
                                    placeholder="Ingresa el nombre"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Encargado:</Text>
                                <RNTextInput
                                    value={encargado}
                                    placeholder="Instructor encargado"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Capacidad de personas:  </Text>
                                <RNTextInput
                                    value={capacidad.toString()}
                                    placeholder="Cantidad"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Tipo de espacio:</Text>
                                <RNTextInput
                                    value={tipoEspacio}
                                    placeholder="Espacio"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Grupo cursante:</Text>
                                <RNTextInput
                                    value={grupo}
                                    placeholder="2"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Especialidad:</Text>
                                <RNTextInput
                                    value={especialidad}
                                    placeholder="Nombre"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Buttons color={'Amarillo'} textoBoton={"Observaciones"} accionBoton={verObservacion} />
                        </View>
                        <View style={styles.column}>
                            <Buttons color={'Gris'} textoBoton={"Volver"} accionBoton={volver} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    logoRical: {
        width: 100,
        height: 100,
        marginTop: 60,
        marginBottom: 30,
    },
    logos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4.1,
        borderRadius: 10,
        elevation: 5,
        width: '100%',
        marginBottom: 10,
        paddingTop: 30,
    },
    espacioImage: {
        width: '100%',
        height: 200,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
    }
});

export default DatosEspacio;
