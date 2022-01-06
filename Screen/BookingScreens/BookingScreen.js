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
import { Picker } from '@react-native-picker/picker';

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

    const Companies = ["Select Company", "Daihatsu", "Faw", "Honda", "Hyundai", "Kia", "Nissan", "Suzuki", "Toyota"]
    const Years = ["Select Year", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"]
    const Daihatsu = ["Select Model", "Move", "Mira", "Hijet", "Cuore", "Terios Kid"]
    const Faw = ["Select Model", "Carrier Plus", "V2"]
    const Honda = ["Select Model", "Civic", "Accord", "City", "BR-V", "Vezel", "Fit"]
    const Hyundai = ["Select Model", "Santro", "Sonata", "Elantra"]
    const Kia = ["Select Model", "Pride", "Picanto", "Sportage", "Carnival", "Spectra"]
    const Nissan = ["Select Model", "Tidda", "Clipper", "Days", "Sunny"]
    const Suzuki = ["Select Model", "Mehran", "Khyber", "Wagon-R", "Alto", "Bolan", "Cultus", "Swift", "Ciaz", "Margala", "Baleno", "Liana"]
    const Toyota = ["Select Model", "Corolla", "Camry", "Passo", "Vitz", "Prius", "Aqua", "Hilux", "Prado", "Yaris", "Land Cruiser", "Surf", "Premio"]

    const [selectedCompany, setSelectedCompany] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [selectedModel, setSelectedModel] = useState();

    const minMaxPickerState = useDatepickerState();

    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'

    const Model = () => {
        console.log(selectedCompany);
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
                                <View style={styles.dropdownContainer}>
                                    <Picker
                                        selectedValue={selectedCompany}
                                        onValueChange={(itemValue) =>
                                            setSelectedCompany(itemValue)
                                        }
                                        style={{
                                            width: 300,

                                            borderWidth: 3,
                                            borderColor: "#666",
                                            marginLeft: 5
                                        }}
                                        numberOfLines={6}
                                    >
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
                                        {
                                            Model(selectedCompany)
                                        }
                                    </Picker>

                                </View>

                                {/* <ApplicationProvider {...eva} theme={eva.light}>
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
                                </ApplicationProvider> */}



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
        height: 500,
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

        backgroundColor: 'lavender',
        borderRadius: 50,
        width: 300,
        height: 45,
        marginTop: 20,
        justifyContent: 'center',
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
        marginTop: 20,
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