import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Card } from 'react-native-paper';
import { ButtonGroup } from 'react-native-elements';
import MenuButton from '../Components/NavigationDrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Pending from "./Pending"
import Confirmed from "./Confirmed"
// import AsyncStorage from '@react-native-community/async-storage'
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const BookingStatus = ({ navigation, route }) => {

    const { id } = route.params
    // console.log(id)
    const [index, setIndex] = useState(0);
    // const [bookings, setBooking] = useState([])
    const [pending, setPending] = useState([])
    const [confirmed, setConfirmed] = useState([])

    useEffect(() => {
        let pendingURL = `${API}booking/`
        fetch(pendingURL + id)
            .then(resp => resp.json())
            .then(resp => {
                setPending(resp)
            })
        let confirmedURL = `${API}booking/confirmed/`
        fetch(confirmedURL + id)
            .then(resp => resp.json())
            .then(resp => {
                setConfirmed(resp)
            })
    }, [])


    const pendingCount = pending.length
    const confirmedCount = confirmed.length



    // const booking = () => {

    //     if (pendingCount > 0 || confirmedCount > 0) {
    //         return (
    //             <>
    //                 <View style={styles.num}>
    //                     <Text style={{ color: 'black', fontSize: 13 }}>{pendingCount}</Text>
    //                 </View>

    //                 <View style={styles.num1}>
    //                     <Text style={{ color: 'black', fontSize: 13 }}>{confirmedCount}</Text>
    //                 </View>
    //             </>

    //         )
    //     }
    //     else {
    //         return false
    //     }
    // }

    const Empty = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 220 }}>
                <Text style={{ fontSize: 20, color: 'red' }}>No Bookings</Text>
            </View>
        )
    }

    const Show = () => {
        console.log(index);
        if (index === 0) {
            if (pendingCount > 0) {
                return <Pending userid={id} />
            } else {
                return Empty()
            }
        }

        else if (index === 1) {
            if (confirmedCount > 0) {
                return <Confirmed userid={id} />
            } else {
                return Empty()
            }
        }

        else if (index === 2) {
            return Empty()
        }


    }

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
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon
                            style={{ marginRight: 20, marginLeft: 20, marginTop: 7 }}
                            name="align-center"
                            size={25}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}>Wrench King</Text>
            </View>

            <View style={{ marginLeft: -10 }}>
                <ButtonGroup
                    buttons={['PENDING', 'CONFIRMED', 'COMPLETED']}
                    selectedIndex={index}
                    onPress={(value) => {
                        setIndex(value);
                    }}
                    containerStyle={{ backgroundColor: '#ff000090', width: WIDTH / 1, height: HEIGHT / 15 }}
                    textStyle={{ color: 'black' }}
                    selectedButtonStyle={{ backgroundColor: '#ff0000' }}
                    selectedTextStyle={{ color: 'white', fontSize: 16 }}

                />
                {/* {booking()} */}
                {
                    (pendingCount > 0) ? (
                        <View style={styles.num}>
                            <Text style={{ color: 'black', fontSize: 13 }}>{pendingCount}</Text>
                        </View>
                    ) : null
                }

                {
                    (confirmedCount > 0) ? (
                        <View style={styles.num1}>
                            <Text style={{ color: 'black', fontSize: 13 }}>{confirmedCount}</Text>
                        </View>
                    ) : null
                }
                <View style={{ width: WIDTH, marginLeft: 10 }}>
                    {

                        Show()
                    }
                </View>

            </View>

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

    num: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -(HEIGHT / 15),
        marginLeft: WIDTH / 3.5,
        marginBottom: 20
    },

    num1: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -40,
        marginLeft: WIDTH / 1.6,
        marginBottom: 20
    },

})

export default BookingStatus