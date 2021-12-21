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
} from 'react-native';
import LoginScreen from './LoginScreen';

const ForgetPasswordScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        // setErrortext('');
        // if (!userEmail) {
        //     setEmailError("Email is required")
        //     // alert('Please fill Email');
        //     return;
        // }
        // if (!userPassword) {
        //     setPasswordError('Password is required');
        //     // alert('Please fill Password');
        //     return;
        // }
        // setLoading(true);
        // let dataToSend = { email: userEmail, password: userPassword };
        // let formBody = [];
        // for (let key in dataToSend) {
        //     let encodedKey = encodeURIComponent(key);
        //     let encodedValue = encodeURIComponent(dataToSend[key]);
        //     formBody.push(encodedKey + '=' + encodedValue);
        // }
        // formBody = formBody.join('&');

        // fetch('http://localhost:3000/api/user/login', {
        //     method: 'POST',
        //     body: formBody,
        //     headers: {
        //         //Header Defination
        //         'Content-Type':
        //             'application/x-www-form-urlencoded;charset=UTF-8',
        //     },
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         //Hide Loader
        //         setLoading(false);
        //         console.log(responseJson);
        //         // If server response message same as Data Matched
        //         if (responseJson.status === 'success') {
        //             AsyncStorage.setItem('user_id', responseJson.data.email);
        //             console.log(responseJson.data.email);
        //             navigation.replace('DrawerNavigationRoutes');
        //         } else {
        //             setErrortext(responseJson.msg);
        //             console.log('Please check your email id or password');
        //         }
        //     })
        //     .catch((error) => {
        //         //Hide Loader
        //         setLoading(false);
        //         console.error(error);
        //     });
        navigation.navigate(LoginScreen)
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
                                    width: '50%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 30,
                                }}
                            />
                        </View>
                        <View style={styles.SectionStyle}>

                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) => {
                                    setEmailError("")
                                    setUserEmail(UserEmail)
                                }}
                                placeholder="Password" //12345
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={passwordInputRef}
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
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserPassword) => {
                                    setPasswordError("")
                                    setUserPassword(UserPassword)

                                }}
                                placeholder="Confirm Password" //12345
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={passwordInputRef}
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
        justifyContent: 'center',
        backgroundColor: '#000000',
        alignContent: 'center',
    },

    SectionStyle: {
        flexDirection: 'row',
        height: 55,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        borderRadius: 30,
        borderRadius: 30,
    },

    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 1,
        borderRadius: 30,
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
