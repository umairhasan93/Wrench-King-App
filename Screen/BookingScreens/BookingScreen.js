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
} from 'react-native';
import { Card } from 'react-native-paper';
import MenuButton from '../Components/NavigationDrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ModalPickerMade, ModalPickerDaihatsu } from '../Components/ModalPicker'

const BookingScreen = ({ navigation, route }) => {
    const { name, number, address, rating } = route.params;
    const [defaultRating, setDefaultRating] = useState(rating)
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])
    const [made, setMade] = useState('Made');
    const [model, setModel] = useState('Model');
    const [isModalVisible, setIsModalVisible] = useState(false)

    const changeModalVisibility = (bool) => {
        setIsModalVisible(bool)
    }

    const setMake = (option) => {
        setMade(option)
    }

    const setModell = (option) => {
        setModel(option)
    }

    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'

    return (
        <SafeAreaView style={{ backgroundColor: 'lavender' }}>
            <ScrollView>
                <View style={{ flexDirection: 'row', backgroundColor: '#000000', height: 50, paddingTop: 6 }}>
                    <MenuButton onPress={() => navigation.openDrawer()} />
                    {/* <Image source= {require('')}/> */}
                    <Text style={styles.headerText}>Wrench King</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CarMechanicScreen')}>
                        <Icon style={styles.backIcon} name="chevron-left" size={24} color="red" />
                    </TouchableOpacity>
                </View>

                <View>
                    <Card style={styles.detailCard}>
                        <View>
                            <Text style={styles.heading}>Mechanic Details</Text>
                        </View>

                        <View style={{ marginTop: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.nameHeading}>Name: </Text>
                                <Text style={styles.name}>{JSON.stringify(name)}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.numberHeading}>Contact NO: </Text>
                                <Text style={styles.number}>{JSON.stringify(number)}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.addressHeading}>Address: </Text>
                                <Text style={styles.address}>{JSON.stringify(address)}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.ratingHeading}>Rating: </Text>
                                <Text style={styles.rating}>{defaultRating + '/' + maxRating.length}</Text>
                            </View>
                        </View>

                    </Card>
                </View>

                <View>
                    <KeyboardAvoidingView enabled>
                        <Card style={styles.userCard}>
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
                                    onPress={() => changeModalVisibility(true)}
                                >
                                    <Text style={styles.dropdowntext}>{model}</Text>
                                    <Icon
                                        style={{ marginRight: 18, marginLeft: 10, marginTop: 15 }}
                                        name="chevron-down"
                                        size={16}
                                        color="gray"
                                    />
                                </TouchableOpacity>

                            </View>

                        </Card>
                    </KeyboardAvoidingView>
                </View>

            </ScrollView>
        </SafeAreaView>
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
        width: 350,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 17,
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
        marginLeft: 30,
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
        width: 350,
        marginTop: 10,
        marginLeft: 15,
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
})

export default BookingScreen