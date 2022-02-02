import React, { useState } from 'react';
import { Keyboard, SafeAreaView, View, TextInput, Text, TouchableOpacity, StyleSheet, ToastAndroid, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const OTPScreen = ({ navigation, route }) => {

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            "Number Verified. Registered Succesfully!",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const { fname, lname, email, number, username, password, requestedid } = route.params
    const [otp, setOTP] = useState('')

    const rid = JSON.parse(requestedid)
    console.log(rid);
    const onSubmit = () => {
        const data = {
            firstname: fname,
            lastname: lname,
            email: email,
            contact: number,
            username: username,
            password: password,
            REQUEST_ID: rid,
            CODE: otp

        };

        fetch('http://192.168.100.15:5000/api/user/register', {
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
                // console.log(JSON.stringify(responseJson));
                setRequestedID(JSON.stringify(responseJson))

                setLoading(false);
            })

    }


    return (
        <SafeAreaView>
            <View style={{ height: HEIGHT, justifyContent: 'center' }} >
                <View style={{ height: HEIGHT / 1.5 }}>
                    <Text style={{ fontSize: 18, alignSelf: 'center', width: WIDTH / 1.5 }}> Please Enter The OTP No. Send </Text>
                    <Text style={{ fontSize: 18, alignSelf: 'center', width: WIDTH / 1.5, marginLeft: WIDTH / 6 }}>on Your Mobile Number</Text>
                    <View style={{ marginTop: WIDTH / 6 }}>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(otp) => {
                                    setOTP(otp)

                                }}
                                placeholderTextColor="black"
                                keyboardType="default"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.buttonStyle}
                            onPress={onSubmit}
                        >

                            <Text style={styles.buttonTextStyle}>Send</Text>
                        </TouchableOpacity>

                        <Text onPress={() => { navigation.navigate('RegisterScreen') }}> Back</Text>
                    </View>
                </View>
            </View>

        </SafeAreaView >
    )


}

const styles = StyleSheet.create({

    SectionStyle: {
        height: 50,
        marginBottom: 10,
        marginLeft: 35,
        marginRight: 35,
        backgroundColor: '#E41B1730',
        borderRadius: 10,
        marginTop: 20,
        borderColor: 'red',
        borderWidth: 1

    },

    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: WIDTH / 20,
        paddingRight: WIDTH / 20,
        borderRadius: 10,
        fontSize: 20,
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
        borderColor: 'red',
        borderWidth: 1,
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

})

export default OTPScreen