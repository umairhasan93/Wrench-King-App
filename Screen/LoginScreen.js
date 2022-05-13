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
    ToastAndroid,
    Dimensions,
    Modal
} from 'react-native';
import { Card } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/loader';
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
// console.log(API)
const LoginScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('umairhasan93');
    const [password, setPassword] = useState('12345');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState();
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');



    const passwordInputRef = createRef();

    const showErrorToastWithGravity = (error) => {
        ToastAndroid.showWithGravity(
            error,
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const loginAdmin = (details) => {
        AsyncStorage.setItem("user", JSON.stringify(details));
        console.log(details);
        navigation.navigate('DrawerNavigationRoutes', {
            pass: password
        });

    };


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

        let url = `${API}user/login`
        console.log(url)
        fetch(url, {
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

                // console.log(responseJson.message);
                showErrorToastWithGravity(responseJson.message)
                // If server response message same as Data Matched
                if (responseJson.role === 'user') {
                    if (!(responseJson.code < 200 || responseJson.code >= 400)) {
                        loginAdmin(responseJson);

                        Alert.alert("Welcomne", responseJson.name)

                    }
                    else {

                        // AlertMessage(responseJson.msg)
                        // Alert.alert("Oops!", responseJson.err)

                    }
                }
            })
            .catch((error) => {
                //Hide Loader
                setErrortext(error)
                setLoading(false);
                // showErrorToastWithGravityerror(error)
                // console.error(error);
            });
    };

    return (
        <View style={styles.mainBody}>

            <Loader loading={loading} />
            <ScrollView

                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    alignContent: 'center',

                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View>
                            {/* <Text>Hello</Text> */}
                            <Image
                                source={require('../Image/bg.jpeg')}
                                style={{
                                    width: WIDTH,
                                    height: HEIGHT / 2.5,
                                    resizeMode: 'stretch',
                                    marginBottom: 30,
                                    borderBottomLeftRadius: HEIGHT / 40,
                                    borderBottomRightRadius: HEIGHT / 40,
                                    overflow: 'hidden'
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
                                placeholderTextColor="black"
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
                                placeholderTextColor="black"
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
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
    },

    SectionStyle: {
        flexDirection: 'row',
        height: 50,
        marginBottom: 10,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
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
        marginTop: 20,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonTextStyle: {
        color: 'white',
        paddingVertical: 12,
        fontSize: 20,
        fontWeight: 'bold',
    },

    textStyle: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },

    forgotPasswordStyle: {
        textDecorationLine: 'underline',
        color: '#E41B17',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    signupTextStyle: {
        textDecorationLine: 'underline',
        color: '#E41B17',
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