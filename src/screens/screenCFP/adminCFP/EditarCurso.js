import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../../components/BackgroundImage';
import InputShort from '../../../components/Inputs/InputShort';
import Buttons from '../../../components/Buttons/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constantes from '../../../utils/constantes';
// Componente para editar cursos
export default function EditarCurso() {
    const ip = Constantes.IP;
    const [curso, setCurso] = useState('');
    const [Grupo, setGrupo] = useState('');
    const [inicio, setInicio] = useState('');
    const [fin, setFin] = useState('');
    const [programa, setPrograma] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [estado, setEstado] = useState('');
    const [instructor, setInstructor] = useState('');
    const [apellidoInstructor, setApellidoInstructor] = useState('');
    const [telefonoInstructor, setTelefonoInstructor] = useState('');
    const [estadoInstructor, setEstadoInstructor] = useState('');
    const [especialidadInstructor, setEspecialidadInstructor] = useState('');

    const fetchData = async () => {
        try {
            const id = await AsyncStorage.getItem('id_curso');
            if (!id) {
                Alert.alert('Error', "No se encontró el curso.");
                return;
            }

            const response = await fetch(`${ip}/MyLoan-new/api/services/curso_services.php?action=getCursoCompleto&id=${id}`);
            const result = await response.json();

            if (result.status === 1) {
                const data = result.dataset;
                setCurso(data.nombre_curso);
                setGrupo(data.grupo);
                setInicio(data.fecha_inicio);
                setFin(data.fecha_fin);
                setPrograma(data.programa_formacion);
                setCantidad(data.cantidad_personas);
                setEstado(data.estado);
                setInstructor(data.nombre_empleado);
                setApellidoInstructor(data.apellido_empleado);
                setTelefonoInstructor(data.telefono);
                setEstadoInstructor(data.estado_empleado);
                setEspecialidadInstructor(data.nombre_especialidad);
                console.log(data);
            } else {
                Alert.alert('Error', result.message || 'Error al obtener los datos del curso');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const navigation = useNavigation();
    const Volver = () => {
        navigation.navigate('AdmincfpTabNavigator');
    };

    return (
        <BackgroundImage background="AdminCFP">
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/myloanLogo.png')}
                    style={styles.logo}
                />
                <View style={styles.card}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Nombre del curso:</Text>
                                <InputShort
                                    placeHolder="Nombre"
                                    Valor={curso}
                                    editable={false}
                                    setTextChange={setCurso}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Grupo cursante:</Text>
                                <InputShort
                                    placeHolder="Grupo"
                                    Valor={Grupo}
                                    editable={false}
                                    setTextChange={setGrupo}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Fecha de inicio:</Text>
                                <InputShort
                                    placeHolder="DD/MM/AAAA"
                                    Valor={inicio}
                                    editable={false}
                                    setTextChange={setInicio}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Fecha de finalización:</Text>
                                <InputShort
                                    placeHolder="DD/MM/AAAA"
                                    Valor={fin}
                                    editable={false}
                                    setTextChange={setFin}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Programa de formación:</Text>
                                <InputShort
                                    placeHolder="Programa"
                                    Valor={programa}
                                    editable={false}
                                    setTextChange={setPrograma}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Cantidad de personas:</Text>
                                <InputShort
                                    placeHolder="Cantidad"
                                    Valor={cantidad}
                                    editable={false}
                                    setTextChange={setCantidad}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Instructor:</Text>
                                <InputShort
                                    placeHolder="Nombre"
                                    Valor={instructor}
                                    editable={false}
                                    setTextChange={setInstructor}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Apellido:</Text>
                                <InputShort
                                    placeHolder="Apellido"
                                    Valor={apellidoInstructor}
                                    editable={false}
                                    setTextChange={setApellidoInstructor}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Teléfono:</Text>
                                <InputShort
                                    placeHolder="Teléfono"
                                    Valor={telefonoInstructor}
                                    editable={false}
                                    setTextChange={setTelefonoInstructor}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Estado:</Text>
                                <InputShort
                                    placeHolder="Estado"
                                    Valor={estadoInstructor}
                                    editable={false}
                                    setTextChange={setEstadoInstructor}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Especialidad:</Text>
                                <InputShort
                                    placeHolder="Especialidad"
                                    Valor={especialidadInstructor}
                                    editable={false}
                                    setTextChange={setEspecialidadInstructor}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <Buttons
                    textoBoton={'Volver'}
                    color="Gris"
                    accionBoton={Volver}
                />
            </View>
        </BackgroundImage>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 125,
        height: 80,
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 20,
    },
    card: {
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        padding: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4.10,
        borderRadius: 10,
        elevation: 5,
        width: '100%',
        height: '65%',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    column: {
        flex: 0,
        paddingLeft: 0,
        marginLeft: 5,
        marginRight: 10,
        marginTop: 10,
    },
});
