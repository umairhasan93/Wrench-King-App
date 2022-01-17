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

const BookingScreen = ({ navigation, route }) => {

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

    const { name, number, address, rating, speciality } = route.params;
    const [calenderModalVisible, setCalenderModalVisible] = useState(false);

    const Companies = ["Daihatsu", "Faw", "Honda", "Hyundai", "Kia", "Nissan", "Suzuki", "Toyota"]
    const Years = ["1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"]
    const Daihatsu = ["Move", "Mira", "Hijet", "Cuore", "Terios Kid"]
    const Faw = ["Carrier Plus", "V2"]
    const Honda = ["Civic", "Accord", "City", "BR-V", "Vezel", "Fit"]
    const Hyundai = ["Santro", "Sonata", "Elantra"]
    const Kia = ["Pride", "Picanto", "Sportage", "Carnival", "Spectra"]
    const Nissan = ["Tidda", "Clipper", "Days", "Sunny"]
    const Suzuki = ["Mehran", "Khyber", "Wagon-R", "Alto", "Bolan", "Cultus", "Swift", "Ciaz", "Margala", "Baleno", "Liana"]
    const Toyota = ["Corolla", "Camry", "Passo", "Vitz", "Prius", "Aqua", "Hilux", "Prado", "Yaris", "Land Cruiser", "Surf", "Premio"]

    const [selectedCompany, setSelectedCompany] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [selectedModel, setSelectedModel] = useState();
    const [date, setDate] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [requestedDate, setRequestedDate] = useState();

    const onDateChange = (date) => {
        setSelectedDate(date);
        setDate(moment(selectedDate).format("DD - MMM - YYYY"))
        setCalenderModalVisible(!calenderModalVisible)
    }

    const Model = () => {

        if (selectedCompany === "Daihatsu") {
            return (
                Daihatsu.map((daihatsu, index) => {
                    return (
                        <Picker.Item label={daihatsu} value={daihatsu} key={index} />
                    )
                })
            )
        }
        else if (selectedCompany === "Faw") {
            return (
                Faw.map((faw, index) => {
                    return (
                        <Picker.Item label={faw} value={faw} key={index} />
                    )
                })
            )
        }

        else if (selectedCompany === "Honda") {
            return (
                Honda.map((honda, index) => {
                    return (
                        <Picker.Item label={honda} value={honda} key={index} />
                    )
                })
            )
        }

        else if (selectedCompany === "Hyundai") {
            return (
                Hyundai.map((hyundai, index) => {
                    return (
                        <Picker.Item label={hyundai} value={hyundai} key={index} />
                    )
                })
            )
        }

        else if (selectedCompany === "Kia") {
            return (
                Kia.map((kia, index) => {
                    return (
                        <Picker.Item label={kia} value={kia} key={index} />
                    )
                })
            )
        }

        else if (selectedCompany === "Nissan") {
            return (
                Nissan.map((nissan, index) => {
                    return (
                        <Picker.Item label={nissan} value={nissan} key={index} />
                    )
                })
            )
        }

        else if (selectedCompany === "Suzuki") {
            return (
                Suzuki.map((suzuki, index) => {
                    return (
                        <Picker.Item label={suzuki} value={suzuki} key={index} />
                    )
                })
            )
        }

        else if (selectedCompany === "Toyota") {
            return (
                Toyota.map((toyota, index) => {
                    return (
                        <Picker.Item label={toyota} value={toyota} key={index} />
                    )
                })
            )
        }
    }

    const onSubmit = () => {

        setRequestedDate(moment(now).format("DD - MMM - YYYY"))

        if (selectedCompany === undefined || selectedModel === undefined || selectedYear === undefined || selectedDate === undefined) {
            showToastWithGravity()

        }
        else {
            console.log(requestedDate);

            navigation.navigate('BookingDetails', {
                mechanicname: name,
                mechanicnumber: number,
                mechanicaddress: address,
                mechanicspeciality: speciality,
                username: user.name,
                usernumber: user.contact,
                useremail: user.email,
                carcompany: selectedCompany,
                year: selectedYear,
                model: selectedModel,
                bookingdate: date,

            })

            const data = {
                User_Name: user.name,
                User_Number: user.contact,
                User_Email: user.email,
                Car_Company: selectedCompany,
                Model: selectedModel,
                Model_Year: selectedYear,
                Mechanic_Name: name,
                Mechanic_Number: number,
                Mechanic_Address: address,
                Mechanic_Speciality: speciality,
                Booking_Date: date,
                Requested_Date: requestedDate,
            };

            fetch('http://192.168.100.15:5000/api/booking/booking', {
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
                shadowColor: '#E41B17',
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
                <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate('CarMechanicScreen')}>
                    <Icon style={styles.backIcon} name="chevron-left" size={24} color="white" />
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



                <View style={{ height: 470 }}>

                    <KeyboardAvoidingView enabled>

                        <Card style={styles.userCard}>

                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <Text style={styles.carDetailsText}>Car Details</Text>

                            </View>
                            <View style={styles.dropdownContainer}>
                                <Picker
                                    selectedValue={selectedCompany}
                                    onValueChange={(itemValue) =>
                                        setSelectedCompany(itemValue)
                                    }

                                    style={{
                                        width: 290,

                                        borderWidth: 3,
                                        borderColor: "#666",
                                        marginLeft: 5
                                    }}

                                >

                                    <Picker.Item value={"Select Company"} label="Selecy Company" />
                                    {
                                        Companies.map((company, index) => {
                                            return (
                                                <Picker.Item label={company} value={company} key={index} />
                                            )


                                        })
                                    }
                                </Picker>
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
                                    <Picker.Item value={"Select Model"} label="Select Model" />
                                    {
                                        Model(selectedCompany)
                                    }
                                </Picker>

                            </View>

                            <View style={styles.dropdownContainer}>
                                <Picker
                                    selectedValue={selectedYear}
                                    onValueChange={(itemValue) =>
                                        setSelectedYear(itemValue)
                                    }
                                    style={{
                                        width: 290,
                                        borderWidth: 3,
                                        borderColor: "#666",
                                        marginLeft: 5,

                                    }}>
                                    <Picker.Item value={"Select Year"} label="Select Year" />
                                    {
                                        Years.map((year, index) => {
                                            return (
                                                <Picker.Item label={year} value={year} key={index} />
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
                        <View style={{ alignItems: 'center', marginTop: -20 }}>
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
        shadowColor: '#E41B17',
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
        color: 'red'

    },

    dropdownContainer: {
        backgroundColor: '#E41B1730',
        borderRadius: 10,
        width: 300,
        height: 45,
        marginTop: 20,
        justifyContent: 'center',
    },

    calenderContainer: {
        flexDirection: 'row',
        backgroundColor: '#E41B1730',
        borderRadius: 10,
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
        backgroundColor: '#E41B17',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 40,
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


export default BookingScreen