import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    Dimensions
} from 'react-native';

import Loader from './Components/loader';

const RegisterScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);

    const WIDTH = Dimensions.get('window').width
    const HEIGHT = Dimensions.get('window').height

    const lastnameInputRef = createRef();
    const emailInputRef = createRef();
    const contactInputRef = createRef();
    const usernameInputRef = createRef();
    const passwordInputRef = createRef();
    const confirmpasswordInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!firstName) {
            alert('Please fill First Name');
            return;
        }
        if (!lastName) {
            alert('Please fill Last Name');
            return;
        }
        if (!email) {
            alert('Please fill Email');
            return;
        }
        if (!contactNo) {
            alert('Please fill Contact Number');
            return;
        }

        if (!userName) {
            alert('Please fill UserName');
            return;
        }

        if (!password) {
            alert('Please fill Password');
            return;
        }

        if (!confirmPassword) {
            alert('Password do not match');
            return;
        }
        if (password !== confirmPassword) {

        }
        //Show Loader
        setLoading(true);
        const data = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            contact: contactNo,
            username: userName,
            password: password,
            confirmpassword: confirmPassword,
        };

        fetch('http://localhost:5000/api/user/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                //Header Defination
                'Content-Type':
                    'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                setSuccess(true)
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status === 'success') {
                    setIsRegistraionSuccess(true);
                    alert(
                        'Registration Successful. Please Login to proceed'
                    );
                } else {
                    setErrortext(responseJson.msg);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };
    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../Image/success.png')}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />
                <Text style={styles.successTextStyle}>
                    Registration Successful
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    alignContent: 'center',
                }}>
                <View style={{ alignItems: 'center' }}>
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
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(FirstName) => setFirstName(FirstName)}
                            underlineColorAndroid="#f000"
                            placeholder="First Name"
                            placeholderTextColor="black"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                lastnameInputRef.current && lastnameInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(LastName) => setLastName(LastName)}
                            underlineColorAndroid="#f000"
                            placeholder="Last Name"
                            placeholderTextColor="black"
                            autoCapitalize="sentences"
                            ref={lastnameInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                emailInputRef.current && emailInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(Email) => setEmail(Email)}
                            underlineColorAndroid="#f000"
                            placeholder="Email"
                            placeholderTextColor="black"
                            keyboardType="email-address"
                            ref={emailInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                contactInputRef.current &&
                                contactInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(Contact) => setContactNo(Contact)}
                            underlineColorAndroid="#f000"
                            placeholder="Contact No"
                            placeholderTextColor="black"
                            keyboardType="email-address"
                            ref={contactInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                usernameInputRef.current &&
                                usernameInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setUserName(UserName)}
                            underlineColorAndroid="#f000"
                            placeholder="Username"
                            placeholderTextColor="black"
                            keyboardType="text"
                            ref={usernameInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(Password) =>
                                setPassword(Password)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Password"
                            placeholderTextColor="black"
                            ref={passwordInputRef}
                            returnKeyType="next"
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                                confirmpasswordInputRef.current &&
                                confirmpasswordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(ConfirmPassword) => setConfirmPassword(ConfirmPassword)}
                            underlineColorAndroid="#f000"
                            placeholder="Confirm Password"
                            placeholderTextColor="black"
                            keyboardType="text"
                            ref={confirmpasswordInputRef}
                            blurOnSubmit={false}
                        />
                    </View>

                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -5, marginBottom: 10 }}>
                        <Text
                            style={styles.textStyle}>
                            Already a User ?
                        </Text >
                        <Text
                            style={styles.loginTextStyle}
                            onPress={() => navigation.navigate('LoginScreen')}>
                            Login
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 50,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        backgroundColor: '#E41B1730',
        borderRadius: 10
    },
    buttonStyle: {
        backgroundColor: '#E41B17',
        borderWidth: 0,
        borderColor: '#E41B17',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
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
        color: '#ffffff',
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 10,
        borderColor: '#E41B17',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },

    textStyle: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },

    loginTextStyle: {
        textDecorationLine: 'underline',
        color: '#E41B17',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
        padding: 10,
        marginLeft: -5,
        marginTop: -3
    },
});