import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Componente para el fondo de pantalla
import BackgroundImage from '../../../components/BackgroundImage';
import Buttons from '../../../components/Buttons/Buttons';
// Importar AsyncStorage para guardar el id del usuario
import AsyncStorage from '@react-native-async-storage/async-storage';

const CursoScreen = () => {
    const [cursos, setCursos] = useState([]); // Estado para almacenar los cursos
    const [loading, setLoading] = useState(true); // Estado para el loading
    const navigation = useNavigation();

    // Función para hacer la petición a la API
    const fetchCursos = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        if (!userId) {
            Alert.alert('Error', 'No se pudo obtener el ID del usuario');
            return;
        }

        try {
            // Actualizar la URL de la API
            const response = await fetch('http://192.168.0.12/myloan-new/api/services/curso_services.php?action=getAllCursos&buscar=', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            if (data.status === 1) {
                setCursos(data.dataset); // Asignar los cursos obtenidos a estado
            } else {
                Alert.alert('Error', data.message || 'No se pudieron cargar los cursos');
            }
        } catch (error) {
            console.error('Error fetching cursos:', error);
            Alert.alert('Error', 'Error al cargar los cursos');
        } finally {
            setLoading(false);
        }
    };

    // Ejecutar la función fetchCursos al montar el componente
    useEffect(() => {
        fetchCursos();
    }, []);

    // Función para manejar el cierre de sesión
    const CerrarSesion = () => {
        navigation.navigate('Login');
    };

    // Funciona para ver el estilo de la carta renderizada
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.cardContainer}
onPress={() => {
    navigation.navigate('CursoDetalles', { id_curso: item.id });
}}
                
            >
                <View style={styles.header}>
                    <Text style={[styles.estado, styles[`estado${item.estado.replace(' ', '').toUpperCase()}`]]}>{item.estado}</Text>
                    <Text style={styles.codigo}>{item.codigo_curso}</Text>
                </View>
                <Text style={styles.nombre}>{item.nombre_curso}</Text>
                <Text style={styles.instructor}>{item.nombre_empleado}</Text>
                <View style={styles.footer}>
                    <Text style={styles.cantidad}>Cantidad: {item.cantidad_personas}</Text>
                    <Text style={styles.fecha}>Inicio: {item.fecha_inicio}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <BackgroundImage background="AdminCFP">
                <View style={styles.container}>
                    <Text>Cargando...</Text>
                </View>
            </BackgroundImage>
        );
    }

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
                        numColumns={1} // Número de columnas
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id_curso.toString()} // Usar id_curso para keyExtractor
                        contentContainerStyle={styles.flatListContent}
                    />
                </View>
                <View style={styles.Cerrar}>
                    <Buttons
                        textoBoton={'Cerrar sesión'} // Botón para cerrar sesión
                        accionBoton={CerrarSesion}
                        style={styles.Iniciar}
                        color="Rojo"
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
    },
    flatListContainer: {
        padding: 10,
        height: '65%',
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: 375,
        height: 170,
        marginBottom: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    estado: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    codigo: {
        fontSize: 14,
        color: '#666',
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
        marginVertical: 20,
    },
    instructor: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cantidad: {
        fontSize: 14,
        color: '#666',
    },
    fecha: {
        fontSize: 14,
        color: '#666',
    },
    estadoENCURSO: {
        color: '#2ecc71',
    },
    estadoPENDIENTE: {
        color: '#f39c12',
    },
    estadoFINALIZADO: {
        color: '#e74c3c',
    },
    logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        marginBottom: 30,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
    },
    Cerrar: {
        alignContent: 'center',
    }
});

export default CursoScreen;
