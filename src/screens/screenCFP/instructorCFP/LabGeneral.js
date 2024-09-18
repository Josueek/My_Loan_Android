import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Input from '../../../components/Inputs/TextInput';
import InputShort from '../../../components/Inputs/InputShort';

const LabGeneral = () => {
    const [labData, setLabData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLabData = async () => {
            try {
                // Obtener el ID del espacio almacenado
                const idEspacio = await AsyncStorage.getItem('selectedEspacioId');
                console.log('ID del espacio obtenido:', idEspacio); // Depuración: Verificar si se obtiene el ID

                if (idEspacio) {
                    // Realizar la petición a la API usando el ID del espacio
                    const response = await axios.get(`http://10.10.2.143/myloan-new/api/services/espacios_services.php?action=getEspacioById&id=${idEspacio}`);
                    console.log('Respuesta de la API:', response.data); // Depuración: Verificar la respuesta de la API

                    if (response.data.status === 1) {
                        setLabData(response.data.dataset);
                    } else {
                        console.error('No se pudo obtener los datos del espacio: Datos inválidos.');
                        Alert.alert('Error', 'No se pudo obtener los datos del espacio.');
                    }
                } else {
                    console.error('No se encontró el ID del espacio.');
                    Alert.alert('Error', 'No se encontró el ID del espacio.');
                }
            } catch (error) {
                console.error('Error al obtener los datos del espacio:', error);
                Alert.alert('Error', 'Error al obtener los datos del espacio.');
            } finally {
                setLoading(false); // Desactivar el estado de carga
            }
        };

        fetchLabData();
    }, []);

    if (loading) {
        return <Text>Cargando...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Nombre del laboratorio:</Text>
                    <Input
                        placeHolder="Nombre del laboratorio"
                        valor={labData.nombre_espacio || ''}
                        contra={false}
                        editable={false}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Encargado:</Text>
                    <InputShort
                        placeHolder="Encargado"
                        valor={labData.nombre_empleado || ''}
                        contra={false}
                        editable={false}
                    />
                </View>
                <View style={styles.column}>
                    <Text>Capacidad de personas:</Text>
                    <InputShort
                        placeHolder="Capacidad"
                        valor={labData.capacidad_personas ? labData.capacidad_personas.toString() : ''}
                        contra={false}
                        editable={false}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Tipo de espacio:</Text>
                    <InputShort
                        placeHolder="Tipo de espacio"
                        valor={labData.tipo_espacio || ''}
                        contra={false}
                        editable={false}
                    />
                </View>
                <View style={styles.column}>
                    <Text>Especialidad:</Text>
                    <InputShort
                        placeHolder="Especialidad"
                        valor={labData.nombre_especialidad || ''}
                        contra={false}
                        editable={false}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 5,
        padding: 40,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    column: {
        flex: 0,
        marginLeft: 5,
        marginRight: 10,
        marginTop: 10,
    },
});

export default LabGeneral;
