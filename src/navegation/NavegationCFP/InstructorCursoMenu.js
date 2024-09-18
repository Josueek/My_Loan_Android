import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabControl } from 'rn-segmented-tab-controls';
import BackgroundImage from '../../components/BackgroundImage';
import Buttons from '../../components/Buttons/Buttons';
import CursoGeneral from '../../screens/screenCFP/instructorCFP/CursoGeneral';
import CursoDetalle from '../../screens/screenCFP/instructorCFP/CursoDetalle';

const InstructorCursoMenu = () => {
    const navigation = useNavigation();

    const values = [
        { key: "General", renderItem: CursoGeneral },
        { key: "Detalle", renderItem: CursoDetalle },
    ];

    const Volver = () => {
        navigation.navigate("InstructorCurso");
    }

    return (
        <BackgroundImage background="CursoInstructor">
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/myloanLogo.png')}
                    style={styles.logo}
                />
                <TabControl
                    values={values}
                    style={styles.tabControl}
                    activeTabStyle={{ backgroundColor: '#000' }}
                    inactiveTabStyle={{ backgroundColor: '#000' }}
                    font
                />
                <View style={styles.button}>
                    <Buttons
                        color={"Gris"}
                        textoBoton={"Volver"}
                        accionBoton={Volver}
                    />
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
    },
    tabControl: {
        marginTop: 20,
        backgroundColor: '#F9F9F9',
        width: '100%',
        height: '65%',
    },
    button: {
        marginTop: 60,
    }
});

export default InstructorCursoMenu;
