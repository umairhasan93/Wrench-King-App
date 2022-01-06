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
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CalendarPicker from 'react-native-calendar-picker';
import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const now = new Date();
// const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const week = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6);

const UserCarDetails = () => {

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

    const [oilChange, setOilChange] = useState(false);
    const [batteryCheck, setBatteryCheck] = useState(false);
    const [changeAirFilter, setChangeAirFilter] = useState(false);
    const [checkGearOil, setCheckGearOil] = useState(false);
    const [brake, setBrake] = useState(false);
    const [changeOilFilter, setChangeOilFilter] = useState(false);

    const [oilService, setOilService] = useState()
    const [batteryService, setBatteryService] = useState()
    const [airFilterService, setAirFilterService] = useState()
    const [gearOilService, setGearOilService] = useState()
    const [brakeService, setBrakeService] = useState()
    const [oilFilterService, setOilFilterService] = useState()

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

    return (
        <View style={{ height: 655 }}>
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
                            numberOfLines={6}
                        >

                            <Picker.Item value={"Select Company"} label="Select Company" />
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
                            selectedValue={selectedYear}
                            onValueChange={(itemValue) =>
                                setSelectedYear(itemValue)
                            }
                            style={{
                                width: 290,
                                borderWidth: 3,
                                borderColor: "#666",
                                marginLeft: 5
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


                    {/* const Services1 = ["Oil Change", "Battery Check", "Change Air-Filter"]
                    const Services2 = ["Check Gear-Oil", "Brake Service", "Change Oil-Filter"] */}
                    <View style={{ marginTop: 20 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.carDetailsText}>Select Services</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row' }}
                                        avtiveOpacity={0.1}
                                        onPress={() => {
                                            setOilChange(!oilChange)
                                            console.log(oilService);
                                            if (oilChange === true) {
                                                setOilService("Oil Change")
                                            } else {
                                                setOilService("")
                                            }
                                        }}
                                    >
                                        <CheckBox
                                            value={oilChange}
                                            onChange={() => {
                                                setOilChange(!oilChange)
                                                console.log(oilService);
                                                if (oilChange === true) {
                                                    setOilService("Oil Change")
                                                } else {
                                                    setOilService("")
                                                }
                                            }}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: 4.5, fontSize: 16 }}>Oil Change</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginLeft: 41 }}>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row' }}
                                        avtiveOpacity={0.1}
                                        onPress={() => {
                                            setBatteryCheck(!batteryCheck)
                                            console.log(batteryService)
                                            if (batteryCheck === true) {
                                                setBatteryService("Battery Check")
                                            } else {
                                                setBatteryService("")
                                            }
                                        }}
                                    >
                                        <CheckBox
                                            value={batteryCheck}
                                            onChange={() => {
                                                setBatteryCheck(!batteryCheck)
                                                console.log(batteryService)
                                                if (batteryCheck === true) {
                                                    setBatteryService("Battery Check")
                                                } else {
                                                    setBatteryService("")
                                                }
                                            }}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: 4.5, fontSize: 16 }}>Battery Check</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row' }}
                                        avtiveOpacity={0.1}
                                        onPress={() => {
                                            setChangeAirFilter(!changeAirFilter)
                                            console.log(airFilterService);
                                            if (changeAirFilter === true) {
                                                setAirFilterService("Change Air Filter")
                                            } else {
                                                setAirFilterService("")
                                            }
                                        }}
                                    >
                                        <CheckBox
                                            value={changeAirFilter}
                                            onChange={() => {
                                                setChangeAirFilter(!changeAirFilter)
                                                console.log(airFilterService);
                                                if (changeAirFilter === true) {
                                                    setAirFilterService("Change Air Filter")
                                                } else {
                                                    setAirFilterService("")
                                                }
                                            }}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: 4.5, fontSize: 16 }}>Change Air Filter</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row' }}
                                        avtiveOpacity={0.1}
                                        onPress={() => {
                                            setCheckGearOil(!checkGearOil)
                                            console.log(gearOilService);
                                            if (checkGearOil === true) {
                                                setGearOilService("Check Gear Oil")
                                            } else {
                                                setGearOilService("")
                                            }
                                        }}
                                    >
                                        <CheckBox
                                            value={checkGearOil}
                                            onChange={() => {
                                                setCheckGearOil(!checkGearOil)
                                                console.log(gearOilService);
                                                if (checkGearOil === true) {
                                                    setGearOilService("Check Gear Oil")
                                                } else {
                                                    setGearOilService("")
                                                }
                                            }}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: 4.5, fontSize: 16 }}>Check Gear Oil</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ width: 155 }}>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row' }}
                                        avtiveOpacity={0.1}
                                        onPress={() => {
                                            setChangeOilFilter(!changeOilFilter)
                                            console.log(oilFilterService);
                                            if (changeOilFilter === true) {
                                                setOilFilterService("Change Oil Filter")
                                            } else {
                                                setOilFilterService("")
                                            }
                                        }}
                                    >
                                        <CheckBox
                                            value={changeOilFilter}
                                            onChange={() => {
                                                setChangeOilFilter(!changeOilFilter)
                                                console.log(oilFilterService);
                                                if (changeOilFilter === true) {
                                                    setOilFilterService("Change Oil Filter")
                                                } else {
                                                    setOilFilterService("")
                                                }
                                            }}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: 4.5, fontSize: 16 }}>Change Oil Filter</Text>
                                    </TouchableOpacity>
                                </View>
                                <View >
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row' }}
                                        avtiveOpacity={0.1}
                                        onPress={() => {
                                            setBrake(!brake)
                                            console.log(brakeService);
                                            if (brake === true) {
                                                setBrakeService("Brake Service")
                                            } else {
                                                setBrakeService("")
                                            }
                                        }}
                                    >
                                        <CheckBox
                                            value={brake}
                                            onChange={() => {
                                                setBrake(!brake)
                                                console.log(brakeService);
                                                if (brake === true) {
                                                    setBrakeService("Brake Service")
                                                } else {
                                                    setBrakeService("")
                                                }
                                            }}
                                        />
                                        <Text style={{ marginLeft: 5, marginTop: 4.5, fontSize: 16 }}>Brake Service</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>



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
                    <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.4} onPress={() => { getSelectedServices() }}>
                        <Text style={styles.buttonText}>Book</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    userCard: {
        height: 510,
        width: WIDTH - 30,
        marginTop: 10,
        marginLeft: WIDTH / 25,
        borderRadius: 20,
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

    buttonContainer: {
        height: 50,
        width: WIDTH - 30,
        borderRadius: 50,
        backgroundColor: '#2AD60B',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 40,
    },

    buttonText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white',

    },

    selectServicesHeading: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 5,
        textDecorationLine: 'underline',
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

export default UserCarDetails