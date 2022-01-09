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
import { useTogglePasswordVisibility } from "./useTogglePasswordVisibility"
import { useToggleNewPasswordVisibility } from "./NewPasswordVisiblity"
// import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage'
import { Card } from 'react-native-paper';

const ChangePassword = ({ navigation }) => {
    const [user, setUser] = useState([])
    const [localUser, setLocalUser] = useState([])

    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();

    const { newpasswordVisibility, rightNewIcon, handleNewPasswordVisibility } =
        useToggleNewPasswordVisibility();

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');

    const id = localUser.id
    AsyncStorage.getItem('user').then(data => {
        if (data) {
            setLocalUser(JSON.parse(data))
            // console.log(localUser);
        }
    })



    const ChangePassword = () => {
        fetch("http://192.168.100.15:5000/api/user/changepassword/" + id, {
            method: 'PUT',
            body: JSON.stringify({
                currentPassword: currentPassword,
                password: newPassword
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
                    style={{ alignItems: "center", width: 118.3, marginLeft: 6 }}>
                    <Text style={styles.profilemodalHeadingText}>
                        Reset Password
                    </Text>
                </View>


            </View>
            <KeyboardAvoidingView enabled>

                <View style={{ alignItems: "center", marginTop: 30 }}>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(currentPass) =>
                                setCurrentPassword(currentPass)
                            }
                            placeholder="Current password"
                            placeholderTextColor="gray"
                            secureTextEntry={passwordVisibility}
                        />
                        <TouchableOpacity
                            style={{ justifyContent: 'center' }}
                            activeOpacity={0.3}
                            onPress={handlePasswordVisibility}
                        >
                            <Icon
                                name={rightIcon}
                                size={24}
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ alignItems: "center", marginTop: -10 }}>

                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(newPass) => {
                                setNewPassword(newPass)
                            }}
                            placeholder="New password"
                            placeholderTextColor="gray"
                            secureTextEntry={newpasswordVisibility}
                        />

                        <TouchableOpacity
                            style={{ justifyContent: 'center' }}
                            activeOpacity={0.3}
                            onPress={handleNewPasswordVisibility}
                        >
                            <Icon
                                name={rightNewIcon}
                                size={24}
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ marginTop: 327 }}>
                    <Card style={styles.buttonCard}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            activeOpacity={0.3}
                            onPress={() => ChangePassword()}
                        >
                            <Text style={styles.buttonText}>Change Password</Text>
                        </TouchableOpacity>
                    </Card>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    profilemodalHeadingText: {
        marginLeft: -10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },

    labelView: {
        backgroundColor: "ffffff90",
        marginLeft: -250,
        marginTop: -62,

    },

    labelView1: {
        backgroundColor: "ffffff90",
        marginLeft: -240,
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
        borderWidth: 1,
        borderColor: '#dadae8',
    },

    inputStyle: {

        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 14,
        fontWeight: 'bold',
        width: 300
    },

    eyeIcon: {
        alignSelf: 'center',
        marginLeft: 12
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

export default ChangePassword