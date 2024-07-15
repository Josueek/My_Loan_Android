import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Componente para establecer un fondo diferente en cada pantalla
import BackgroundImage from '../../../components/BackgroundImage';
//Importamos los componentes
import InputShort from '../../../components/Inputs/InputShort';
import TextInput from '../../../components/Inputs/TextInput';
import ButtonDown from '../../../components/Buttons/ButtonDonw';
import Buttons from '../../../components/Buttons/Buttons';


const DatosEspacio = () => {
    const [Espacio, setEspacio] = useState('Curso de enca');
    // Navegabilidad
    const navigation = useNavigation();
    // Accion del boton
    const VerObservacion = () => {
        navigation.navigate('ObservHechas');
    };
    //Volver a la pantalla anterior
    const Volver = () => {
        navigation.navigate('EspaciosAsignados')
    }
    return (
        <BackgroundImage background="InstructoritrScreen">
            <View style={styles.container}>
                <View style={styles.Logos}>
                    <Image source={require('../../../../assets/myloanLogo.png')} style={styles.logo} />
                    <Image source={require('../../../../assets/LogoRicaldone.png')} style={styles.logoRical} />
                </View>
                <Text style={styles.title}>Información sobre el espacio asignado</Text>
                <View style={styles.card}>
                    <ButtonDown
                        textoBoton={'Descargar inventario'}
                        color={'DownLoad'}
                        iconName="download-outline"
                    />
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text>Nombre del laboratorio:</Text>
                            <TextInput
                                placeHolder="Ingresa el nombre"
                                valor={Espacio}
                                contra={false}
                                editable={false}
                                setTextChange={setEspacio}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text>Encargado:</Text>
                            <InputShort
                                placeHolder="Instructor encargado"
                                valor={Espacio}
                                contra={false}
                                editable={false}
                                setTextChange={setEspacio}
                            />
                        </View>
                        <View style={styles.column}>
                            <Text>Capacidad de personas:</Text>
                            <InputShort
                                placeHolder="Cantidad"
                                valor={Espacio}
                                contra={false}
                                editable={false}
                                setTextChange={setEspacio}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text>Tipo de espacio:</Text>
                            <InputShort
                                placeHolder="Espacio"
                                valor={Espacio}
                                contra={false}
                                editable={false}
                                setTextChange={setEspacio}
                            />
                        </View>
                        <View style={styles.column}>
                            <Text>Grupo cursante:</Text>
                            <InputShort
                                placeHolder="2"
                                valor={Espacio}
                                contra={false}
                                editable={false}
                                setTextChange={setEspacio}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text>Especialidad:</Text>
                            <InputShort
                                placeHolder="Nombre"
                                valor={Espacio}
                                contra={false}
                                editable={false}
                                setTextChange={setEspacio}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Buttons color={'Amarillo'}
                            textoBoton={"Observaciones"}
                            accionBoton={VerObservacion} />
                    </View>
                    <View style={styles.column}>
                        <Buttons color={'Gris'}
                            textoBoton={"Volver"}
                            accionBoton={Volver} />
                    </View>
                </View>
            </View>
        </BackgroundImage>
    );
}


//Funciona para ver el estilo que se va a ver en la pantalla
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    logoRical: {
        width: 100,
        height: 100,
        marginTop: 60,
        marginBottom: 30,
    },
    Logos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    }, card: {
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
        height: '60%',
        marginBottom: 10,
        marginLeft: 0,
        alignContent: 'center',
        paddingTop: 30
    }, row: {
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
    }
});

export default DatosEspacio;