import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import LoginScreen from './LoginScreen';

const ForgetPasswordScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errortext, setErrortext] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const showErrorToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            errortext,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const showSuccessToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            successMsg,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const handleSubmitPress = () => {
        if (password !== confirmPassword) {
            setErrortext("Password Do Not Match")
            setPassword('')
            setConfirmPassword('')
            showErrorToastWithGravity()
        }
        else {
            fetch("http://192.168.100.15:5000/api/user/forgotpassword/" + userEmail, {
                method: 'PUT',
                body: JSON.stringify({

                    password: password
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    setUserEmail('')
                    setPassword('')
                    setConfirmPassword('')
                    setSuccessMsg("Password Successfully Changed!")
                    showSuccessToastWithGravity()
                    navigation.navigate(LoginScreen)

                }).catch(err => {
                    console.log({ err });
                    setErrortext({ err })
                    showErrorToastWithGravity()
                    // reject(err);
                })
        }
    };

    return (
        <View style={styles.mainBody}>

            <ScrollView

                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',

                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../Image/bg.jpeg')}
                                style={{
                                    width: 150,
                                    height: 150,
                                    resizeMode: 'stretch',
                                    marginTop: -20
                                }}
                            />
                        </View>
                        <View style={{ marginTop: 50 }}>
                            <Text style={{ color: 'white', fontSize: 16, marginLeft: 40 }}>Email:</Text>
                            <View style={styles.SectionStyle}>

                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(UserEmail) => {
                                        setEmailError("")
                                        setUserEmail(UserEmail)
                                    }}
                                    value={userEmail}
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    underlineColorAndroid="#f000"
                                    returnKeyType="next"
                                />
                            </View>
                            {emailError !== '' ? (
                                <Text style={styles.errorTextStyle}>{emailError}</Text>
                            ) : null}
                            <Text style={{ color: 'white', fontSize: 16, marginLeft: 40 }}>Password:</Text>
                            <View style={styles.SectionStyle}>

                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(password) => {
                                        setPasswordError("")
                                        setPassword(password)
                                    }}
                                    value={password} //12345
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"

                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    secureTextEntry={true}
                                    underlineColorAndroid="#f000"
                                    returnKeyType="next"
                                />
                            </View>
                            {emailError !== '' ? (
                                <Text style={styles.errorTextStyle}>{emailError}</Text>
                            ) : null}
                            <Text style={{ color: 'white', fontSize: 16, marginLeft: 40 }}>Confirm Password:</Text>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(confirmPassword) => {
                                        setPasswordError("")
                                        setConfirmPassword(confirmPassword)

                                    }}
                                    value={confirmPassword} //12345
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    secureTextEntry={true}
                                    underlineColorAndroid="#f000"
                                    returnKeyType="next"
                                />
                            </View>
                            {passwordError != '' ? (
                                <Text style={styles.errorTextStyle}>
                                    {passwordError}
                                </Text>
                            ) : null}
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={handleSubmitPress}>
                                <Text style={styles.buttonTextStyle}>Confirm</Text>
                            </TouchableOpacity>
                        </View>

                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default ForgetPasswordScreen

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#000000',
        alignContent: 'center',
    },

    SectionStyle: {
        flexDirection: 'row',
        height: 55,
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        borderRadius: 10,
        // borderRadius: 30,
    },

    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dadae8',
        fontSize: 16,
    },
    buttonStyle: {
        backgroundColor: '#FEE715FF',
        borderWidth: 0,
        color: '#FFFFFF',
        height: 50,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#101820FF',
        paddingVertical: 12,
        fontSize: 20,
    },

    textStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },

    forgotPasswordStyle: {
        textDecorationLine: 'underline',
        color: '#FCF951FF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    signupTextStyle: {
        textDecorationLine: 'underline',
        color: '#FCF951FF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
