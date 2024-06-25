// CursoGeneral.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputShort from '../../../components/Inputs/InputShort';
import Input from '../../../components/Inputs/TextInput';


const CursoGeneral = () => {
    const [curso, setCurso] = useState('Curso de enca'); // Estado para el curso
    /* Usamos row y column para posicionar los inputs en dos columnas */
    return (
        <View style={styles.container}>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Nombre del curso:</Text>
                    <Input
                        placeHolder="Nombre del curso"
                        valor={curso}
                        contra={false}
                        editable={false} // Campo no editable
                        setTextChange={setCurso}
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
                        editable={false} // Campo no editable
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
                        editable={false} // Campo no editable
                        setTextChange={setCurso}
                        style={styles.input}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Programa de formación:</Text>
                    <InputShort
                        placeHolder="EC"
                        valor={curso}
                        contra={false}
                        editable={false} // Campo no editable
                        setTextChange={setCurso}
                        style={styles.input}
                    />
                </View>
                <View style={styles.column}>
                    <Text>Grupo del curso:</Text>
                    <InputShort
                        placeHolder="2"
                        valor={curso}
                        contra={false}
                        editable={false} // Campo no editable
                        setTextChange={setCurso}
                        style={styles.input}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Duración del curso:</Text>
                    <InputShort
                        placeHolder="48 Horas"
                        valor={curso}
                        contra={false}
                        editable={false} // Campo no editable
                        setTextChange={setCurso}
                        style={styles.input}
                    />
                </View>
                <View style={styles.column}>
                    <Text>Cantidad de personas:</Text>
                    <InputShort
                        placeHolder="20"
                        valor={curso}
                        contra={false}
                        editable={false} // Campo no editable
                        setTextChange={setCurso}
                        style={styles.input}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text>Estado del curso:</Text>
                    <InputShort
                        placeHolder="Activo"
                        valor={curso}
                        contra={false}
                        editable={false} // Campo no editable
                        setTextChange={setCurso}
                        style={styles.input}
                    />
                </View>
                <View style={styles.column}>
                    <Text>Código del curso:</Text>
                    <InputShort
                        placeHolder="ASAS51"
                        valor={curso}
                        contra={false}
                        editable={false} // Campo no editable
                        setTextChange={setCurso}
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
        paddingTop: 25,
        paddingHorizontal: 5,
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
        flexDirection: 'row', // Organiza los elementos en una fila
        justifyContent: 'space-between', // Espacio entre los elementos
        marginVertical: 10, // Margen vertical entre las filas
    },
    column: {
        flex: 0,
        paddingLeft: 0,
        marginLeft: 5,
        marginRight: 10,
        marginTop: 10, // Ajusta este valor para aumentar el espacio entre las columnas
    },
});

export default CursoGeneral;
