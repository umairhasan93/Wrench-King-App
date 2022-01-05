import React, { useState, UseEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5'




import AsyncStorage from '@react-native-community/async-storage'
import { Card } from 'react-native-paper';

const UpdateProfile = ({ navigation }) => {
    const [user, setUser] = useState([])
    const [name, setName] = useState()
    const [number, setNumber] = useState()

    AsyncStorage.getItem('user').then(data => {
        setUser(JSON.parse(data))
        // console.log(user);
    })
    return (
        <View style={styles.profilecenteredView}>
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
                    <Card style={styles.profileCard} onPress={() => { navigation.navigate('UpdateNameScreen') }}>
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
                            <Text style={styles.userDetail}>{user.name}</Text>
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
                                <Text style={styles.cardTag}>Mobile Number</Text>
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
                            <Text style={styles.userDetail}>{user.contact}</Text>
                        </View>

                    </Card>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profilecenteredView: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },

    profilemodalView: {
        backgroundColor: '#ffffff',
        paddingBottom: 20,
        height: 950,
        marginTop: 300,
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
        width: 350,
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
        width: 175,
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