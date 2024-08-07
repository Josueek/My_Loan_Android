import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundImage from '../../../components/BackgroundImage';
import Button from '../../../components/Buttons/Buttons';
import CursoCard from '../../../components/Cards/CursoCard';
import fetchData, { deleteCurso } from '../../../utils/fetchDataCursos';

const CursoScreen = () => {
    const [cursos, setCursos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const obtenerCursos = async () => {
            try {
                const form = new FormData();
                const response = await fetchData('curso_services', 'getAllCursos', form);

                // Verifica la respuesta de la API
                console.log('API Response:', response);

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

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const form = new FormData();
            const response = await fetchData('curso_services', 'getAllCursos', form);

            // Verifica la respuesta de la API
            console.log('API Response on Refresh:', response);

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

    const AgregarCurso = () => {
        navigation.navigate('CrearCursosScreen');
    }

    const EliminarCurso = (curso) => {
        Alert.alert(
            "Confirmación",
            "¿Deseas eliminar este curso?",
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
                                Alert.alert('Curso eliminado correctamente');
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

    const EditarCurso = async (curso) => {
        try {
            await AsyncStorage.setItem('id_curso', curso.id_curso.toString());
            console.log("Curso seleccionado para edición:", curso.id_curso);
            navigation.navigate('EditarCurso', { item: curso });
        } catch (error) {
            console.error("Error al guardar el id del curso:", error);
        }
    }

    const ListEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay cursos registrados</Text>
        </View>
    );

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
                        data={cursos} 
                        numColumns={1} 
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id_curso.toString()} 
                        contentContainerStyle={styles.flatListContent}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        ListEmptyComponent={ListEmptyComponent}
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
