import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItems } from '@react-navigation/drawer';
import Loader from "../Components/loader"
import AsyncStorage from '@react-native-community/async-storage'

export function DrawerContent(props) {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [user, setUser] = useState([])
    AsyncStorage.getItem('user').then(data => {
        if (data) {
            setUser(JSON.parse(data))
        }

    })


    const handleSubmit = () => {
        AsyncStorage.removeItem('user')
        setLoading(!loading)
        navigation.replace('Auth')
    }

    return (
        <View>

            <View style={styles.userDetails}>

                <Text style={styles.name}>{user.name}</Text>

            </View>
            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    width: 250,
                    alignSelf: 'center'
                }}
            />

            <Loader loading={loading} />

            <View style={{ alignItems: 'center', backgroundColor: 'white', marginTop: 450 }}>

                <TouchableOpacity onPress={() => { handleSubmit() }} activeOpacity={0.3}>
                    <View style={styles.logoutContainer}>
                        <Icon style={styles.Logouticons} name="sign-out-alt" size={19} />
                        <Text style={styles.logoutText}> Logout </Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.headerHeading}>Wrench King</Text>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    userDetails: {
        alignItems: 'center',
        margin: 15,
    },

    name: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },

    email: {
        fontSize: 12,
        textDecorationLine: 'underline',
        color: 'indigo',
        marginTop: 10,
    },


    logoutContainer: {
        marginTop: 15,
        marginBottom: 10,
        marginLeft: -120,
        flexDirection: 'row',
    },

    Logouticons: {
        marginLeft: 30,
        color: 'gray',
    },

    logoutText: {
        marginLeft: 20,
        fontSize: 18,
        color: 'gray',
    },

    headerLogo: {
        height: 40,
        width: 40,
        marginTop: 30,
    },

    headerHeading: {
        marginTop: 5,
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
    },
});

// export default DrawerContent
