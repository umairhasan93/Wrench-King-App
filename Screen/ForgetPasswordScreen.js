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
    Dimensions
} from 'react-native';
import LoginScreen from './LoginScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ForgetPasswordScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errortext, setErrortext] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const WIDTH = Dimensions.get('window').width
    const HEIGHT = Dimensions.get('window').height

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
        else if (userEmail === "" || password === "" || confirmPassword === "") {
            setErrortext("Please Fill All Fields")
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
            <View>
                <KeyboardAvoidingView enabled>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../Image/bg.jpeg')}
                            style={{
                                width: WIDTH,
                                height: HEIGHT / 3,
                                resizeMode: 'stretch',
                                // marginBottom: 30,
                                borderBottomLeftRadius: HEIGHT / 40,
                                borderBottomRightRadius: HEIGHT / 40,
                                overflow: 'hidden'
                            }}

                        />
                    </View>
                    <ScrollView enabled>
                        <View style={{ marginTop: 30, height: HEIGHT }}>

                            <Text style={{ color: 'red', fontSize: 16, marginLeft: 40 }}>Email:</Text>
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

                            <Text style={{ color: 'red', fontSize: 16, marginLeft: 40 }}>Password:</Text>
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

                            <Text style={{ color: 'red', fontSize: 16, marginLeft: 40 }}>Confirm Password:</Text>
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

                            <TouchableOpacity
                                style={{ marginLeft: 250, marginTop: -10 }}
                                activeOpacity={0.3}
                                onPress={() => { navigation.navigate('LoginScreen') }}
                            >
                                <Text style={{ color: 'red', textDecorationLine: 'underline', marginBottom: 50 }}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </KeyboardAvoidingView>
            </View>

        </View >
    );
};
export default ForgetPasswordScreen

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignContent: 'center',
    },

    SectionStyle: {
        flexDirection: 'row',
        height: 50,
        marginBottom: 15,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 10,
        backgroundColor: '#E41B1730'

    },

    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E41B17',
        fontSize: 16,
    },
    buttonStyle: {
        backgroundColor: '#E41B17',
        borderWidth: 0,
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        marginBottom: 25,
        shadowColor: '#E41B17',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonTextStyle: {
        color: '#ffffff',
        paddingVertical: 12,
        fontSize: 20,
        fontWeight: 'bold',
    },

    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
