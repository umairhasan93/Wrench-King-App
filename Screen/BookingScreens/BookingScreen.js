import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Dimensions,
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CalendarPicker from 'react-native-calendar-picker';
import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import Header from './Header'
import MechanicDeatils from "./MechanicDetailCard"
import CarDetails from "./UserCarDetails"

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const now = new Date();
// const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const week = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6);

const BookingScreen = ({ navigation, route }) => {

    const { name, number, address, rating, speciality } = route.params;






    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'



    return (
        <SafeAreaView style={{ backgroundColor: '#D5F5E3' }}>

            <Header />
            <ScrollView>
                <MechanicDeatils
                    mechanicName={name}
                    mechanicNumber={number}
                    mechanicAddress={address}
                    mechanicRating={rating}
                    mechanicSpeciality={speciality}
                />

                <CarDetails />

            </ScrollView >
        </SafeAreaView >
    )
}


export default BookingScreen