import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../../components/BackgroundImage';
import ButtonDown from '../../../components/Buttons/ButtonDonw';
import Buttons from '../../../components/Buttons/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constantes from '../../../utils/constantes';
import TextInput from '../../../components/Inputs/TextInput';
import InputShort from '../../../components/Inputs/InputShort';
import * as WebBrowser from 'expo-web-browser';

const DatosLab = () => {
    const navigation = useNavigation();
    const ip = Constantes.IP;

    const [nombre, setNombre] = useState('');
    const [encargado, setEncargado] = useState('');
    const [apellidoEncargado, setApellidoEncargado] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [tipoEspacio, setTipoEspacio] = useState('');
    const [grupo, setGrupo] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [foto, setFoto] = useState('');
    const [telefonoEmpleado, setTelefonoEmpleado] = useState('');
    const [estadoEmpleado, setEstadoEmpleado] = useState('');
    const [fotoEmpleado, setFotoEmpleado] = useState('');
    const [inventario_doc, setinventario_doc] = useState('');

    useEffect(() => {
        const cargarEspacio = async () => {
            try {
                const idEspacio = await AsyncStorage.getItem('Id_espacio');
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
            const response = await fetch(`${ip}/MyLoan-new/api/services/espacios_services.php?action=getEspacioByIdCodmpleto`, {
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
                setNombre(espacioData.nombre_espacio || 'Nombre no disponible');
                setEncargado(espacioData.nombre_empleado || 'Encargado no disponible');
                setApellidoEncargado(espacioData.apellido_empleado || 'Apellido no disponible');
                setCapacidad(espacioData.capacidad_personas || 'Capacidad no disponible');
                setTipoEspacio(espacioData.tipo_espacio || 'Tipo no disponible');
                setGrupo(espacioData.nombre_curso || 'Grupo no disponible');
                setEspecialidad(espacioData.nombre_especialidad || 'Especialidad no disponible');
                setFoto(espacioData.foto_espacio || '');
                setTelefonoEmpleado(espacioData.telefono || 'Teléfono no disponible');
                setEstadoEmpleado(espacioData.estado_empleado || 'Estado no disponible');
                setFotoEmpleado(espacioData.foto_empleado || '');
                setinventario_doc(espacioData.inventario_doc || '');
                console.log('Nombre de la imagen:', foto);

            } else {
                Alert.alert('Error', result.message || 'No se encontraron datos del espacio.');
            }
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
            Alert.alert('Error', 'No se pudieron obtener los datos.');
        }
    };
    const openPdf = (url) => {
        WebBrowser.openBrowserAsync(url);
    };

    const volver = () => {
        navigation.navigate('InstructorTabNavigator');
    };

    return (
        <BackgroundImage background="AdminCFP">
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
                            accionBoton={() => openPdf(`${ip}/MyLoan-new/api/inventario/${inventario_doc}`)} />

                        <Image source={{ uri: `${ip}/MyLoan-new/api/images/espacios/${foto}` }} style={styles.foto} />

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Nombre del laboratorio:</Text>
                                <TextInput
                                    Valor={nombre}
                                    placeholder="Nombre asignado"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Encargado:</Text>
                                <InputShort
                                    Valor={encargado}
                                    placeholder="Instructor encargado"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Apellido del encargado:</Text>
                                <InputShort
                                    Valor={apellidoEncargado}
                                    placeholder="Apellido"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Capacidad de personas:  </Text>
                                <InputShort
                                    Valor={capacidad.toString()}
                                    placeholder="Cantidad"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Tipo de espacio:</Text>
                                <InputShort
                                    Valor={tipoEspacio}
                                    placeholder="Espacio"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Especialidad:</Text>
                                <InputShort
                                    Valor={especialidad}
                                    placeholder="Nombre"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Teléfono del encargado:</Text>
                                <InputShort
                                    Valor={telefonoEmpleado}
                                    placeholder="Teléfono"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Estado del encargado:</Text>
                                <InputShort
                                    Valor={estadoEmpleado}
                                    placeholder="Estado"
                                    editable={false}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Buttons color={'Gris'} textoBoton={"Volver"} accionBoton={volver} />
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
        marginBottom
            : 10,
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
    }, foto: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginRight: 10,
        resizeMode: 'cover',
        alignItems: 'center',
    },
});

export default DatosLab;
