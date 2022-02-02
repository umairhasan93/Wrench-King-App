import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { Card } from 'react-native-paper';
import MenuButton from '../Components/NavigationDrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const CarMechanic = ({ navigation }) => {
    const [tuningMechanic, setTuningMechanic] = useState([])
    const [axleMechanic, setAxleMechanic] = useState([])
    const [acMechanic, setACMechanic] = useState([])

    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'


    const image = {
        uri: 'https://www.mechanicustaad.pk/wp-content/uploads/2019/01/48421042_621075531679514_6562751771075149824_n-2.jpg'
    }

    const image1 = {
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbJzXqvQr37WapJ_u6iysCvJs_INIe1IzfQ&usqp=CAU'
    }

    const image2 = {
        uri: 'https://lh3.googleusercontent.com/dyJJ3ZiyZrjqVq3Elc_54F2pKBUcefH9ztENLVPgDITMkGctbDMV7Q7koCLtd3iI4Wx_1xAICLTHKM_x=w1080-h608-p-no-v0'
    }
    useEffect(() => {
        let tuningURL = `${API}mechanics/cartuning`
        console.log(tuningURL)
        fetch(tuningURL)
            .then((response) => response.json())
            .then((json) => setTuningMechanic(json))
            .catch((error) => console.error(error))

    }, []);

    useEffect(() => {
        let axleURL = `${API}mechanics/caraxle`
        console.log(axleURL)
        fetch(axleURL)
            .then((response) => response.json())
            .then((json) => setAxleMechanic(json))
            .catch((error) => console.error(error))

    }, []);

    useEffect(() => {
        let acURL = `${API}mechanics/carac`
        console.log(acURL)
        fetch(acURL)
            .then((response) => response.json())
            .then((json) => setACMechanic(json))
            .catch((error) => console.error(error))

    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('HomeScreen')}>
                    <Icon style={styles.backIcon} name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.HeadingText}>Tuning And Service Mechanic</Text>

                    <ScrollView pagingEnabled horizontal>
                        {

                            tuningMechanic.map((mechanic, index) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('BookingScreen', {
                                        name: mechanic.name,
                                        number: mechanic.contactNo,
                                        address: mechanic.address,
                                        rating: mechanic.rating,
                                        speciality: mechanic.speciality,
                                        type: mechanic.mechanicType
                                    })}
                                        key={index} style={{ marginLeft: 3, marginTop: 12 }}>
                                        <ImageBackground source={image} key={index} style={styles.CardImage}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.name}>{mechanic.name}</Text>
                                                    </View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.speciality}>{mechanic.speciality}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    marginLeft: 135,
                                                    marginTop: 5
                                                }}>
                                                    <TouchableOpacity activeOpacity={0.7} style={styles.ratingContainer}>
                                                        <Icon style={styles.starIcon} name="star" size={18} />
                                                        <Text style={styles.rating}>{mechanic.rating}</Text>
                                                    </TouchableOpacity >
                                                </View>
                                            </View>
                                            <View style={styles.container1}>
                                                <Text style={styles.contactNo}>{mechanic.contactNo}</Text>
                                            </View>
                                            <View style={styles.container2}>
                                                <Text style={styles.address}>{mechanic.address}</Text>
                                            </View>

                                        </ImageBackground>

                                    </TouchableOpacity>
                                )
                            })
                        }

                    </ScrollView>

                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.HeadingText}>Axle And Suspension Mechanic</Text>
                    <ScrollView pagingEnabled horizontal >
                        {
                            axleMechanic.map((mechanic, index) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('BookingScreen', {
                                        name: mechanic.name,
                                        number: mechanic.contactNo,
                                        address: mechanic.address,
                                        rating: mechanic.rating,
                                        speciality: mechanic.speciality,
                                        type: mechanic.mechanicType,
                                    })}
                                        key={index} style={{ marginLeft: 3, marginTop: 12 }}>
                                        <ImageBackground source={image1} key={index} style={styles.CardImage}>

                                            <View style={{ flexDirection: 'row' }}>
                                                <View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.name}>{mechanic.name}</Text>
                                                    </View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.speciality}>{mechanic.speciality}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    marginLeft: 135,
                                                    marginTop: 5
                                                }}>
                                                    <TouchableOpacity activeOpacity={0.7} style={styles.ratingContainer}>
                                                        <Icon style={styles.starIcon} name="star" size={18} />
                                                        <Text style={styles.rating}>{mechanic.rating}</Text>
                                                    </TouchableOpacity >
                                                </View>
                                            </View>


                                            <View style={styles.container1}>
                                                <Text style={styles.contactNo}>{mechanic.contactNo}</Text>
                                            </View>
                                            <View style={styles.container2}>
                                                <Text style={styles.address}>{mechanic.address}</Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </ScrollView>
                </View>

                <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Text style={styles.HeadingText}>A/C Mechanic</Text>
                    <ScrollView pagingEnabled horizontal>
                        {
                            acMechanic.map((mechanic, index) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('BookingScreen', {
                                        name: mechanic.name,
                                        number: mechanic.contactNo,
                                        address: mechanic.address,
                                        rating: mechanic.rating,
                                        speciality: mechanic.speciality,
                                        type: mechanic.mechanicType,
                                    })}
                                        key={index} style={{ margin: 3, marginTop: 12 }} >
                                        <ImageBackground key={index} source={image2} style={styles.CardImage}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.name}>{mechanic.name}</Text>
                                                    </View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.speciality}>{mechanic.speciality}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    marginLeft: 135,
                                                    marginTop: 5
                                                }}>
                                                    <TouchableOpacity activeOpacity={0.7} style={styles.ratingContainer}>
                                                        <Icon style={styles.starIcon} name="star" size={18} />
                                                        <Text style={styles.rating}>{mechanic.rating}</Text>
                                                    </TouchableOpacity >
                                                </View>
                                            </View>


                                            <View style={styles.container1}>
                                                <Text style={styles.contactNo}>{mechanic.contactNo}</Text>
                                            </View>
                                            <View style={styles.container2}>
                                                <Text style={styles.address}>{mechanic.address}</Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </ScrollView>
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
        color: 'white',
        fontWeight: 'bold',
    },

    backIcon: {
        marginLeft: WIDTH / 4.2,
        marginTop: 7
    },

    HeadingText: {
        fontSize: 20,
        marginLeft: 20,
        color: '#000000',
        marginBottom: -7,
        fontWeight: 'bold',
    },


    CardImage: {
        // height: 203,
        width: WIDTH - 25,
        borderRadius: 10,
        marginTop: 5,
        marginRight: WIDTH / 32.3,
        marginLeft: 10,
        backgroundColor: '#52595D60',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 5,
        paddingBottom: 20
    },



    container: {
        // #f4df4eff
        backgroundColor: "#E41B17",
        height: 35,
        width: 120,
        marginTop: 15,
        marginBottom: -7,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },

    container1: {
        // #f4df4eff
        backgroundColor: "#E41B17",
        height: 35,
        width: 200,
        marginTop: 20,
        marginBottom: -7,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
    },

    container2: {
        // #f4df4eff
        backgroundColor: "#E41B17",
        paddingBottom: 3,
        width: 300,
        marginTop: 20,
        marginBottom: -7,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
    },

    name: {
        fontSize: 20,
        marginTop: 3,
        marginLeft: 15,
        color: 'white',
        fontWeight: 'bold',
    },

    speciality: {
        fontSize: 20,
        marginTop: 3,
        marginLeft: 15,
        color: 'white',
        fontWeight: 'bold',
    },

    contactNo: {
        fontSize: 20,
        marginLeft: 15,
        color: '#ffffff'
    },

    address: {
        fontSize: 18,
        marginLeft: 15,
        marginRight: 15,
        color: '#ffffff',

    },

    starIcon: {
        marginTop: 5,
        marginLeft: 10,
        color: '#E41B17'
    },

    rating: {
        fontSize: 16,
        marginTop: 4,
        marginLeft: 5,
        color: 'black'
    },

    ratingContainer: {
        marginLeft: WIDTH - 365,
        marginTop: 5,
        backgroundColor: '#ffff00',
        height: 30,
        width: 70,
        borderRadius: 50,
        flexDirection: 'row',

    }
})

export default CarMechanic