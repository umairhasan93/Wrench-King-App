import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    SafeAreaView,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { useTogglePasswordVisibility } from "./useTogglePasswordVisibility"
import { useToggleNewPasswordVisibility } from "./NewPasswordVisiblity"
import AsyncStorage from '@react-native-community/async-storage'
import { Card } from 'react-native-paper';
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const ChangePassword = ({ navigation, route }) => {

    const { id } = route.params
    console.log(id)
    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            "Password Changed Succesfully !",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const showErrorToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            "Current Password Is Not Correct !",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();

    const { newpasswordVisibility, rightNewIcon, handleNewPasswordVisibility } =
        useToggleNewPasswordVisibility();

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');

    // const id = localUser.id
    // AsyncStorage.getItem('user').then(data => {
    //     if (data) {
    //         setLocalUser(JSON.parse(data))
    //         // console.log(localUser);
    //     }
    // })



    const ChangePassword = () => {
        let url = `${API}user/changepassword/`
        fetch(url + id, {
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
                if (json.code > 200 || json.code < 400) {
                    showToastWithGravity()
                    console.log('Success')
                    navigation.navigate('HomeScreen')
                }
                else {
                    console.log('Error')
                    showErrorToastWithGravity()
                }



            }).catch(err => {
                console.log({ err });
                reject(err);
                showErrorToastWithGravity()

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
                    style={{ alignItems: "center", width: WIDTH / 3 }}>
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
                            style={{ justifyContent: 'center', marginLeft: WIDTH / 30 }}
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
                            style={{ justifyContent: 'center', marginLeft: WIDTH / 30 }}
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
                <View style={{ marginTop: HEIGHT - 310 }}>
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
        width: WIDTH - 35,
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
        paddingLeft: WIDTH / 25,
        paddingRight: WIDTH / 25,
        fontSize: 14,
        fontWeight: 'bold',
        width: WIDTH - 90,

    },

    eyeIcon: {
        alignSelf: 'center',
        // marginLeft: 12
    },

    cancelIcon: {
        marginTop: 5,
        marginLeft: WIDTH / 55
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

export default ChangePassword