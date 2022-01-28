import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const DrawerFooter = () => {
    const navigation = useNavigation()

    const handleSubmit = () => {
        AsyncStorage.removeItem('user')
        navigation.replace('Auth')
    }
    return (

        <View style={{ alignItems: 'center', marginTop: 115 }}>
            <TouchableOpacity onPress={() => handleSubmit()} activeOpacity={0.3}>
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
        marginTop: 10,
        marginBottom: 10,
        marginLeft: -140,
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



    FooterText: {
        marginTop: 5,
        fontSize: 20,
        marginBottom: 5,
        color: 'gray',
    },
})

export default DrawerFooter