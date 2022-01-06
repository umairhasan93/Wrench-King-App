import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import MenuButton from '../Components/NavigationDrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome5';

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
        uri: 'data:image/jpeg;base64,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'
    }

    const image2 = {
        uri: 'https://lh3.googleusercontent.com/dyJJ3ZiyZrjqVq3Elc_54F2pKBUcefH9ztENLVPgDITMkGctbDMV7Q7koCLtd3iI4Wx_1xAICLTHKM_x=w1080-h608-p-no-v0'
    }
    useEffect(() => {
        fetch('http://192.168.100.15:5000/api/mechanics/cartuning')
            .then((response) => response.json())
            .then((json) => setTuningMechanic(json))
            .catch((error) => console.error(error))

    }, []);

    useEffect(() => {
        fetch('http://192.168.100.15:5000/api/mechanics/caraxle')
            .then((response) => response.json())
            .then((json) => setAxleMechanic(json))
            .catch((error) => console.error(error))

    }, []);

    useEffect(() => {
        fetch('http://192.168.100.15:5000/api/mechanics/carac')
            .then((response) => response.json())
            .then((json) => setACMechanic(json))
            .catch((error) => console.error(error))

    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#000000', height: 50, paddingTop: 6 }}>
                <MenuButton onPress={() => navigation.openDrawer()} />
                {/* <Image source= {require('')}/> */}
                <Text style={styles.headerText}>Wrench King</Text>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Icon style={styles.backIcon} name="chevron-left" size={24} color="red" />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.HeadingText}>Tuning And Service Mechanic</Text>

                    <ScrollView pagingEnabled horizontal>
                        {

                            tuningMechanic.map((mechanic, index) => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('BookingScreen', {
                                        name: mechanic.name,
                                        number: mechanic.contactNo,
                                        address: mechanic.address,
                                        rating: mechanic.rating,
                                        speciality: mechanic.speciality
                                    })}
                                        key={index} style={{ marginLeft: 5, marginTop: 12 }}>
                                        <Card key={index} style={styles.CardTuning}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.name}>{mechanic.name}</Text>
                                                    </View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.speciality}>{mechanic.speciality}</Text>
                                                    </View>
                                                </View>
                                                <Image source={image} style={styles.image} />
                                            </View>

                                            <Text style={styles.contactNo}>{mechanic.contactNo}</Text>
                                            <Text style={styles.address}>{mechanic.address}</Text>
                                            <TouchableOpacity style={styles.ratingContainer}>
                                                <Icon style={styles.heartIcon} name="heart" color="yellow" size={20} />
                                                <Text style={styles.rating}>{mechanic.rating}</Text>
                                            </TouchableOpacity >
                                        </Card>
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
                                    <TouchableOpacity onPress={() => navigation.navigate('BookingScreen', {
                                        name: mechanic.name,
                                        number: mechanic.contactNo,
                                        address: mechanic.address,
                                        rating: mechanic.rating,
                                        speciality: mechanic.speciality
                                    })}
                                        key={index} style={{ marginLeft: 5, marginTop: 12 }}>
                                        <Card style={styles.CardAxle}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.name}>{mechanic.name}</Text>
                                                    </View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.speciality}>{mechanic.speciality}</Text>
                                                    </View>
                                                </View>
                                                <Image source={image1} style={styles.image} />
                                            </View>
                                            <Text style={styles.contactNo}>{mechanic.contactNo}</Text>
                                            <Text style={styles.address}>{mechanic.address}</Text>
                                            <TouchableOpacity style={styles.ratingContainer}>
                                                <Icon style={styles.heartIcon} name="heart" color="yellow" size={20} />
                                                <Text style={styles.rating}>{mechanic.rating}</Text>
                                            </TouchableOpacity >
                                        </Card>
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
                                    <TouchableOpacity onPress={() => navigation.navigate('BookingScreen', {
                                        name: mechanic.name,
                                        number: mechanic.contactNo,
                                        address: mechanic.address,
                                        rating: mechanic.rating,
                                        speciality: mechanic.speciality
                                    })}
                                        key={index} style={{ marginLeft: 5, marginTop: 12 }} >
                                        <Card style={styles.CardAC}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.name}>{mechanic.name}</Text>
                                                    </View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.speciality}>{mechanic.speciality}</Text>
                                                    </View>
                                                </View>
                                                <Image source={image2} style={styles.image} />
                                            </View>
                                            <Text style={styles.contactNo}>{mechanic.contactNo}</Text>
                                            <Text style={styles.address}>{mechanic.address}</Text>
                                            <TouchableOpacity style={styles.ratingContainer}>
                                                <Icon style={styles.heartIcon} name="heart" color="yellow" size={20} />
                                                <Text style={styles.rating}>{mechanic.rating}</Text>
                                            </TouchableOpacity >
                                        </Card>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </ScrollView>
                </View>
            </ScrollView>
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


    CardTuning: {
        height: 203,
        width: 350,
        borderRadius: 10,
        marginTop: 5,
        marginRight: 20,
        marginLeft: 10,
        backgroundColor: '#7E6CCA'
    },

    CardAxle: {
        height: 203,
        width: 350,
        borderRadius: 10,
        marginTop: 5,
        marginRight: 20,
        marginLeft: 10,
        backgroundColor: '#5DADE2'
    },

    CardAC: {
        height: 203,
        width: 350,
        borderRadius: 10,
        marginTop: 5,
        marginRight: 20,
        marginLeft: 10,
        backgroundColor: '#DE3F6D'
    },

    container: {
        backgroundColor: "#f4df4eff",
        height: 35,
        width: 120,
        marginTop: 15,
        marginBottom: -7,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },

    image: {
        height: 100,
        width: 100,
        marginTop: 15,
        marginLeft: 110,
        borderRadius: 10
    },

    name: {
        fontSize: 20,
        marginTop: 3,
        marginLeft: 15,
        color: '#949398ff'
    },

    speciality: {
        fontSize: 20,
        marginTop: 3,
        marginLeft: 15,
        color: '#949398ff'
    },

    contactNo: {
        fontSize: 20,
        marginTop: -10,
        marginLeft: 15,
        color: '#ffffff'
    },

    address: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        color: '#ffffff',
        height: 40,
    },

    heartIcon: {
        marginTop: 5,
        marginLeft: 10,
        color: 'yellow'
    },

    rating: {
        fontSize: 16,
        marginTop: 4,
        marginLeft: 5
    },

    ratingContainer: {
        marginLeft: 260,
        marginTop: -15,
        backgroundColor: '#ffff',
        height: 30,
        width: 70,
        borderRadius: 50,
        flexDirection: 'row',
        backgroundColor: '#E74C3C'
    }
})

export default CarMechanic