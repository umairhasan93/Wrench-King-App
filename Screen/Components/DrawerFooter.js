import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

const DrawerFooter = () => {
    const navigation = useNavigation()
    const handleSubmit = () => {
        AsyncStorage.removeItem('user')
        navigation.replace('Auth')
    }
    return (

        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { handleSubmit() }} activeOpacity={0.3}>
                <View style={styles.logoutContainer}>
                    <Icon style={styles.Logouticons} name="sign-out-alt" size={19} />
                    <Text style={styles.logoutText}> Logout </Text>
                </View>
            </TouchableOpacity>

            <Text style={styles.FooterText}>Wrench King</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    logoutContainer: {
        marginTop: 15,
        marginBottom: 10,
        marginLeft: -120,
        flexDirection: 'row',
    },

    Logouticons: {
        marginLeft: 30,
        marginTop: 2,
        color: 'gray',
    },

    logoutText: {
        marginLeft: 5,
        fontSize: 18,
        color: 'gray',
    },

    headerLogo: {
        height: 40,
        width: 40,
        marginTop: 30,
    },

    FooterText: {
        marginTop: 5,
        fontSize: 20,
        marginBottom: 5,
        color: 'gray',
    },
})

export default DrawerFooter