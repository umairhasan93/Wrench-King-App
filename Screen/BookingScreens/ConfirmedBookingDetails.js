import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
}
    from 'react-native'
import { Card } from 'react-native-paper';
import MenuButton from '../Components/NavigationDrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome5';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const BookingDetails = ({ navigation, route }) => {
    const {
        mechanicname,
        mechanicnumber,
        mechanicaddress,
        mechanicspeciality,
        mechanictype,
        username,
        usernumber,
        useremail,
        carcompany,
        year,
        model,
        bookingdate,
    } = route.params;

    // console.log(route.params);
    const [details, setDetails] = useState()

    // console.log(route.params.mechanictype, mechanicspeciality);

    const heading = () => {
        if (mechanicspeciality === undefined) {
            const heading = "Booking For" + ' ' + mechanictype
            return (
                <Text>{heading}</Text>
            )
        } else {
            const heading = "Booking For" + ' ' + mechanicspeciality
            return (
                <Text>{heading}</Text>
            )
        }
    }

    // console.log(heading);

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
                <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.navigate('HomeScreen')}>
                    <Icon style={styles.backIcon} name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView >
                <View style={{ height: 650 }}>
                    <Card style={styles.card}>
                        <View style={{ width: 200, alignItems: 'center', alignSelf: 'center' }}>
                            <Text style={styles.heading}>{heading()}</Text>
                            <Text style={styles.heading}>On</Text>
                            <Text style={styles.heading}>{bookingdate}</Text>
                        </View>

                        <View style={{ borderWidth: 1, borderColor: "black", marginTop: 20, paddingBottom: 20, width: 320, alignSelf: "center" }}>
                            <View style={{ alignItems: 'center', marginTop: -14, backgroundColor: 'white', width: 60, alignSelf: 'center' }}>
                                <Text style={{ fontSize: 18 }}>User</Text>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginLeft: 20, width: 60 }}>
                                        <Text style={styles.textHeading}>Name: </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.text}>{username}</Text>
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginLeft: 20, width: 60 }}>
                                        <Text style={styles.textHeading}>Email: </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.text}>{useremail}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginLeft: 20, width: 60 }}>
                                        <Text style={styles.textHeading}>Contact:</Text>
                                    </View>

                                    <View>
                                        <Text style={styles.text}>{usernumber}</Text>
                                    </View>
                                </View>
                            </View >

                        </View>

                        <View style={{ borderWidth: 1, borderColor: "black", marginTop: 25, paddingBottom: 20, width: 320, alignSelf: "center" }}>
                            <View style={{ alignItems: 'center', marginTop: -14, backgroundColor: 'white', width: 50, alignSelf: 'center' }}>
                                <Text style={{ fontSize: 18 }}>Car</Text>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginLeft: 20, width: 70 }}>
                                        <Text style={styles.textHeading}>Company:</Text>
                                    </View>

                                    <View>
                                        <Text style={styles.text}>{carcompany}</Text>
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginLeft: 20, width: 70 }}>
                                        <Text style={styles.textHeading}>Model: </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.text}>{model}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginLeft: 20, width: 70 }}>
                                        <Text style={styles.textHeading}>Year: </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.text}>{year}</Text>
                                    </View>
                                </View>
                            </View >

                        </View>

                        <View style={{ borderWidth: 1, borderColor: "black", marginTop: 25, paddingBottom: 20, width: 320, alignSelf: "center" }}>
                            <View style={{ alignItems: 'center', marginTop: -14, backgroundColor: 'white', width: 100, alignSelf: 'center' }}>
                                <Text style={{ fontSize: 18 }}>Mechanic</Text>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginLeft: 20, width: 60 }}>
                                        <Text style={styles.textHeading}>Name: </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.text}>{mechanicname}</Text>
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginLeft: 20, width: 60 }}>
                                        <Text style={styles.textHeading}>Contact: </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.text}>{mechanicnumber}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginLeft: 20, width: 60 }}>
                                        <Text style={styles.textHeading}>Address: </Text>
                                    </View>

                                    <View style={{ width: 220 }}>
                                        <Text style={styles.text}>{mechanicaddress}</Text>
                                    </View>
                                </View>
                            </View >

                        </View>

                    </Card>
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
        color: 'white'
    },

    backIcon: {
        marginLeft: 90,
        marginTop: 7
    },

    card: {
        width: WIDTH - 30,
        marginLeft: WIDTH / 25,
        paddingBottom: 25,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 10,
    },

    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 5,
        // textDecorationLine: 'underline',
        color: 'red'
    },

    textHeading: {
        marginTop: 10,
        fontWeight: 'bold',
        color: 'green',
        fontSize: 15,
    },

    text: {
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },

})

export default BookingDetails