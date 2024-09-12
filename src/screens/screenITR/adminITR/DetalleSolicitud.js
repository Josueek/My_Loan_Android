import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import BackgroundImage from '../../../components/BackgroundImage';
import * as Constantes from '../../../utils/constantes';

const DetalleSolicitud = () => {
    const [data, setData] = useState([]);
    const ip = Constantes.IP;


    return (
        <BackgroundImage background="AdminCFP">
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/myloanLogo.png')}
                    style={styles.logo}
                />
                <View style={styles.card}>
                    <Text>Detalles del préstamo</Text>
                </View>

            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
    }, logo: {
        width: 125,
        height: 80,
        marginTop: 50,
        marginBottom: 30,
        justifyContent: 'space-between',
    }, card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        width: 375,
        height: 150,
        marginBottom: 30,
    }
});

export default DetalleSolicitud;
