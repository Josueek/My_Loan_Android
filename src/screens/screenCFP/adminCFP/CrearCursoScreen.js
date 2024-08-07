import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../../components/BackgroundImage';
import InputShort from '../../../components/Inputs/InputShort';
import ComboBox from '../../../components/Inputs/ComboBox';
import InputNumer from '../../../components/Inputs/InputNumer';
import DatePickerInput from '../../../components/Inputs/DatePicker';
import Buttons from '../../../components/Buttons/Buttons';
import fetchDataCursos from '../../../utils/fetchDataCursos'; // Asegúrate de que esta función sea importada

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
    const [empleados, setEmpleados] = useState([]); // Para almacenar los empleados cargados
    const [programas, setProgramas] = useState([]); // Para almacenar los programas
    const [estados, setEstados] = useState([]); // Para almacenar los estados

    const navigation = useNavigation();

    // Función para cargar los empleados
    const cargarEmpleados = async () => {
        try {
            const response = await fetchDataCursos('empleado_services', 'getEmpleados');
            if (response.status === 1) {
                // Filtrar los empleados según el cargo
                const empleadosFiltrados = response.dataset.filter(emp => emp.cargo === 'Instructor');
                setEmpleados(empleadosFiltrados);
            } else {
                console.error('Error al obtener empleados:', response.message);
            }
        } catch (error) {
            console.error('Error al cargar empleados:', error);
        }
    };

    // Función para cargar los programas de formación
    const CargarPrograma = async () => {
        try {
            const response = await fetchDataCursos('curso_services', 'getProgramaFormacion');
            if (response.status === 1) {
                setProgramas(response.dataset.map(programa => ({
                    label: programa.Programa_formacion,
                    value: programa.Programa_formacion
                })));
            } else {
                console.error('Error al obtener programas:', response.message);
            }
        } catch (error) {
            console.error('Error al cargar programas:', error);
        }
    };

    // Función para cargar los estados del curso
    const CargarEstado = async () => {
        try {
            const response = await fetchDataCursos('curso_services', 'getEstadoCurso');
            if (response.status === 1) {
                setEstados(response.dataset.map(estado => ({
                    label: estado.estado,
                    value: estado.estado
                })));
            } else {
                console.error('Error al obtener estados:', response.message);
            }
        } catch (error) {
            console.error('Error al cargar estados:', error);
        }
    };

    useEffect(() => {
        cargarEmpleados();
        CargarPrograma();
        CargarEstado();
    }, []);

    const Volver = () => {
        navigation.navigate('AdmincfpTabNavigator');
    };

    const AgregarCurso = async () => {
        // Validación de campos vacíos
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
                                    placeHolder="Ingresa el nombre"
                                    valor={nombre}
                                    contra={false}
                                    editable={true}
                                    setTextChange={setNombre}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Grupo cursante:</Text>
                                <InputNumer
                                    value={grupo}
                                    onChange={(value) => setGrupo(value)}
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
                                    editable={true}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Fecha de finalización:</Text>
                                <DatePickerInput
                                    placeHolder="Selecciona la fecha"
                                    valor={fechaFin}
                                    setTextChange={setFechaFin}
                                    editable={true}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Programa de formación:</Text>
                                <ComboBox
                                    selectedValue={programaFormacion}
                                    onValueChange={(value) => setProgramaFormacion(value)}
                                    items={programas} // Aquí asignas los valores a ComboBox
                                    placeholder="Programa"
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Código del curso:</Text>
                                <InputShort
                                    placeHolder="Código"
                                    valor={codigoCurso}
                                    contra={false}
                                    editable={true}
                                    setTextChange={setCodigoCurso}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Instructor asignado:</Text>
                                <ComboBox
                                    selectedValue={empleado}
                                    onValueChange={(value) => setEmpleado(value)}
                                    items={empleados.map(emp => ({
                                        label: `${emp.nombre_empleado} ${emp.apellido_empleado}`,
                                        value: emp.id_datos_empleado
                                    }))}
                                    placeholder="Asignación de instructor"
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Cantidad de personas:</Text>
                                <InputNumer
                                    value={cantidadPersonas}
                                    onChange={(value) => setCantidadPersonas(value)}
                                    placeholder="Número de personas"
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Estado del curso:</Text>
                                <ComboBox
                                    selectedValue={estado}
                                    onValueChange={(value) => setEstado(value)}
                                    items={estados} // Aquí asignas los valores a ComboBox
                                    placeholder="Estado"
                                />
                            </View>

                        </View>
                    </ScrollView>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Buttons
                            color={"Amarillo"}
                            textoBoton={'Agregar'}
                            accionBoton={AgregarCurso}
                        />
                    </View>
                    <View style={styles.column}>
                        <Buttons
                            textoBoton={'Volver'}
                            color="Gris"
                            accionBoton={Volver}
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
    }
});
