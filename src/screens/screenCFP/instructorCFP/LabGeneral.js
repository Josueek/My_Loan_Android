// LabGeneral.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
//Componente para establecer un fondo diferente en cada pantalla
import BackgroundImage from '../../../components/BackgroundImage';
//Importamos los componentes
import Input from '../../../components/Inputs/TextInput';
import InputShort from '../../../components/Inputs/InputShort';

const LabGeneral = () => {
    const [Lab, setLab] = useState('Curso de enca');
    //Pantalls de intructores
    return (
        <View style={styles.container}>
            {/*Usamos row y colum para posicionar los input en dos columnas*/}
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Nombre del laboratorio:</Text>
                    <Input
                        placeHolder="Taller de Eelectromecánica"
                        valor={Lab}
                        contra={false}
                        editable={false}
                        setTextChange={setLab}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Encargado:</Text>
                    <InputShort
                        placeHolder="Tulio uwu"
                        valor={Lab}
                        contra={false}
                        editable={false}
                        setTextChange={setLab}
                        style={styles.input}
                    />
                </View>
                <View style={styles.column}>
                    <Text>Capacidad de personas:</Text>
                    <InputShort
                        placeHolder="20"
                        valor={Lab}
                        contra={false}
                        editable={false}
                        setTextChange={setLab}
                        style={styles.input}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Tipo de espacio:</Text>
                    <InputShort
                        placeHolder="Taller"
                        valor={Lab}
                        contra={false}
                        editable={false}
                        setTextChange={setLab}
                        style={styles.input}
                    />
                </View>
                <View style={styles.column}>
                    <Text>Grupo del curso:</Text>
                    <InputShort
                        placeHolder="2"
                        valor={Lab}
                        contra={false}
                        editable={false}
                        setTextChange={setLab}
                        style={styles.input}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Especialidad:</Text>
                    <InputShort
                        placeHolder="Electromecánica"
                        valor={Lab}
                        contra={false}
                        editable={false}
                        setTextChange={setLab}
                        style={styles.input}
                    />
                </View>
                
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,

        paddingHorizontal: 5,
        backgroundColor: '#fff',
        padding: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        height: '35%',
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
export default LabGeneral;
