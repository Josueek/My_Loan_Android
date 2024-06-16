import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CursoGeneral from '../../screens/screenCFP/instructorCFP/CursoGeneral';
import CursoDetalle from '../../screens/screenCFP/instructorCFP/CursoDetalle';
import { TabControl } from 'rn-segmented-tab-controls';
import BackgroundImage from '../../components/BackgroundImage';
/*En esta pantalla se muestra un menu tipo tab para cambiar de pantalla*/
const InstructorCursoMenu = () => {
    const values = [
        { key: "General", renderItem: CursoGeneral },
        { key: "Detalle", renderItem: CursoDetalle },
    ];

    const navigation = useNavigation();

    return (
        <BackgroundImage background="CursoInstructor">
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/myloanLogo.png')}
                    style={styles.logo} />

                <TabControl values={values} style={styles.tabControl} 
                activeTabStyle={{ backgroundColor: '#000' }}  
                inactiveTabStyle={{ backgroundColor: '#000' }}
                font/>

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
        marginTop: 20, // Ajusta este valor según sea necesario para subir el TabControl
        backgroundColor: '#F9F9F9',
        width: '200',
        activeTabStyle: '#000',
    },
});

export default InstructorCursoMenu;
