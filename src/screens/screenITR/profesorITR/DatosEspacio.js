import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Componente para establecer un fondo diferente en cada pantalla
import BackgroundImage from '../../../components/BackgroundImage';
//Importamos los componentes
import InputShort from '../../../components/Inputs/InputShort';
import TextInput from '../../../components/Inputs/TextInput';
import ButtonDown from '../../../components/Buttons/ButtonDonw';
import Buttons from '../../../components/Buttons/Buttons';
//Libreria de almacenamiento
import AsyncStorage from '@react-native-async-storage/async-storage';
//Ip
import * as Constantes from '../../../utils/constantes';

const DatosEspacio = () => {
    // Navegabilidad 
    const navigation = useNavigation();
    const ip = Constantes.IP;

    //Datos de los espacios
    const [Espacio, setEspacio] = useState('');
    const [nombre, setNombre] = useState('');
    const [encargado, setEncargado] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [tipoEspacio, setTipoEspacio] = useState('');
    const [grupo, setGrupo] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [foto, setFoto] = useState(''); // direccion de la imagen

    //UseEffect para cargar el id del espacio y cargar los datos
    useEffect(() => {
        const CargarEspacio = async () => {
            try {
                const idEspacio = await AsyncStorage.getItem('idEspacioSelect');
                if (idEspacio) {
                    fetchDataEspaciosID(idEspacio);
                }
            } catch (error) {
                console.error('Error al cargar el ID del espacio: ', error);
            }
        };
        CargarEspacio();
    }, []);


    //Fetch para cargar los datos del espacio acorde al id
    const fetchDataEspaciosID = async (idespacio) => {
        try {
            //consulta
            const response = await fetch(`${ip}/MyLoan-new/api/services/espacios_services.php?action=getEspacioById`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idEspacio: idespacio })
            });
            //Se imprimen los valores de respuesta
            const result = await response.json();

            // Verifica que el dataset anidado este presente y sea un array
            if (result.status === 1 && result.dataset) {
                const espacioData = result.dataset;
                //se asignan los valores a los campos
                setNombre(espacioData.nombre_espacio);
                setEncargado(espacioData.nombre_empleado);
                setCapacidad(espacioData.capacidad_personas);
                setTipoEspacio(espacioData.tipo_espacio);
                setGrupo(espacioData.nombre_especialidad);
                setEspecialidad(espacioData.nombre_especialidad);
                setFoto(espacioData.foto_espacio);
            }
            console.log('Valores devueltos: ', result)
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
            console.Alert('Error', 'No se obtuvieron los datos.');
        }
    };




    // Accion del boton
    const VerObservacion = () => {
        navigation.navigate('ObservHechas');
    };
    //Volver a la pantalla anterior
    const Volver = () => {
        navigation.navigate('EspaciosAsignados')
    }
    return (
        <BackgroundImage background="InstructoritrScreen">
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.Logos}>
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
                        <Image source={{ uri: foto }} style={styles.espacioImage} />
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Nombre del laboratorio:</Text>
                                <TextInput
                                    placeHolder="Ingresa el nombre"
                                    valor={nombre}
                                    contra={false}
                                    editable={false}
                                    setTextChange={setNombre}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Encargado:</Text>
                                <InputShort
                                    placeHolder="Instructor encargado"
                                    valor={encargado}
                                    contra={false}
                                    editable={false}
                                    setTextChange={setEncargado}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Capacidad de personas:</Text>
                                <InputShort
                                    placeHolder="Cantidad"
                                    valor={capacidad}
                                    contra={false}
                                    editable={false}
                                    setTextChange={setCapacidad}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Tipo de espacio:</Text>
                                <InputShort
                                    placeHolder="Espacio"
                                    valor={tipoEspacio}
                                    contra={false}
                                    editable={false}
                                    setTextChange={setTipoEspacio}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Grupo cursante:</Text>
                                <InputShort
                                    placeHolder="2"
                                    valor={grupo}
                                    contra={false}
                                    editable={false}
                                    setTextChange={setGrupo}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Especialidad:</Text>
                                <InputShort
                                    placeHolder="Nombre"
                                    valor={especialidad}
                                    contra={false}
                                    editable={false}
                                    setTextChange={setEspecialidad}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Buttons color={'Amarillo'} textoBoton={"Observaciones"} accionBoton={VerObservacion} />
                        </View>
                        <View style={styles.column}>
                            <Buttons color={'Gris'} textoBoton={"Volver"} accionBoton={Volver} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </BackgroundImage>
    );
}


//Funciona para ver el estilo que se va a ver en la pantalla
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
    Logos: {
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
    }, card: {
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4.1,
        borderRadius: 10,
        elevation: 5,
        width: '100%',
        height: '70%',
        marginBottom: 10,
        paddingTop: 30,
    }, espacioImage: {
        width: '100%',
        height: 200,
        marginBottom: 20
    }, row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    column: {
        flex: 0,
        marginLeft: 5,
        marginRight: 10,
        marginTop: 10
    }
});

export default DatosEspacio;