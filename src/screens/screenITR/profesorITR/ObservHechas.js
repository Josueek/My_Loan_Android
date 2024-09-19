import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import BackgroundImage from '../../../components/BackgroundImage';
import { useNavigation } from '@react-navigation/native';
import Data from '../../../data/dataCFP/EspaciosITR'; // Asegúrate que esta data esté correctamente definida

const ObservHechas = () => {
    // Navegabilidad
    const navigation = useNavigation();

    // Estado para el comentario
    const [comentario, setComentario] = useState('');
    const [tipoEspacio, setTipoEspacio] = useState('Taller'); // Inicialmente se puede mostrar 'Taller'

    // Seleccionamos la imagen para renderizarla
    const imageToDisplay = Data.length > 0 ? Data[0].Imagen : require('../../../../assets/default.png'); // Tu imagen de ejemplo

    return (
        <BackgroundImage background="InstructoritrScreen">
            <View style={styles.container}>
                {/* Logo */}
                <Image source={require('../../../../assets/myloanLogo.png')} style={styles.logo} />

                {/* Imagen */}
                {imageToDisplay && (
                    <View style={styles.imageContainer}>
                        <Image source={imageToDisplay} style={styles.image} />
                    </View>
                )}

                {/* Campo Tipo de espacio */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tipo de espacio</Text>
                    <View style={styles.input}>
                        <Text>{tipoEspacio}</Text>
                    </View>
                </View>

                {/* Campo para comentarios */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Añade una observación o comentario</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Añadir observación o comentario"
                        value={comentario}
                        onChangeText={setComentario}
                        multiline
                    />
                </View>

                {/* Botón de regresar */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Regresar</Text>
                </TouchableOpacity>
            </View>
        </BackgroundImage>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        marginBottom: 30,
    },
    imageContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#000',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
    },
    textArea: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        height: 100,
        textAlignVertical: 'top',
        backgroundColor: '#f5f5f5',
    },
    button: {
        backgroundColor: '#FFC107',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ObservHechas;
