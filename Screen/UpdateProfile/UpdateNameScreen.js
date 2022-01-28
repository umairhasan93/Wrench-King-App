import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


import AsyncStorage from '@react-native-community/async-storage'
import { Card } from 'react-native-paper';

const UpdateName = ({ navigation, route }) => {
    const { userId, userfname, userlname } = route.params
    const [user, setUser] = useState([])
    const [localUser, setLocalUser] = useState([])
    let fname = localUser.fname
    let lname = localUser.lname
    const [firstname, setFirstName] = useState()
    const [lastname, setLastName] = useState()
    // const [updateData, setUpdateData] = useState([])


    AsyncStorage.getItem('user').then(data => {
        if (data) {
            setLocalUser(JSON.parse(data))
            // console.log(localUser);
        }
    })

    useEffect(() => {
        fetch("http://192.168.100.15:5000/api/user/" + userId)
            .then(resp => resp.json())
            .then(resp => {
                setUser(resp)
                // console.log(resp)
                localUser.fname = user.firstname
                localUser.lname = user.lastname
                localUser.name = user.firstname + ' ' + user.lastname
                AsyncStorage.setItem('user', JSON.stringify(localUser))
            })
    }, [])
    // console.log(id)



    const Save = () => {

        // if (firstname === null && lastname === null) {
        //     localUser.fname = localUser.fname
        //     localUser.lname = localUser.lname
        //     localUser.name = localUser.fname + ' ' + localUser.lname
        //     AsyncStorage.setItem('user', JSON.stringify(localUser));
        //     console.log(localUser)
        // } else if (firstname !== null && lastname === null) {
        //     localUser.fname = firstname
        //     localUser.lname = localUser.lname
        //     localUser.name = firstname + ' ' + localUser.lname
        //     AsyncStorage.setItem('user', JSON.stringify(localUser))

        // } else if (firstname === null && lastname !== null) {
        //     localUser.fname = localUser.fname
        //     localUser.lname = lastname
        //     localUser.name = localUser.fname + ' ' + lastname
        //     AsyncStorage.setItem('user', JSON.stringify(localUser))
        // }

        fetch("http://192.168.100.15:5000/api/user/" + userId, {
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
                console.log(json)
                setUser(json)

            }).catch(err => {
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
                    style={{ alignItems: "center", width: 118.3, marginLeft: 12 }}>
                    <Text style={styles.profilemodalHeadingText}>
                        Name
                    </Text>
                </View>


            </View>
            <KeyboardAvoidingView enabled>

                <View style={{ alignItems: "center", marginTop: 30 }}>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(fname) =>
                                setFirstName(fname)
                            }
                            value={userfname}
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
                            onChangeText={(lname) => {
                                setLastName(lname)
                            }}
                            value={userlname}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.labelView} >
                        <Text style={styles.label}>Last Name</Text>
                    </View>
                </View>

                {/* <Text>{HEIGHT}</Text>
                <Text>{WIDTH}</Text> */}

            </KeyboardAvoidingView>
            <View style={{ marginTop: HEIGHT - 267 }}>
                <Card style={styles.buttonCard}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
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