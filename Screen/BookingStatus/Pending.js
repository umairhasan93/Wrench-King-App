import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage'

const Pending = ({ navigation }) => {

    const [localUser, setLocalUser] = useState(
        AsyncStorage.getItem('user').then(data => {
            if (data) {
                setLocalUser(JSON.parse(data))
                // console.log(localUserContact);

            }
        })
    )
    const [bookings, setBooking] = useState([])
    const id = localUser.contact
    // const [showText, setShowText] = useState(true);

    useEffect(() => {

        fetch("http://192.168.100.15:5000/api/booking/" + id)
            .then(resp => resp.json())
            .then(resp => {
                setBooking(resp)
                console.log(bookings);
            })
    }, [])

    const Delete = (booking) => {
        console.log(booking._id);

        fetch("http://192.168.100.15:5000/api/booking/" + booking._id, {
            method: 'DELETE',
        })
            .then(resp => resp.json())
            .then(res => {
                console.log({ res });
                console.log(update)
                setBooking(update)

            }).catch(err => {
                console.log({ err });

            })
    }


    return (
        <View style={{ alignItems: 'center', paddingTop: 20 }}>

            <Text style={styles.blink}>If You want to Cancel Booking Press X</Text>

            {
                bookings.map((booking, index) => {
                    if (booking === null) {
                        return (
                            <Text>No Bookings</Text>
                        )
                    } else {
                        return (
                            <Card key={index} style={styles.card}>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: 180, alignItems: 'flex-end' }}>
                                            <Text style={styles.nameText}>{booking.Mechanic_Name}</Text>
                                        </View>
                                        <View style={{ width: 135 }}>
                                            <TouchableOpacity style={{ marginLeft: 100 }} onPress={() => {

                                                Delete(booking)
                                            }}>
                                                <Icon

                                                    name="times"
                                                    size={19}
                                                    color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <Text style={{ fontSize: 15 }}>Service:</Text>
                                        </View>
                                        <View style={{ marginLeft: 4 }}>
                                            <Text style={{ color: 'red', textDecorationLine: 'underline', fontSize: 15 }}>{booking.Mechanic_Speciality}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                    <View style={{ width: 160, alignItems: 'center' }}>
                                        <View>
                                            <Text style={{ fontSize: 15, color: 'black' }}>{booking.Requested_Date}</Text>
                                        </View>
                                        <View style={{ marginTop: 2 }}>
                                            <Text style={{ fontSize: 14 }}>Requested Date</Text>
                                        </View>
                                    </View>

                                    <View style={{ width: 160, alignItems: 'center' }}>
                                        <View>
                                            <Text style={{ fontSize: 15, color: 'black' }}>{booking.Booking_Date}</Text>
                                        </View>
                                        <View style={{ marginTop: 2 }}>
                                            <Text style={{ fontSize: 14 }}>Date of Appointment</Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        )
                    }
                })
            }

        </View>
    )

}

const styles = StyleSheet.create({

    blink: {
        marginBottom: 20,
        color: 'red'
    },

    card: {
        marginBottom: 30,
        padding: 15,
        width: 350,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0
    },

    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    }

})

export default Pending