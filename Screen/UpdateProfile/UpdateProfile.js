import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-community/async-storage'
import { Card } from 'react-native-paper';
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const UpdateProfile = ({ navigation, route }) => {
    const { id } = route.params
    const [user, setUser] = useState([])
    console.log(id)
    const [localUser, setLocalUser] = useState([])

    useEffect(() => {
        // AsyncStorage.getItem('user').then(data => {
        //     setLocalUser(JSON.parse(data))
        // })
        let url = `${API}user/`
        // console.log(url)
        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => {
                setUser(resp)
            })
    }, [])

    const fname = user.firstname
    const lname = user.lastname
    const name = fname + ' ' + lname

    const email = user.email

    console.log(id);
    console.log(name)
    console.log(email);


    return (

        <View style={styles.profilemodalView}>
            <View style={{ flexDirection: 'row', marginTop: 15, width: 355 }}>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('HomeScreen')
                        }}>
                        <FontIcon
                            style={styles.cancelIcon}
                            name="times"
                            size={18}
                            color="red"
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{ alignItems: "center", width: 340 }}>
                    <Text style={styles.profilemodalHeadingText}>
                        Profile
                    </Text>
                </View>
            </View>

            <View style={{ alignItems: "center", marginTop: 30, backgroundColor: '#ffffff90' }}>
                <Card style={styles.profileCard} onPress={() => { navigation.navigate('UpdateNameScreen', { id: id }) }}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={styles.tagView}>
                            <Text style={styles.cardTag}>Name</Text>
                        </View>

                        <View style={styles.penIconView}>
                            <Icon
                                style={styles.penIcon}
                                name="pencil-outline"
                                size={24}
                                color="red" />
                        </View>

                    </View>
                    <View style={{ height: 45, justifyContent: 'center' }}>
                        <Text style={styles.userDetail}>{name}</Text>
                    </View>

                </Card>

                <Card style={styles.profileCard} onPress={() => navigation.navigate('PasswordResetScreen')}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={styles.tagView}>
                            <Text style={styles.cardTag}>Password</Text>
                        </View>

                        <View style={styles.penIconView}>
                            <Icon
                                style={styles.penIcon}
                                name="pencil-outline"
                                size={24}
                                color="red" />
                        </View>

                    </View>
                    <View style={{ height: 45, justifyContent: 'center' }}>
                        <Text style={styles.userDetailPassword}>.......</Text>
                    </View>

                </Card>

                <Card style={styles.profileCard}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={styles.tagView}>
                            <Text style={styles.cardTag}>Email</Text>
                        </View>

                    </View>
                    <View style={{ height: 45, justifyContent: 'center' }}>
                        <Text style={styles.userDetail}>{email}</Text>
                    </View>

                </Card>
            </View>



        </View>

    )
}

const styles = StyleSheet.create({


    profilemodalView: {
        backgroundColor: '#ffffff',
        paddingBottom: 20,
        height: 950,
        // marginTop: 300,
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
        overflow: 'hidden'
    },

    profilemodalHeadingText: {
        marginLeft: -20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },

    profilecontainerStyle: {
        flexDirection: 'row',
        backgroundColor: '#69696990',
        height: 65,
        width: 370,
        borderRadius: 30,
        marginTop: 10,
    },

    cancelIcon: {
        marginTop: 5,
    },

    profileCard: {
        height: 90,
        width: WIDTH - 40,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20
    },

    tagView: {
        width: 175,
        height: 45,
        justifyContent: 'center',

    },

    cardTag: {
        marginLeft: 15,
        marginTop: 10,
        color: 'black'
    },

    penIconView: {
        width: WIDTH - 215,
        height: 45,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    penIcon: {
        marginRight: 15,
        marginTop: 10,
    },

    userDetail: {
        marginLeft: 15,
        marginTop: -5,
        fontWeight: 'bold',
        color: 'black'
    },

    userDetailPassword: {
        marginLeft: 15,
        marginTop: -15,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 22,
    },
})


export default UpdateProfile