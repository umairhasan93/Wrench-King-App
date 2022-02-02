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
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

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
    const [requestedDate, setRequestedDate] = useState();

    const onDateChange = (date) => {
        setSelectedDate(date);
        setDate(moment(selectedDate).format("DD - MMM - YYYY"))
        setCalenderModalVisible(!calenderModalVisible)
    }



    const onSubmit = () => {

        setRequestedDate(moment(now).format("DD - MMM - YYYY"))

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

            const data = {
                User_Name: user.name,
                User_Number: user.contact,
                User_Email: user.email,
                Car_Company: 'none',
                Model: selectedModel,
                Model_Year: 'none',
                Mechanic_Name: name,
                Mechanic_Number: number,
                Mechanic_Address: address,
                Mechanic_Speciality: speciality,
                Booking_Date: date,
                Requested_Date: requestedDate,
                Type: 'none',
                Status: 'Pending'
            };

            let url = `${API}booking/booking`
            console.log(url)
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

                })
                .catch((error) => {
                    console.error(error);
                });
            setSelectedModel('Select Model')
            setSelectedDate('')

        }

    }


    return (
        <SafeAreaView>

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
                    navigation.navigate('BikeMechanicScreen')
                    setSelectedModel('Select Model')
                    setSelectedDate('')
                }}>
                    <Icon style={styles.backIcon} name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView >
                <View style={{ height: HEIGHT }}>
                    <MechanicDeatils
                        mechanicName={name}
                        mechanicNumber={number}
                        mechanicAddress={address}
                        mechanicRating={rating}
                        mechanicType={type}
                    />



                    <View style={{ paddingBottom: 20 }}>

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
                                            marginLeft: 5,
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


                                <TouchableOpacity style={styles.calenderContainer} activeOpacity={0.7} onPress={() => setCalenderModalVisible(!calenderModalVisible)}>
                                    <View style={{ width: 250, justifyContent: 'center' }}>
                                        <Text style={styles.calenderText}>{selectedDate ? date : 'Select Date'}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', width: 50 }}>
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

                        </KeyboardAvoidingView>

                    </View>

                    <View style={{ alignSelf: 'center', alignItems: 'center', bottom: 35, position: 'absolute' }}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            activeOpacity={0.7}
                            onPress={onSubmit}

                        >
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
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
        color: 'white'
    },

    backIcon: {
        marginLeft: 90,
        marginTop: 7
    },

    userCard: {
        width: WIDTH - 30,
        marginTop: 10,
        marginLeft: WIDTH / 25,
        borderRadius: 20,
        paddingBottom: 25,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 10,
    },

    carDetailsText: {
        fontSize: 24,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: '#E41B17'

    },

    dropdownContainer: {
        backgroundColor: '#E41B1730',
        borderRadius: 10,
        width: WIDTH - 83,
        height: 45,
        marginTop: 20,
        justifyContent: 'center',
    },

    calenderContainer: {
        flexDirection: 'row',
        backgroundColor: '#E41B1730',
        borderRadius: 10,
        width: WIDTH - 83,
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
        backgroundColor: '#E41B17',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',

    },

})


export default BikeBookingScreen