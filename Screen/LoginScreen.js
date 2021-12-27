import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-community/async-storage';

import Loader from './Components/loader';

const LoginScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('umairhasan93');
    const [password, setPassword] = useState('1234');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const passwordInputRef = createRef();

    const loginAdmin = (details) => {
        console.log(details.firstname);
        AsyncStorage.setItem("@user_id", JSON.stringify(details));
        console.log(details);
        navigation.replace('DrawerNavigationRoutes');

    };

    const AlertMessage = (msg) => {
        Alert.alert(
            'Alert Title',
            msg,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }
    const handleSubmitPress = () => {
        setErrortext('');
        if (!userName) {
            setUserNameError("Usernames is required")
            // alert('Please fill Email');
            return;
        }
        if (!password) {
            setPasswordError('Password is required');
            // alert('Please fill Password');
            return;
        }
        setLoading(true);

        fetch('http://192.168.100.15:5000/api/user/login', {
            method: 'POST',
            headers: {
                //Header Defination
                'Content-Type':
                    'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify({ username: userName, password: password })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.role === 'user') {
                    if (!(responseJson.code < 200 || responseJson.code >= 400)) {
                        loginAdmin(responseJson);
                        console.log("World")
                        Alert.alert("World")
                    }
                    else {
                        // AlertMessage(responseJson.msg)
                        console.log("hello")
                        Alert.alert("hello")

                    }
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
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
                                onChangeText={(UserName) => {
                                    setUserNameError("")
                                    setUserName(UserName)
                                }}
                                placeholder="Username" //dummy@abc.com
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="default"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        {userNameError !== '' ? (
                            <Text style={styles.errorTextStyle}>{userNameError}</Text>
                        ) : null}
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(Password) => {
                                    setPasswordError("")
                                    setPassword(Password)

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
                        {passwordError != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {passwordError}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text style={styles.buttonTextStyle}>LOGIN</Text>
                        </TouchableOpacity>
                        <View>
                            <Text
                                style={styles.forgotPasswordStyle}
                                onPress={() => navigation.navigate('ForgetPasswordScreen')}>
                                Forgot Password?
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text
                                style={styles.textStyle}>
                                Create an Account ?
                            </Text >
                            <Text
                                style={styles.signupTextStyle}
                                onPress={() => navigation.navigate('RegisterScreen')}>
                                SignUp
                            </Text>
                        </View>

                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default LoginScreen;

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