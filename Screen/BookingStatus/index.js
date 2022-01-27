import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';
import { Card } from 'react-native-paper';
import { Tab, TabView } from 'react-native-elements';
import MenuButton from '../Components/NavigationDrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Pending from "./Pending"
import Confirmed from "./Confirmed"
import AsyncStorage from '@react-native-community/async-storage'

const BookingStatus = ({ navigation, route }) => {

    const { id } = route.params
    // console.log(id)
    const [index, setIndex] = React.useState(0);
    // const [bookings, setBooking] = useState([])
    const [pending, setPending] = useState([])
    const [confirmed, setConfirmed] = useState([])

    useEffect(() => {
        fetch("http://192.168.100.15:5000/api/booking/" + id)
            .then(resp => resp.json())
            .then(resp => {
                setPending(resp)
            })

        fetch("http://192.168.100.15:5000/api/booking/confirmed/" + id)
            .then(resp => resp.json())
            .then(resp => {
                setConfirmed(resp)
            })
    }, [])


    const pendingCount = pending.length
    const confirmedCount = confirmed.length

    console.log('Pending = ' + pendingCount)
    console.log('Confirmed = ' + confirmedCount)

    const booking = () => {

        if (pendingCount > 0 || confirmedCount > 0) {
            return (
                <>
                    <View style={styles.num}>
                        <Text style={{ color: 'black', fontSize: 13 }}>{pendingCount}</Text>
                    </View>

                    <View style={styles.num1}>
                        <Text style={{ color: 'black', fontSize: 13 }}>{confirmedCount}</Text>
                    </View>
                </>

            )
        }
    }

    const Empty = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 220 }}>
                <Text style={{ fontSize: 20, color: 'red' }}>No Bookings</Text>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 20,
                height: 50,
                paddingTop: 6,
                shadowColor: '#E41B17',
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
                            color="red"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}>Wrench King</Text>
            </View>

            <View style={{ height: 600, backgroundColor: 'white' }}>
                <View style={{ backgroundColor: 'red' }}>
                    <Tab
                        value={index}
                        onChange={(e) => setIndex(e)}
                        indicatorStyle={{
                            backgroundColor: 'black',
                            height: 3,
                        }}

                    >

                        <Tab.Item
                            title="pending"
                            titleStyle={{ fontSize: 12, color: 'white' }}
                        />

                        <Tab.Item
                            title="confirmed"
                            titleStyle={{ fontSize: 12, color: 'white' }}

                        />
                        <Tab.Item
                            title="completed"
                            titleStyle={{ fontSize: 12, color: 'white' }}

                        />
                    </Tab>


                </View>
                {booking()}

                <TabView value={index} onChange={setIndex} animationType="spring">

                    <TabView.Item style={{ backgroundColor: '#ffffff60', width: '100%' }}>

                        {(pendingCount === 0) ? (<Empty />) : (<Pending userid={id} />)}

                    </TabView.Item>

                    <TabView.Item disabled style={{ backgroundColor: '#ffffff60', width: '100%' }}>
                        {(confirmedCount === 0) ? (<Empty />) : (<Confirmed userid={id} />)}
                    </TabView.Item>

                    <TabView.Item style={{ backgroundColor: '#ffffff60', width: '100%' }}>
                        <Text h1>Cart</Text>
                    </TabView.Item>

                </TabView>
            </View>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({

    headerText: {
        fontSize: 24,
        alignItems: "center",
        marginLeft: 60,
        marginTop: 2,
        color: 'red',
        fontWeight: 'bold',
    },

    num: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'yellow',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: -40,
        marginLeft: 95,
        marginBottom: 20
    },

    num1: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'yellow',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: -40,
        marginLeft: 229,
        marginBottom: 20
    },

})

export default BookingStatus