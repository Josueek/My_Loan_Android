import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert, Dimensions } from 'react-native';
import BackgroundImage from '../../../components/BackgroundImage';
import * as Constantes from '../../../utils/constantes';

const { width, height } = Dimensions.get('window');

const SettingsScreen = ({ navigation }) => {
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        estado: '',
        foto: '',
        especialidad: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const ip = Constantes.IP;

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`${ip}/MyLoan-new/api/services/miperfil_services.php?action=getProfile&id=${userId}`);
            const result = await response.json();
            if (result.status === 1) {
                setUserData({
                    nombre: result.dataset.nombre,
                    apellido: result.dataset.apellido,
                    telefono: result.dataset.telefono,
                    estado: result.dataset.estado,
                    foto: result.dataset.imagen,
                    especialidad: result.dataset.cargo || '', // Valor predeterminado si es undefined
                });
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

    useEffect(() => {
        // Simular la obtención del ID del usuario (deberías obtenerlo de AsyncStorage o contexto)
        const userId = 1; // Cambiar esto a la forma correcta de obtener el ID del usuario
        fetchUserData(userId);
    }, []);

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
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };
    

    const handleImageError = () => {
        // Proporciona una imagen predeterminada en caso de error
        return (
            <Image
                source={{ uri: `${ip}/MyLoan-new/api/images/Perfil/${userData.foto}` }} // Imagen de perfil predeterminada
                style={styles.profileImage}
            />
        );
    };


    if (loading) {
        return (
            <BackgroundImage background="login">
                <View style={styles.container}>
                    <Text style={styles.title}>Cargando...</Text>
                </View>
            </BackgroundImage>
        );
    }

    if (error) {
        return (
            <BackgroundImage background="login">
                <View style={styles.container}>
                    <Text style={styles.title}>{error}</Text>
                </View>
            </BackgroundImage>
        );
    }

    return (
        <BackgroundImage background="login">
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={{ uri: `${ip}/MyLoan-new/api/images/Perfil/${userData.foto}` }}
                    style={styles.profileImage}
                    onError={handleImageError}
                />
                <View style={styles.card}>
                    <Text style={styles.title}>Perfil</Text>

                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.nombre}
                            editable={false}
                        />

                        <Text style={styles.label}>Apellido</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.apellido}
                            editable={false}
                        />

                        <Text style={styles.label}>Teléfono</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.telefono}
                            editable={false}
                        />

                        <Text style={styles.label}>Estado</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.estado}
                            editable={false}
                        />

                        <Text style={styles.label}>Cargo</Text>
                        <TextInput
                            style={styles.input}
                            value={userData.especialidad ? userData.especialidad.toString() : ''}
                            editable={false}
                        />
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 20,
    },
    profileImage: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: (width * 0.3) / 2,
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 300,
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#000',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        width: '100%',
    },
    logoutButton: {
        backgroundColor: '#e74c3c',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    logoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default SettingsScreen;
