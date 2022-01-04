import React, { useState } from 'react';
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
    SafeAreaView,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-community/async-storage';

const ProfileScreen = ({ navigation }) => {

    const [
        profileModalVisible,
        setProfileModalVisible,
    ] = useState(true);

    return (
        <SafeAreaView>
            <View style={styles.profilecenteredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={profileModalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has Been Closed.');
                        navigation.navigate('HomeScreen')
                    }}>
                    <View style={styles.profilecenteredView}>
                        <View style={styles.profilemodalView}>
                            <View style={{ flexDirection: 'row', marginTop: 15, width: 355 }}>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('HomeScreen')
                                            setProfileModalVisible(profileModalVisible)
                                        }}>
                                        <Icon
                                            style={styles.cancelIcon}
                                            name="times"
                                            size={18}
                                            color="red"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{ alignItems: "center", width: 340 }}>
                                    <Text style={styles.profilemodalHeadingText}>
                                        Profile
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>

        </SafeAreaView >
    )

}

const styles = StyleSheet.create({
    profilecenteredView: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },

    profilemodalView: {
        backgroundColor: '#ffffff',
        paddingBottom: 20,
        height: 950,
        marginTop: 300,
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },

    profilemodalHeadingText: {
        marginLeft: -20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },

    profilecontainerStyle: {
        flexDirection: 'row',
        backgroundColor: '#69696990',
        height: 65,
        width: 370,
        borderRadius: 30,
        marginTop: 10,
    },

    cancelIcon: {
        marginTop: 5,
    },

    profileinput: {
        flex: 1,
        height: 55,
        width: 215,
        margin: 15,
        fontSize: 14,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 4,
        alignSelf: 'center',
        backgroundColor: '#80808000',
        color: '#ffffff',
    },
})

export default ProfileScreen;