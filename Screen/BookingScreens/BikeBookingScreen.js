import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Dimensions,
    ToastAndroid,
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CalendarPicker from 'react-native-calendar-picker';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import MenuButton from '../Components/NavigationDrawerHeader'
// import Header from './Header'
import MechanicDeatils from "./MechanicDetailCard"
import AsyncStorage from '@react-native-community/async-storage'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const now = new Date();
// const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const week = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6);

const BikeBookingScreen = ({ navigation, route }) => {

    const [user, setUser] = useState([])
    AsyncStorage.getItem('user').then(data => {
        setUser(JSON.parse(data))

    })

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            "Please Select Car Details",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };

    const { name, number, address, rating, speciality, type } = route.params;
    const [calenderModalVisible, setCalenderModalVisible] = useState(false);

    const Model = ["50cc", "70cc", "100cc", "125cc", "YBR", "150cc", "200cc"]



    const [selectedModel, setSelectedModel] = useState();
    const [date, setDate] = useState();
    const [selectedDate, setSelectedDate] = useState();

    const onDateChange = (date) => {
        setSelectedDate(date);
        setDate(moment(selectedDate).format("DD - MMM - YYYY"))
        setCalenderModalVisible(!calenderModalVisible)
    }



    const onSubmit = () => {
        if (selectedModel === undefined || selectedDate === undefined) {
            showToastWithGravity()

        }
        else {
            navigation.navigate('BookingDetails', {
                mechanicname: name,
                mechanicnumber: number,
                mechanicaddress: address,
                mechanictype: type,
                username: user.name,
                usernumber: user.contact,
                useremail: user.email,
                model: selectedModel,
                bookingdate: date,

            })
        }

    }


    return (
        <SafeAreaView style={{ backgroundColor: '#D5F5E3' }}>

            <View style={{ flexDirection: 'row', backgroundColor: '#000000', height: 50, paddingTop: 6 }}>
                <MenuButton onPress={() => navigation.openDrawer()} />
                <Text style={styles.headerText}>Wrench King</Text>
                <TouchableOpacity onPress={() => {
                    setSelectedModel("Select Model")
                    setSelectedDate("")
                    navigation.navigate('BikeMechanicScreen')
                }}>
                    <Icon style={styles.backIcon} name="chevron-left" size={24} color="red" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <MechanicDeatils
                    mechanicName={name}
                    mechanicNumber={number}
                    mechanicAddress={address}
                    mechanicRating={rating}
                    mechanicSpeciality={speciality}
                />



                <View style={{ height: 340 }}>

                    <KeyboardAvoidingView enabled>

                        <Card style={styles.userCard}>

                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <Text style={styles.carDetailsText}>Bike Details</Text>

                            </View>


                            <View style={styles.dropdownContainer}>
                                <Picker
                                    selectedValue={selectedModel}
                                    onValueChange={(itemValue) =>
                                        setSelectedModel(itemValue)
                                    }
                                    style={{
                                        width: 290,
                                        borderWidth: 3,
                                        borderColor: "#666",
                                        marginLeft: 5
                                    }}>
                                    <Picker.Item value={"Select Bike"} label="Select Bike" />
                                    {
                                        Model.map((model, index) => {
                                            return (
                                                <Picker.Item label={model} value={model} key={index} />
                                            )


                                        })
                                    }
                                </Picker>

                            </View>


                            <TouchableOpacity style={styles.calenderContainer} activeOpacity={0.3} onPress={() => setCalenderModalVisible(!calenderModalVisible)}>
                                <View style={{ width: 250, justifyContent: 'center' }}>
                                    <Text style={styles.calenderText}>{selectedDate ? date : 'Select Date'}</Text>
                                </View>
                                <View style={{ width: 50, justifyContent: 'center' }}>
                                    <Icon
                                        name="sort-down"
                                        size={16}
                                        style={{
                                            marginTop: -5,
                                            marginLeft: 16.5
                                        }}
                                    />
                                </View>

                            </TouchableOpacity>

                        </Card>
                        <View style={styles.centeredView}>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={calenderModalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has Been Closed.');
                                    setCalenderModalVisible(!calenderModalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <View
                                            style={{
                                                marginLeft: 13,
                                                marginTop: -50,
                                                marginBottom: 30,
                                                alignItems: 'center',
                                            }}>

                                            <Text style={{ fontSize: 24, color: 'green', marginTop: 25, marginBottom: -10 }}>Calender</Text>
                                            <Text>_________________________________________________</Text>
                                        </View>

                                        <View style={{ marginLeft: 20 }}>
                                            <CalendarPicker
                                                width={350}
                                                startFromMonday={true}
                                                allowRangeSelection={false}
                                                onDateChange={onDateChange}
                                                minDate={now}
                                                maxDate={week}
                                            />
                                        </View>
                                        <View style={{ marginBottom: -15, marginLeft: 260 }}>
                                            <TouchableOpacity onPress={() => setCalenderModalVisible(!calenderModalVisible)}>
                                                <Text style={{ color: '#2AB06F', fontSize: 18 }}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                activeOpacity={0.4}
                                onPress={onSubmit}

                            >
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>

            </ScrollView >
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({

    headerText: {
        fontSize: 24,
        alignItems: "center",
        marginLeft: 60,
        marginTop: 2,
        color: 'red'
    },

    backIcon: {
        marginLeft: 100,
        marginTop: 7
    },

    userCard: {
        width: WIDTH - 30,
        marginTop: 10,
        marginLeft: WIDTH / 25,
        borderRadius: 20,
        paddingBottom: 25,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },

    SectionStyle: {
        flexDirection: 'row',
        height: 45,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
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

    carDetailsText: {
        fontSize: 22,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: 'dodgerblue'

    },

    dropdownContainer: {
        backgroundColor: 'lavender',
        borderRadius: 50,
        width: 300,
        height: 45,
        marginTop: 20,
        justifyContent: 'center',
    },

    calenderContainer: {
        flexDirection: 'row',
        backgroundColor: 'lavender',
        borderRadius: 50,
        width: 300,
        height: 45,
        marginTop: 20,

    },

    calenderText: {
        fontSize: 17,
        color: 'black',
        marginLeft: 20.5,
        marginTop: -2
    },

    dropdowntext: {
        flex: 1,
        height: 45,
        width: 200,
        marginLeft: 20,
        fontSize: 17,
        alignSelf: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'lavender',
    },

    centeredView: {
        backgroundColor: '#00000090',
        flex: 1,
        justifyContent: 'center',

    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingRight: 20.5,
        height: 430,
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
    },

    selectServicesHeading: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 5,
        textDecorationLine: 'underline',
    },

    buttonContainer: {
        height: 50,
        width: WIDTH - 30,
        borderRadius: 50,
        backgroundColor: '#2AD60B',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 40,
    },

    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',

    },

    servicesCard: {
        width: 290,
        height: 140,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: 'lavender',
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default BikeBookingScreen