import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Linking,
    Dimensions,
    Alert,
    KeyboardAvoidingView,
    Keyboard,
    ToastAndroid,
    TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import MenuButton from '../Components/NavigationDrawerHeader'
import { useNavigation } from '@react-navigation/native';
import { set } from 'react-native-reanimated';
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const MultilineTextInput = (props) => {
    return (
        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            maxLength={309}
        />
    );
}

const DismissKeyboard = ({ children }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    )

}

const Complain = ({ navigation, route }) => {
    const [showBox, setShowBox] = useState(true);
    const { username, useremail } = route.params
    const [complain, setComplain] = useState('')

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            "No Complaint to Submit",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };

    const showConfirmDialog = (Description) => {
        return Alert.alert(
            "Permission",
            "Do You want To Send Email As Well?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        setShowBox(false);
                        Linking.openURL('mailto:AutoRepair.WrenchKing@gmail.com?subject=Complaint&body=' + complain)
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };

    const onSubmit = () => {
        if (complain === '') {
            showToastWithGravity()
        }

        else {
            const data = {
                UserName: username,
                UserEmail: useremail,
                Complain: complain
            }
            let url = `${API}complain/launchComplain`
            fetch(url, {
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

                    console.log(responseJson);
                    setComplain('')

                })
                .catch((error) => {
                    console.error(error);
                });
            showConfirmDialog(complain)

        }

    }



    return (
        <SafeAreaView keyboardShouldPersistTaps='handled'>

            <View style={{
                flexDirection: 'row',
                backgroundColor: '#E41B17',
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 20,
                height: 50,
                paddingTop: 6,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 10,
                shadowRadius: 10,
                elevation: 10,
            }}>
                <MenuButton onPress={() => navigation.openDrawer()} />
                {/* <Image source= {require('')}/> */}
                <Text style={styles.headerText}>Wrench King</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                    navigation.navigate('HomeScreen')
                    setComplain('')

                }}>
                    <Icon style={styles.backIcon} name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <DismissKeyboard>
                <KeyboardAvoidingView enabled>
                    <View style={{ height: HEIGHT }}>
                        <View style={styles.SectionStyle}>

                            <MultilineTextInput
                                multiline
                                numberOfLines={4}
                                placeholder="Write Your Complain"
                                onChangeText={text => setComplain(text)}
                                value={complain}
                                style={styles.inputStyle}
                            />

                        </View>

                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={onSubmit}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </DismissKeyboard>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    headerText: {
        fontSize: 24,
        alignItems: "center",
        marginLeft: 60,
        marginTop: 2,
        color: 'white'
    },

    backIcon: {
        marginLeft: 90,
        marginTop: 7
    },

    SectionStyle: {
        height: HEIGHT / 3.3,
        width: WIDTH - 33,
        marginBottom: 10,
        marginTop: HEIGHT / 20,
        marginLeft: WIDTH / 23,
        borderRadius: 10,
        backgroundColor: '#E41B1730',
    },

    inputStyle: {
        flex: 1,
        height: HEIGHT / 3.3,
        color: 'black',
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E41B17',
        fontSize: 19,
        textAlignVertical: "top",
        lineHeight: 23
    },

    buttonContainer: {
        width: WIDTH - 33,
        height: 50,
        marginLeft: WIDTH / 23,
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',
        bottom: WIDTH / 4.5
    },

    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

})

export default Complain
