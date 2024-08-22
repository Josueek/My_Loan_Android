import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../../components/BackgroundImage';
import Buttons from '../../../components/Buttons/Buttons';
import * as Constantes from '../../../utils/constantes';
import CardComponent from '../../../components/Cards/EspacioCard';
import { RefreshControl } from 'react-native-gesture-handler';

const EspaciosAsignados = ({ navigation }) => {
    //Datos del usuario
    const [userData, setUserData] = useState({
        id_empleado: '',
        nombre: '',
        apellido: '',
        especialidad: ''
    });
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const ip = Constantes.IP;
    const [data, setData] = useState([]);

    //Peticion para recibir los datos del empleado
    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`${ip}/MyLoan-new/api/services/miperfil_services.php?action=getProfile&id=${userId}`);
            const result = await response.json();

            if (result.status === 1) {
                setUserData({
                    id_datos_empleado: result.dataset.id_datos_empleado,
                    nombre: result.dataset.nombre,
                    apellido: result.dataset.apellido,
                    especialidad: result.dataset.especialidad || 'Especialidad no asignada', // Valor predeterminado si es undefined
                });
                console.log('usuario id desde el fetch: ', result.dataset.id_datos_empleado);
                fetchDataEspacios(result.dataset.id_datos_empleado); // Cargar los espacios después de obtener los datos del usuario
            } else {
                console.error('Unexpected data format:', result);
                setError('Error al cargar datos');
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Error al cargar datos');
            setLoading(false);
        }
    };

    //Cargamos los datos del espacio acorde al Id del empleado
    const fetchDataEspacios = async (userId) => {
        try {
            const response = await fetch(`${ip}/MyLoan-new/api/services/espacios_services.php?action=getAllEspaciosByIdUsuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idempleado: userId })
            });

            const result = await response.json();

            // Verifica que el dataset anidado esté presente y sea un array
            if (result.status === 1 && result.dataset && Array.isArray(result.dataset.dataset)) {
                const mappedData = result.dataset.dataset.map(item => ({
                    id: item.id_espacio,
                    nombre: item.nombre_espacio,
                    capacidad: item.capacidad_personas,
                    tipo: item.tipo_espacio,
                    inventario: item.inventario_doc,
                    foto: item.foto_espacio,
                    nombre_especialidad: item.nombre_especialidad,
                    nombre_institucion: item.nombre_institucion,
                    nombre_empleado: item.nombre_empleado,
                }));
                setData(mappedData);
            } else {
                console.error('Formato incorrecto:', result);
                setError('Error al cargar datos');
                setData([]); // Limpia los datos si hay un error
            }
            setLoading(false);
            setRefreshing(false);
        } catch (error) {
            console.error(error);
            setError('Error al cargar datos');
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        const userId = 1; // Suponiendo que este es el ID del usuario autenticado
        fetchUserData(userId); // Cargar los datos del usuario
    }, []);

    // Accion del boton
    const Observacion = (item) => {
        navigation.navigate('DatosEspacios');
    };

    //Cerrar sesión
    const CerrarSession = () => {
        navigation.navigate('Login');
    };

    //Metodo para actualizar los datos
    const onRefresh = () => {
        setRefreshing(true);
        fetchDataEspacios(userData.id_datos_empleado); // Usar el ID del usuario cargado
       
    };

    //Condición para mostrar un icono cargando
    if (loading) {
        return (
            <BackgroundImage background="InstructoritrScreen">
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </BackgroundImage>
        );
    }

    //Texto a mostrar si no existen registros
    const ListEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aún no tienes espacios asignados</Text>
        </View>
    );

    return (
        <BackgroundImage background="InstructoritrScreen">
            <View style={styles.container}>
                <View style={styles.Logos}>
                    <Image source={require('../../../../assets/myloanLogo.png')} style={styles.logo} />
                    <Image source={require('../../../../assets/LogoRicaldone.png')} style={styles.logoRical} />
                </View>
                <View style={styles.Datos}>
                    <Text style={styles.Nombre}>Instructor: {userData.nombre} {userData.apellido}</Text>
                    <Text style={styles.Nombre}>Especialidad: {userData.especialidad}</Text>
                </View>
                <Text style={styles.title}>Listado de espacios asignados</Text>
                <FlatList
                    data={data}
                    numColumns={1}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => Observacion(item)}>
                            <CardComponent item={item} />
                        </TouchableOpacity>
                    }
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.FlatListContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListEmptyComponent={ListEmptyComponent}
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
        justifyContent: 'space-between',
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
        padding: 30,
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
    Cerrar: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
    },
    Nombre: {
        fontSize: 18,
        fontWeight: '700',
    },
    Datos: {
        textAlign: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontWeight: '500',
        fontSize: 15,
        padding: 80,
    }
});

export default EspaciosAsignados;
