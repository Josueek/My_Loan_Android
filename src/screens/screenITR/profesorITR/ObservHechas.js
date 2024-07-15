import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
//Componente para establecer un fondo diferente en cada pantalla
import BackgroundImage from '../../../components/BackgroundImage';

const ObservHechas = () => {

    const [Observ, setObser] = useState('');

    return (
        <BackgroundImage background="InstructoritrScreen">
            <View style={styles.container}>
                <View style={styles.Logos}>
                    <Image source={require('../../../../assets/myloanLogo.png')} style={styles.logo} />
                    <Image source={require('../../../../assets/LogoRicaldone.png')} style={styles.logoRical} />
                </View>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    }, logoRical: {
        width: 100,
        height: 100,
        marginTop: 60,
        marginBottom: 30,
    }, Logos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    }, logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        marginBottom: 30,
    },
});
export default ObservHechas;