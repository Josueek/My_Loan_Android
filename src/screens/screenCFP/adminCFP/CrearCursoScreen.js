import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackgroundImage from '../../../components/BackgroundImage';
import InputShort from '../../../components/Inputs/InputShort';
import InputNumer from '../../../components/Inputs/InputNumer';
import DatePickerInput from '../../../components/Inputs/DatePicker';
import Buttons from '../../../components/Buttons/Buttons';
import RNPickerSelect from 'react-native-picker-select'; // Importa la librería
import fetchDataCursos from '../../../utils/fetchDataCursos';

export default function CrearCursoScreen() {
    const [nombre, setNombre] = useState('');
    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState();
    const [cantidadPersonas, setCantidadPersonas] = useState('');
    const [grupo, setGrupo] = useState('');
    const [programaFormacion, setProgramaFormacion] = useState('');
    const [codigoCurso, setCodigoCurso] = useState('');
    const [empleado, setEmpleado] = useState('');
    const [estado, setEstado] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [programas, setProgramas] = useState([]);
    const [estados, setEstados] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empleadosResponse = await fetchDataCursos('empleado_services', 'getEmpleados');
                if (empleadosResponse.status === 1) {
                    const empleadosFiltrados = empleadosResponse.dataset.filter(emp => emp.cargo === 'Instructor');
                    setEmpleados(empleadosFiltrados);
                } else {
                    console.error('Error al obtener empleados:', empleadosResponse.message);
                }

                const programasResponse = await fetchDataCursos('curso_services', 'getProgramaFormacion');
                if (programasResponse.status === 1) {
                    setProgramas(programasResponse.dataset.map(programa => ({
                        label: programa.Programa_formacion,
                        value: programa.Programa_formacion
                    })));
                } else {
                    console.error('Error al obtener programas:', programasResponse.message);
                }

                const estadosResponse = await fetchDataCursos('curso_services', 'getEstadoCurso');
                if (estadosResponse.status === 1) {
                    setEstados(estadosResponse.dataset.map(estado => ({
                        label: estado.estado,
                        value: estado.estado
                    })));
                } else {
                    console.error('Error al obtener estados:', estadosResponse.message);
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchData();
    }, []);

    const handleAgregarCurso = async () => {
        if (!nombre || !fechaInicio || !fechaFin || !cantidadPersonas || !grupo || !programaFormacion || !codigoCurso || !empleado || !estado) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await fetchDataCursos('curso_services', 'addCurso', JSON.stringify({
                nombre,
                fechaInicio,
                fechaFin,
                cantidadPersonas,
                grupo,
                programaFormacion,
                codigoCurso,
                empleado,
                estado
            }));

            if (response.status === 1) {
                Alert.alert('Éxito', response.message);
                navigation.navigate('AdmincfpTabNavigator');
            } else {
                Alert.alert('Error', response.message);
            }
        } catch (error) {
            console.error("Error al agregar el curso:", error);
            Alert.alert('Error', 'Hubo un problema al agregar el curso.');
        }
    };

    return (
        <BackgroundImage background="AdminCFP">
            <View style={styles.container}>
                <Image source={require('../../../../assets/myloanLogo.png')} style={styles.logo} />
                <View style={styles.card}>
                    <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Nombre del curso:</Text>
                                <InputShort
                                    placeHolder="Ingresa el nombre"
                                    valor={nombre}
                                    setTextChange={setNombre}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Grupo cursante:</Text>
                                <InputNumer
                                    value={grupo}
                                    onChange={setGrupo}
                                    placeholder="Número del grupo"
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Fecha de inicio:</Text>
                                <DatePickerInput
                                    placeHolder="Selecciona la fecha"
                                    valor={fechaInicio}
                                    setTextChange={setFechaInicio}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Fecha de finalización:</Text>
                                <DatePickerInput
                                    placeHolder="Selecciona la fecha"
                                    valor={fechaFin}
                                    setTextChange={setFechaFin}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Programa de formación:</Text>
                                <RNPickerSelect
                                    onValueChange={setProgramaFormacion}
                                    items={programas}
                                    placeholder={{ label: 'Selecciona un programa', value: null }}
                                    style={pickerSelectStyles}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Código del curso:</Text>
                                <InputShort
                                    placeHolder="Código"
                                    valor={codigoCurso}
                                    setTextChange={setCodigoCurso}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Instructor asignado:</Text>
                                <RNPickerSelect
                                    onValueChange={setEmpleado}
                                    items={empleados.map(emp => ({
                                        label: `${emp.nombre_empleado} ${emp.apellido_empleado}`,
                                        value: emp.id_datos_empleado
                                    }))}
                                    placeholder={{ label: 'Selecciona un instructor', value: null }}
                                    style={pickerSelectStyles}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Cantidad de personas:</Text>
                                <InputNumer
                                    value={cantidadPersonas}
                                    onChange={setCantidadPersonas}
                                    placeholder="Número de personas"
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Estado del curso:</Text>
                                <RNPickerSelect
                                    onValueChange={setEstado}
                                    items={estados}
                                    placeholder={{ label: 'Selecciona un estado', value: null }}
                                    style={pickerSelectStyles}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Buttons
                            color={"Amarillo"}
                            textoBoton={'Agregar'}
                            accionBoton={handleAgregarCurso}
                        />
                    </View>
                    <View style={styles.column}>
                        <Buttons
                            textoBoton={'Volver'}
                            color="Gris"
                            accionBoton={() => navigation.navigate('AdmincfpTabNavigator')}
                        />
                    </View>
                </View>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
    logo: {
        width: 125,
        height: 80,
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 20,
        justifyContent: 'space-between',
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
        marginLeft: 0,
    },
    scrollViewContent: {
        paddingBottom: 20,
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
    input: {
        marginTop: 5,
    },
    comboBox: {
        marginTop: 5,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        backgroundColor: '#f8f8f8',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginVertical: 5,
    },
    inputAndroid: {
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginVertical: 5,
    },
});
