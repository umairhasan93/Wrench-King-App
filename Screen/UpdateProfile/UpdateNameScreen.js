import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    SafeAreaView,
    ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


import AsyncStorage from '@react-native-community/async-storage'
import { Card } from 'react-native-paper';

const UpdateName = ({ navigation, route }) => {
    const { id } = route.params
    const [error, setError] = useState('')

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            error,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };

    const [user, setUser] = useState([])

    const [localUser, setLocalUser] = useState([])

    useEffect(() => {
        // const id = localUser.id
        // AsyncStorage.getItem('user').then(data => {
        //     setLocalUser(JSON.parse(data))
        // })

        let url = `${API}user/`

        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => {
                setUser(resp)
                setFirstName(resp.firstname)
                setLastName(resp.lastname)


            })
    }, [])



    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')

    const fname = user.firstname
    const lname = user.lastname


    const isFormValid = useMemo(() => {
        return firstname.length > 0 && lastname.length > 0;
    }, [firstname, lastname]);

    const Save = () => {
        let url = `${API}user/`
        fetch(url + id, {
            method: 'PUT',
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

            .then((response) => response.json())
            .then((json) => {
                navigation.navigate('HomeScreen')
                setError('Name Changed')
                showToastWithGravity()


            })
            .catch(err => {
                console.log({ err });
                reject(err);
            })

    }

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', marginTop: 15, width: 355, marginLeft: 14 }}>
                <View style={{ width: 118.3 }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('UpdateProfileScreen', { id: id })
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
                    style={{ alignItems: "center", width: 118.3, marginLeft: 12 }}>
                    <Text style={styles.profilemodalHeadingText}>
                        Name
                    </Text>
                </View>


            </View>
            <KeyboardAvoidingView enabled>

                <View style={{ alignItems: "center", marginTop: 50 }}>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(fname) =>
                                setFirstName(fname)
                            }
                            value={firstname}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.labelView} >
                        <Text style={styles.label}>First Name</Text>
                    </View>

                </View>

                <View style={{ marginTop: HEIGHT / 16, width: WIDTH - 33, marginLeft: WIDTH / 14 }}>
                    {
                        firstname.length < 1 ? <Text style={{ fontSize: 12, color: 'red' }}>Don't Forgot to fill First Name</Text> : null
                    }
                </View>

                <View style={{ alignItems: "center", marginTop: 40 }}>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(lname) => {
                                setLastName(lname)
                            }}
                            value={lastname}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.labelView} >
                        <Text style={styles.label}>Last Name</Text>
                    </View>
                </View>
                <View style={{ marginTop: HEIGHT / 16, width: WIDTH - 33, marginLeft: WIDTH / 14 }}>
                    {
                        lastname.length < 1 ? <Text style={{ fontSize: 12, color: 'red' }}>Don't Forgot to fill First Name</Text> : null
                    }
                </View>

                {/* <Text>{HEIGHT}</Text>
                <Text>{WIDTH}</Text> */}

            </KeyboardAvoidingView>
            <View style={{ marginTop: !isFormValid ? HEIGHT - 287 : HEIGHT - 267 }}>
                <Card style={styles.buttonCard}>
                    <TouchableOpacity
                        disabled={!isFormValid}
                        style={[
                            styles.buttonContainer,
                            !isFormValid &&
                            {
                                backgroundColor: "#A52A2A",
                                height: 55,
                                width: 350,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 13,
                                borderRadius: 10,
                                shadowColor: 'black',
                                shadowOffset: {
                                    width: 15,
                                    height: 15,
                                },
                                shadowOpacity: 20,
                                shadowRadius: 10,
                                elevation: 5,
                            }
                        ]}
                        activeOpacity={0.3}
                        onPress={() => Save()}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </Card>
            </View>
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
        width: WIDTH - 33,
        marginTop: -10,
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
        marginTop: -(HEIGHT / 15)
    },

    buttonContainer: {
        backgroundColor: "red",
        height: 55,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 13,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 15,
            height: 15,
        },
        shadowOpacity: 20,
        shadowRadius: 10,
        elevation: 5,
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
})

export default UpdateName