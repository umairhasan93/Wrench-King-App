import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5'
// import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage'
import { Card } from 'react-native-paper';

const UpdateName = ({ navigation }) => {
    const [user, setUser] = useState([])
    const [localUser, setLocalUser] = useState([])
    const [firstname, setFirtName] = useState(user.firstname)
    const [lastname, setLastName] = useState(user.lastname)
    var id = localUser.id

    useEffect(() => {
        fetch("http://192.168.100.15:5000/api/user/" + id, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(resp => {
                setUser(resp)
                setFirtName(user.firstName)
                setLastName(user.lastName)
            })
    }, [])
    // console.log(user.id)

    AsyncStorage.getItem('user').then(data => {
        if (data) {
            setLocalUser(JSON.parse(data))
        }
    })

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', marginTop: 15, width: 355 }}>
                <View style={{ width: 118.3 }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('UpdateProfileScreen')
                        }} style={{ width: 118.3 }}>
                        <FontIcon
                            style={styles.cancelIcon}
                            name="arrow-left"
                            size={18}
                            color="red"
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{ alignItems: "center", width: 118.3 }}>
                    <Text style={styles.profilemodalHeadingText}>
                        Name
                    </Text>
                </View>

                <View style={{ width: 118.3, }}>
                    <TouchableOpacity
                        onPress={() => {
                            setEditNameModalVisible(!editNameModalVisible)
                        }} style={{ width: 118.3, alignItems: 'flex-end' }}>
                        <FontIcon
                            style={styles.cancelIcon}
                            name="check"
                            size={18}
                            color="red"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <KeyboardAvoidingView enabled>

                <View style={{ alignItems: "center", marginTop: 30 }}>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(Password) => {
                                setPasswordError("")
                                setPassword(Password)

                            }}
                            placeholder={user.firstname}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.labelView} >
                        <Text style={styles.label}>First Name</Text>
                    </View>
                </View>

                <View style={{ alignItems: "center", marginTop: 40 }}>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(Password) => {
                                setPasswordError("")
                                setPassword(Password)

                            }}
                            placeholder={user.lastname}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.labelView} >
                        <Text style={styles.label}>Last Name</Text>
                    </View>
                </View>
                <View style={{ marginTop: 375 }}>
                    <Card style={styles.buttonCard}>
                        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.2}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </Card>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    profilemodalHeadingText: {
        marginLeft: -20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },

    labelView: {
        backgroundColor: "ffffff90",
        marginLeft: -270,
        marginTop: -62,

    },

    label: {
        fontSize: 10,

    },

    SectionStyle: {
        flexDirection: 'row',
        height: 45,
        width: 350,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        borderRadius: 10,

    },

    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dadae8',
        fontSize: 14,
        fontWeight: 'bold',
    },

    cancelIcon: {
        marginTop: 5,
    },

    buttonCard: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 15,
            height: 15,
        },
        shadowOpacity: 20,
        shadowRadius: 10,
        elevation: 9,
    },

    buttonContainer: {
        backgroundColor: "#EE6087",
        height: 55,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 13,
        borderRadius: 10
    },

    buttonText: {},
})

export default UpdateName