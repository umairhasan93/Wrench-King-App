import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Button,
    Dimensions,

} from 'react-native';
import { Card } from 'react-native-paper';
import MenuButton from '../Components/NavigationDrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ModalPickerMade, ModalPickerYear } from '../Components/ModalPicker'
import { Datepicker, Icons, Layout, ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva';
// import { CheckBox } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox'

const TunningService1Data = require('./TunningService1.json')

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const useDatepickerState = (initialDate = null) => {
    const [date, setDate] = useState(initialDate);
    return { date, onSelect: setDate };
};

const now = new Date();
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);


const BookingScreen = ({ navigation, route }) => {
    const { name, number, address, rating } = route.params;
    const [defaultRating, setDefaultRating] = useState(rating)
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])
    const [made, setMade] = useState('Made');
    const [year, setYear] = useState('Year');
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isYearModalVisible, setIsYearModalVisible] = useState(false)
    const [check, setCheck] = useState(false)

    const [data1, setData1] = useState(TunningService1Data)

    const [selectedServices, setSelectedServices] = useState([])

    const onChecked = (id) => {
        console.log('Pressed', id)
        const data = data1
        const index = data.findIndex(x => x.id === id)
        data[index].checked = !data[index].checked
        setData1(data)
    }

    const services = () => {
        const service1 = data1.map((item, index) => {
            return (
                <TouchableOpacity key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: -10, marginLeft: -19 }} onPress={() => { onChecked(item.id) }}>
                    <CheckBox style={{ marginLeft: 30 }} value={item.checked} onValueChange={() => { onChecked(item.id) }} />
                    <Text style={{ marginLeft: 5 }}>{item.key}</Text>
                </TouchableOpacity>
            )
        })
        return service1

    }

    const getSelectedServices = () => {
        var keys = data1.map((t) => { t.key })
        var checks = data1.map((t) => { t.checked })
        let Selected = []
        for (let i = 0; i < checks.length; i++) {
            if (checks[i] === true) {
                setSelectedServices(keys[i])
            }
        }
        alert(selectedServices)
    }

    const minMaxPickerState = useDatepickerState();

    const changeModalVisibility = (bool) => {
        setIsModalVisible(bool)
    }

    const changeYearModalVisibility = (bool) => {
        setIsYearModalVisible(bool)
    }

    const setMake = (option) => {
        setMade(option)
    }

    const setYearr = (option) => {
        setYear(option)
    }

    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'

    return (
        <SafeAreaView style={{ backgroundColor: 'lavender' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#000000', height: 50, paddingTop: 6 }}>
                <MenuButton onPress={() => navigation.openDrawer()} />
                {/* <Image source= {require('')}/> */}
                <Text style={styles.headerText}>Wrench King</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CarMechanicScreen')}>
                    <Icon style={styles.backIcon} name="chevron-left" size={24} color="red" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View>
                    <Card style={styles.detailCard}>
                        <View>
                            <Text style={styles.heading}>Mechanic Details</Text>
                        </View>

                        <View style={{ marginTop: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginLeft: 30, width: 60 }}>
                                    <Text style={styles.nameHeading}>Name: </Text>
                                </View>

                                <View>
                                    <Text style={styles.name}>{JSON.stringify(name)}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginLeft: 30, width: 60 }}>
                                    <Text style={styles.nameHeading}>Contact: </Text>
                                </View>

                                <View>
                                    <Text style={styles.number}>{JSON.stringify(number)}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginLeft: 30, width: 60 }}>
                                    <Text style={styles.nameHeading}>Address: </Text>
                                </View>

                                <View>
                                    <Text style={styles.address}>{JSON.stringify(address)}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginLeft: 30, width: 60 }}>
                                    <Text style={styles.nameHeading}>Rating: </Text>
                                </View>

                                <View>
                                    <Text style={styles.rating}>{defaultRating + '/' + maxRating.length}</Text>
                                </View>

                            </View>
                        </View >

                    </Card >
                </View >

                <View>
                    <KeyboardAvoidingView enabled>
                        <Card style={styles.userCard}>
                            <ScrollView>
                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <Text style={styles.carDetailsText}>Car Details</Text>

                                </View>
                                {/* <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder="Made" //12345
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    underlineColorAndroid="#f000"
                                    returnKeyType="next"
                                />

                            </View> */}

                                <View>
                                    <TouchableOpacity
                                        style={styles.dropdownContainer}
                                        onPress={() => changeModalVisibility(true)}
                                    >
                                        <Text style={styles.dropdowntext}>{made}</Text>
                                        <Icon
                                            style={{ marginRight: 18, marginLeft: 10, marginTop: 15 }}
                                            name="chevron-down"
                                            size={16}
                                            color="gray"
                                        />
                                    </TouchableOpacity>
                                    <Modal
                                        transparent={true}
                                        animation='slide'
                                        visible={isModalVisible}
                                        nRequestClose={() => changeModalVisibility(false)}
                                    >
                                        <ModalPickerMade
                                            changeModalVisibility={changeModalVisibility}
                                            setMake={setMake}
                                        />
                                    </Modal>
                                </View>

                                <View>
                                    <TouchableOpacity
                                        style={styles.dropdownContainer}
                                        onPress={() => changeYearModalVisibility(true)}
                                    >
                                        <Text style={styles.dropdowntext}>{year}</Text>
                                        <Icon
                                            style={{ marginRight: 18, marginLeft: 10, marginTop: 15 }}
                                            name="chevron-down"
                                            size={16}
                                            color="gray"
                                        />
                                    </TouchableOpacity>

                                    <Modal
                                        transparent={true}
                                        animation='slide'
                                        visible={isYearModalVisible}
                                        nRequestClose={() => changeYearModalVisibility(false)}
                                    >

                                        <ModalPickerYear
                                            changeYearModalVisibility={changeYearModalVisibility}
                                            setYearr={setYearr}
                                        />

                                    </Modal>

                                </View>


                                <Text style={styles.selectServicesHeading}>Select Services</Text>

                                <View style={{ justifyContent: 'center', marginBottom: 20 }} >{services()}</View>


                                <ApplicationProvider {...eva} theme={eva.light}>
                                    <TouchableOpacity style={styles.calenderContainer}>
                                        <Layout style={styles.container} level='1'>

                                            <Datepicker
                                                placeholder='Min / Max'
                                                min={yesterday}
                                                max={tomorrow}
                                                {...minMaxPickerState}
                                            />


                                        </Layout>
                                    </TouchableOpacity>
                                </ApplicationProvider>

                                <TouchableOpacity>

                                    <CheckBox title="CLICK" value={check} onValueChange={() => { setCheck(!check) }} />
                                </TouchableOpacity>

                                <View>
                                    <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.4} onPress={() => { getSelectedServices() }}>
                                        <Text style={styles.buttonText}>Book</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </Card>
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

    HeadingText: {
        fontSize: 20,
        marginLeft: 20,
        color: '#000000',
        marginBottom: -7
    },


    detailCard: {
        height: 200,
        width: WIDTH - 30,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: WIDTH / 25,
        backgroundColor: '#F9E79F'
    },

    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
        textDecorationLine: 'underline',
        color: 'red'
    },

    nameHeading: {
        marginTop: 10,
        fontWeight: 'bold',
        color: 'green',
        fontSize: 15,
    },

    name: {
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },

    numberHeading: {
        marginTop: 10,
        marginLeft: 30,
        fontWeight: 'bold',
        color: 'green',
        fontSize: 15,
    },

    number: {
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },

    addressHeading: {
        marginTop: 10,
        marginLeft: 30,
        fontWeight: 'bold',
        color: 'green',
        fontSize: 15,
    },

    address: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 25,
        width: 220,
        fontWeight: 'bold',
        fontSize: 15,
    },

    ratingHeading: {
        marginTop: 10,
        marginLeft: 30,
        fontWeight: 'bold',
        color: 'green',
        fontSize: 15,
    },

    rating: {
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },

    userCard: {
        height: 1000,
        width: WIDTH - 30,
        marginTop: 10,
        marginLeft: WIDTH / 25,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: 'white'
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
        flexDirection: 'row',
        backgroundColor: 'lavender',
        borderRadius: 50,
        width: 290,
        height: 45,
        // marginLeft: 30,
        marginTop: 20,
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

    container: {
        minHeight: 290,
    },

    calenderContainer: {
        height: 45,
        width: 290,
        borderRadius: 50,
        marginTop: 20
    },

    buttonContainer: {
        height: 50,
        width: 290,
        borderRadius: 50,
        backgroundColor: '#2AD60B',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
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

export default BookingScreen