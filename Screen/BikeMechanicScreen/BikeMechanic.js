import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import MenuButton from '../Components/NavigationDrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome5';

const BikeMechanic = ({ navigation }) => {
    const [mechanic, setMechanic] = useState([])

    const image = {
        uri: 'https://live.staticflickr.com/65535/49357672303_973df140a6_h.jpg'
    }

    useEffect(() => {
        fetch('http://192.168.100.15:5000/api/mechanics/bike')
            .then((response) => response.json())
            .then((json) => setMechanic(json))
            .catch((error) => console.error(error))

    }, []);




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#000000', height: 50, paddingTop: 6 }}>
                <MenuButton onPress={() => navigation.openDrawer()} />
                {/* <Image source= {require('')}/> */}
                <Text style={styles.headerText}>Wrench King</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon style={styles.backIcon} name="chevron-left" size={24} color="red" />
                </TouchableOpacity>
            </View>
            <ScrollView>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.HeadingText}>BikeMechanics</Text>

                    <ScrollView pagingEnabled vertical>
                        {

                            mechanic.map((bikemechanic, index) => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('BikeBookingScreen', {
                                        name: bikemechanic.name,
                                        number: bikemechanic.contactNo,
                                        address: bikemechanic.address,
                                        rating: bikemechanic.rating,
                                        speciality: bikemechanic.speciality,
                                        type: bikemechanic.mechanicType,
                                    })}
                                        key={index} style={{ marginLeft: 5, marginTop: 12 }}>
                                        <Card style={styles.Card}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View>
                                                    <View style={styles.container}>
                                                        <Text style={styles.name}>{bikemechanic.name}</Text>
                                                    </View>
                                                    <View style={styles.container2}>
                                                        <Text style={styles.speciality}>{bikemechanic.speciality}</Text>
                                                    </View>
                                                </View>
                                                <Image source={image} style={styles.image} />
                                            </View>

                                            <Text style={styles.contactNo}>{bikemechanic.contactNo}</Text>
                                            <Text style={styles.address}>{bikemechanic.address}</Text>
                                            <TouchableOpacity style={styles.ratingContainer}>
                                                <Icon style={styles.heartIcon} name="heart" color="yellow" size={20} />
                                                <Text style={styles.rating}>{bikemechanic.rating}</Text>
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


    Card: {
        height: 203,
        width: 350,
        borderRadius: 10,
        marginTop: 5,
        marginRight: 20,
        marginLeft: 10,
        backgroundColor: '#16A085'
    },

    container: {
        backgroundColor: "#f4df4eff",
        height: 35,
        width: 120,
        marginTop: 15,
        marginBottom: -7,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30
    },

    container2: {
        backgroundColor: "#f4df4eff",
        height: 35,
        width: 70,
        marginTop: 15,
        marginBottom: -7,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30
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

export default BikeMechanic