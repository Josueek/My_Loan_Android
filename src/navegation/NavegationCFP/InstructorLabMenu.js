import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Importamos las pantallas
import LabGeneral from '../../screens/screenCFP/instructorCFP/LabGeneral';
import LabDetalle from '../../screens/screenCFP/instructorCFP/LabDetalle';
//Libreria para implementar las pestañas
import { TabControl } from 'rn-segmented-tab-controls';
//Componente para definir el fondo de pantalla 
import BackgroundImage from '../../components/BackgroundImage';
//Componentes
import Buttons from '../../components/Buttons/Buttons';

/*En esta pantalla se muestra un menu tipo tab para cambiar de pantalla*/

const InstructorLabMenu = () => {
    //Definimos las opciones de la pestaña
    const values = [
        { key: "General", renderItem: LabGeneral },
        { key: "Detalle", renderItem: LabDetalle },
    ];
    const Volver = () => {
        navigation.navigate('LabGeneral');
    }
    const navigation = useNavigation();

    return (
        <BackgroundImage background="LabInstructor">
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/myloanLogo.png')}
                    style={styles.logo} />

                <TabControl values={values} style={styles.tabControl}
                    activeTabStyle={{ backgroundColor: '#000' }}
                    inactiveTabStyle={{ backgroundColor: '#000' }}
                    font />
                <View style={styles.buton}>
                    <Buttons
                        color={"Gris"}
                        textoBoton={"Volver"} 
                        accionBoton={Volver}/>
                </View>

            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        justifyContent: 'space-around',
    },
    tabControl: {
        marginTop: 30, // Ajusta este valor según sea necesario para subir el TabControl
        backgroundColor: '#F9F9F9',
        width: '200',
        activeTabStyle: '#000',
        height: '65%',
    }, buton: {
        marginTop: 60,
    }
});

export default InstructorLabMenu;
