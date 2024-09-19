import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../../components/BackgroundImage';
import Buttons from '../../../components/Buttons/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constantes from '../../../utils/constantes';
import CursoCard from '../../../components/Cards/CursoCard';

const CursoScreen = () => {
    const [cursos, setCursos] = useState([]); // Estado para almacenar los cursos
    const [refreshing, setRefreshing] = useState(false); // Estado para control del pull-to-refresh
    const [loading, setLoading] = useState(true); // Estado para controlar el loading
    const navigation = useNavigation();
    const ip = Constantes.IP;

    // Función para hacer la petición a la API
    const fetchCursos = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        if (!userId) {
            Alert.alert('Error', 'No se pudo obtener el ID del usuario');
            return;
        }
        try {
            const response = await fetch(`${ip}/MyLoan-new/api/services/curso_services.php?action=getCursoByIdEmpleado&id=${userId}`);
            const data = await response.json();

            if (data.status) {
                setCursos([data.dataset]); // Asignar el dataset al estado 'cursos'
            } else {
                setCursos([]); // Si no hay cursos, limpiar el estado
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener los cursos');
        } finally {
            setLoading(false); // Finaliza el loading
            setRefreshing(false); // Finaliza el refresco si estaba activo
        }
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    // Función para refrescar los datos manualmente
    const onRefresh = () => {
        setRefreshing(true); // Activa el estado de refresco
        fetchCursos(); // Llamar a la función fetchCursos
    };

    // Función para guardar el id del curso en AsyncStorage
    const guardarCursoId = async (id_curso) => {
        try {
            await AsyncStorage.setItem('curso_id', id_curso.toString());
            navigation.navigate('DatosCurso');
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar el ID del curso');
        }
    };
    const accion = (item) => {
        Alert.alert('Acceso denegado', 'No puedes realizar esta acción')
    }
    const handleLogout = async () => {
        try {
            const response = await fetch(`${ip}/MyLoan-new/api/services/miperfil_services.php?action=logOut`, {
                method: 'GET'
            });
            const data = await response.json();

            if (data.status) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
                Alert.alert('Sesión cerrada');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    // Función para renderizar los cursos usando el componente CursoCard
    const renderItem = ({ item }) => (
        <CursoCard
            item={item}
            onEdit={() => guardarCursoId(item.id_curso)} // Llama a la función guardarCursoId cuando se presione la card
            onDelete={() => accion(item)}
        />
    );

    if (loading) {
        return (
            <BackgroundImage background="AdminCFP">
                <View style={styles.container}>
                    <Text>Cargando...</Text>
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
        <BackgroundImage background="AdminCFP">
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/myloanLogo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Listado de cursos asignados</Text>

                <View style={styles.flatListContainer}>
                    <FlatList
                        data={cursos} // Usar los datos obtenidos
                        numColumns={1}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id_curso.toString()} // Usar id_curso para keyExtractor
                        contentContainerStyle={styles.flatListContent}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing} // Control del estado de refresco
                                onRefresh={onRefresh} // Acción para refrescar los cursos manualmente
                            />
                        }
                        ListEmptyComponent={ListEmptyComponent}
                    />
                </View>
                <Buttons
                    textoBoton={'Cerrar sesión'}
                    accionBoton={handleLogout}
                    style={styles.Iniciar}
                    color="Rojo"
                />
            </View>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
    },
    flatListContainer: {
        padding: 10,
        height: '65%',
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
        textAlign: 'center',
    },
    emptyText: {
        fontWeight: '600',
        fontSize: 15,
        padding: 80,
    },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 20,
    },
});

export default CursoScreen;
