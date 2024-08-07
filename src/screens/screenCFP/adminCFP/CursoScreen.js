import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundImage from '../../../components/BackgroundImage';
import Button from '../../../components/Buttons/Buttons';
import CursoCard from '../../../components/Cards/CursoCard'; // Importa el nuevo componente
import fetchData, { deleteCurso } from '../../../utils/fetchDataCursos';

const CursoScreen = () => {
    const [cursos, setCursos] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Estado para manejar la actualización
    const navigation = useNavigation();

    useEffect(() => {
        // Función para obtener los datos de la API
        const obtenerCursos = async () => {
            try {
                const form = new FormData();
                const response = await fetchData('curso_services', 'getAllCursos', form);

                if (response && response.dataset) {
                    setCursos(response.dataset);
                } else {
                    console.error("Estructura de respuesta inesperada:", response);
                }
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
            }
        };

        obtenerCursos();
    }, []);

    // Función para actualizar los datos al hacer scroll
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const form = new FormData();
            const response = await fetchData('curso_services', 'getAllCursos', form);

            if (response && response.dataset) {
                setCursos(response.dataset);
            } else {
                console.error("Estructura de respuesta inesperada:", response);
            }
        } catch (error) {
            console.error("Error al obtener los cursos:", error);
        } finally {
            setRefreshing(false);
        }
    };

    // Función para navegar hacia la pantalla de agregar curso
    const AgregarCurso = () => {
        navigation.navigate('CrearCursosScreen');
    }

    // Función para eliminar un curso
    const EliminarCurso = (curso) => {
        Alert.alert(
            "Confirmación",
            "¿Deseas Eliminar este curso?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            const response = await deleteCurso(curso.id_curso);
                            if (response.status === 1) {
                                setCursos(cursos.filter(c => c.id_curso !== curso.id_curso));
                                console.log("Curso eliminado:", curso.id_curso);
                                Alert.alert('Curso eliminado correctamente')
                            } else {
                                console.error("Error al eliminar el curso:", response.message);
                            }
                        } catch (error) {
                            console.error("Error al eliminar el curso:", error);
                        }
                    }
                }
            ]
        );
    }

    // Función para editar un curso
    const EditarCurso = async (curso) => {
        try {
            await AsyncStorage.setItem('id_curso', curso.id_curso.toString());
            console.log("Curso seleccionado para edición:", curso.id_curso);
            navigation.navigate('EditarCurso', { item: curso });
        } catch (error) {
            console.error("Error al guardar el id del curso:", error);
        }
    }
    //Si no hay cursos para mostrar
    const ListEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay cursos registrados</Text>
        </View>
    );

    // Función para renderizar cada elemento del FlatList
    const renderItem = ({ item }) => {
        return (
            <CursoCard
                item={item}
                onEdit={() => EditarCurso(item)}
                onDelete={() => EliminarCurso(item)}
            />
        );
    };

    return (
        <BackgroundImage background="AdminCFP">
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/myloanLogo.png')}
                    style={styles.logo} />
                <Text style={styles.title}>Listado de cursos registrados</Text>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={cursos} // Usa el estado de cursos en lugar de Data
                        numColumns={1} // Número de columnas
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id_curso.toString()} // Asegúrate de que el keyExtractor use id_curso como cadena
                        contentContainerStyle={styles.flatListContent}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        ListEmptyComponent={ListEmptyComponent} // Muestra el mensaje cuando no hay cursos
                    />
                </View>
                <Button
                    textoBoton={'Agregar'}
                    color={"Amarillo"}
                    accionBoton={AgregarCurso}
                />
            </View>
        </BackgroundImage>
    );
}


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
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#555',
    }
});

export default CursoScreen;
