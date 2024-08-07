import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import BackgroundImage from '../../../components/BackgroundImage';
import * as Constantes from '../../../utils/constantes';

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

    const fetchUserData = async () => {
        try {
            // Cambia el endpoint para que devuelva datos de la tabla `tb_datos_empleados`
            const response = await fetch(`${ip}/MyLoan-new/api/services/empleado_services.php?action=getEmpleado`);
            const result = await response.json();
            if (result.status === 1) {
                setUserData({
                    nombre: result.dataset.nombre_empleado,
                    apellido: result.dataset.apellido_empleado,
                    telefono: result.dataset.telefono,
                    estado: result.dataset.estado_empleado,
                    foto: result.dataset.foto_empleado,
                    especialidad: result.dataset.id_especialidad,
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
        fetchUserData();
    }, []);

    const handleLogout = () => {
        // Aquí iría la lógica para cerrar sesión, por ejemplo, eliminar el token de autenticación
        console.log('Cerrar sesión');
        navigation.navigate('LoginScreen');
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

    if (error) {
        return (
            <BackgroundImage background="AdminCFP">
                <View style={styles.container}>
                    <Text>{error}</Text>
                </View>
            </BackgroundImage>
        );
    }

    return (
        <BackgroundImage background="AdminCFP">
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Ajustes</Text>

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

                    <Text style={styles.label}>Foto</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.foto}
                        editable={false}
                    />

                    <Text style={styles.label}>Especialidad</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.especialidad.toString()}
                        editable={false}
                    />
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
    },
    logoutButton: {
        backgroundColor: '#e74c3c',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 30,
    },
    logoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default SettingsScreen;
