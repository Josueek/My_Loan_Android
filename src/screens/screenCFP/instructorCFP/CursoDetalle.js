// CursoDetalle.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputShort from '../../../components/Inputs/InputShort';
import InputMultiline from '../../../components/Inputs/InputMultiline';


const CursoDetalle = () => {
    const [curso, setCurso] = useState('Curso de enca');
    return (
        <View style={styles.container}>
            <View style={styles.card}>


                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Duración del curso:</Text>
                        <InputShort
                            placeHolder="48 horas"
                            valor={curso}
                            contra={false}
                            editable={false}
                            setTextChange={setCurso}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text>Cantidad de personass:</Text>
                        <InputShort
                            placeHolder="20"
                            valor={curso}
                            contra={false}
                            editable={false}
                            setTextChange={setCurso}
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Instructor:</Text>
                        <InputShort
                            placeHolder="Daniel Wilfredo"
                            valor={curso}
                            contra={false}
                            editable={false}
                            setTextChange={setCurso}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text>Agrega un comentario:</Text>
                        <InputMultiline
                            placeHolder="Ingresa algún comentario o observación"
                            valor={curso}
                            contra={false}
                            editable={true}
                            setTextChange={setCurso}
                            style={styles.input}
                            multiline={true}
                        />
                    </View>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 35,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        padding: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        alignItems: 'center',
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

export default CursoDetalle;
