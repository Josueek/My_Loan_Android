// src/screens/SplashScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
//Estilo para el fondo
import BackgroundImage from '../../../components/BackgroundImage';
//Input para los campos
import InputMultiline from '../../../components/Inputs/InputMultiline';
import InputShort from '../../../components/Inputs/InputShort';
import ComboBox from '../../../components/Inputs/ComboBox';
import InputNumer from '../../../components/Inputs/InputNumer';
//Boton
import Buttons from '../../../components/Buttons/Buttons';

// Componente para editar cursos
export default function EditarCurso() {
    const [curso, setCurso] = useState('Curso de enca'); // Estado para el nombre del curso
    // Datos para llenar los combobox
    const items = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
    ];
    //
    const [text, setText] = useState(''); // Estado para texto genérico
    const [selectedValue, setSelectedValue] = useState(''); // Estado para el valor seleccionado en ComboBox
    const [number, setNumber] = useState(''); // Estado para valores numéricos
    // Navegación, volver a la pestaña anterior
    const navigation = useNavigation();
    const Volver = () => {
        navigation.navigate('AdmincfpTabNavigator');
    }
    /* Componente de fondo personalizado */ 
    return (
        <BackgroundImage background="AdminCFP">
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/myloanLogo.png')} // Ruta del logo
                    style={styles.logo}
                />
                <View style={styles.card}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Nombre del curso:</Text>
                                <InputShort
                                    placeHolder="Ingresa el nombre"
                                    valor={curso}
                                    contra={false}
                                    editable={true}
                                    setTextChange={setCurso}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Grupo cursante:</Text>
                                <InputNumer
                                    value={number}
                                    onChange={(value) => setNumber(value)}
                                    placeholder="Número del grupo"
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Fecha de inicio:</Text>
                                <InputShort
                                    placeHolder="19/04/2024"
                                    valor={curso}
                                    contra={false}
                                    editable={true}
                                    setTextChange={setCurso}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Fecha de finalización:</Text>
                                <InputShort
                                    placeHolder="20/04/2024"
                                    valor={curso}
                                    contra={false}
                                    editable={true}
                                    setTextChange={setCurso}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Programa de formación:</Text>
                                <ComboBox
                                    selectedValue={selectedValue}
                                    onValueChange={(value) => setSelectedValue(value)}
                                    items={items}
                                    placeholder="Programa"
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Duración del curso:</Text>
                                <InputShort
                                    placeHolder="00 horas, días"
                                    valor={curso}
                                    contra={false}
                                    editable={true}
                                    setTextChange={setCurso}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Instructor asignado:</Text>
                                <ComboBox
                                    selectedValue={selectedValue}
                                    onValueChange={(value) => setSelectedValue(value)}
                                    items={items}
                                    placeholder="Asignación de instructor"
                                />
                            </View>
                            <View style={styles.column}>
                                <Text>Cantidad de personas:</Text>
                                <InputNumer
                                    value={number}
                                    onChange={(value) => setNumber(value)}
                                    placeholder="Número de personas"
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text>Estado del curso:</Text>
                                <ComboBox
                                    selectedValue={selectedValue}
                                    onValueChange={(value) => setSelectedValue(value)}
                                    items={items}
                                    placeholder="Estado"
                                />
                            </View>
                        </View>

                        <Text>Observaciones del curso:</Text>
                        <InputMultiline
                            placeHolder="Ingresa algún comentario o observación"
                            valor={text}
                            contra={false}
                            editable={true}
                            setTextChange={setText}
                            style={styles.inputM}
                            multiline={true}
                        />
                    </ScrollView>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Buttons
                            color={"Amarillo"}
                            textoBoton={'Editar'}
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

// Estilos del componente
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
        marginTop: 10, // Ajusta este valor para aumentar el espacio entre las columnas
    },
});