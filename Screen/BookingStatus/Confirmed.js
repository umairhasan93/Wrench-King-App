import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions,
    Linking

} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { SpeedDial } from 'react-native-elements';
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const Confirmed = (props) => {

    const dialCall = (number) => {
        let phoneNumber = ''

        phoneNumber = 'tel:$' + number

        Linking.openURL(phoneNumber)
    }

    const [open, setOpen] = React.useState(false);
    const [bookings, setBooking] = useState([])
    const [confirmed, SetConfirmed] = useState(0)
    const id = props.userid

    useEffect(() => {
        let url = `${API}booking/confirmed/`
        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => {

                setBooking(resp)
            })
        console.log(bookings);
    }, [])


    const Delete = (booking) => {
        console.log(booking._id);
        let url = `${API}booking/`
        fetch(url + booking._id, {
            method: 'DELETE',
        })
            .then(resp => resp.json())
            .then(res => {
                console.log({ res });

                setBooking(res)

            }).catch(err => {
                console.log({ err });

            })
    }

    const [showBox, setShowBox] = useState(true);

    const showConfirmDialog = (booking) => {
        console.log('Ddialog');
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to Cancel Your Booking?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        setShowBox(false);
                        Delete(booking)
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };


    return (
        <View style={{ alignItems: 'center', paddingTop: 20 }}>

            {
                bookings.map((booking, index) => {
                    return (
                        <Card key={index} style={styles.card}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 163, alignItems: 'center' }}>
                                        <Text style={styles.nameText}>{booking.Mechanic_Name}</Text>
                                    </View>

                                    <View style={{ width: WIDTH / 4.1, backgroundColor: '#98F516', marginRight: -86, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                                        <Text style={{ fontSize: 14, marginBottom: 2, fontWeight: 'bold', color: 'black' }}>{booking.Status}</Text>
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

                            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                <TouchableOpacity onPress={() =>

                                    showConfirmDialog(booking)
                                }
                                    style={{
                                        backgroundColor: '#ff000099',
                                        height: HEIGHT / 25,
                                        width: WIDTH / 5,
                                        borderRadius: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: WIDTH / 3
                                    }}
                                >
                                    <Text style={{ fontSize: 15, color: 'white', marginTop: -1.5, marginLeft: -2 }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        marginLeft: WIDTH / 3.8,
                                        marginLeft: WIDTH / 5,
                                        height: HEIGHT / 17,
                                        width: HEIGHT / 17,
                                        borderRadius: HEIGHT / 34,
                                        backgroundColor: '#12AD2B',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onPress={() => dialCall(booking.Mechanic_Number)}
                                >
                                    <Icon
                                        name="phone-alt"
                                        size={20}
                                        color='#fff'
                                    />
                                    {/* <Text style={{ marginLeft: -(WIDTH / 14) }}>{HEIGHT / 34}</Text> */}
                                </TouchableOpacity>


                            </View>
                        </Card>
                    )

                })
            }

        </View >
    )

}

const styles = StyleSheet.create({

    card: {
        marginBottom: 30,
        padding: 15,
        width: WIDTH - 30,
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
        color: "black",
        marginLeft: 15,
    }

})

export default Confirmed