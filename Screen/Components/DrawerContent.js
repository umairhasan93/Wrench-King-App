import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
import Footer from "./DrawerFooter"
import { DrawerContentScrollView, DrawerItems, DrawerItemList } from '@react-navigation/drawer';
import Loader from "../Components/loader"
import AsyncStorage from '@react-native-community/async-storage'
import { Card } from 'react-native-paper';

export function DrawerContent(props) {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [user, setUser] = useState([])
    const [password, setPassword] = useState()

    const [
        profileModalVisible,
        setProfileModalVisible,
    ] = useState(false);

    const [
        editNameModalVisible,
        setEditNameModalVisible,
    ] = useState(false);


    AsyncStorage.getItem('user').then(data => {
        if (data) {
            setUser(JSON.parse(data))
        }

    })


    return (
        <View>

            <View style={styles.userDetails}>

                <Text style={styles.name}>{user.name}</Text>

            </View>
            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    width: 250,
                    alignSelf: 'center'
                }}
            />
            <ScrollView style={{ height: 458 }}>


                <Loader loading={loading} />
                <View style={{ height: 458 }}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={{ height: 40, justifyContent: "center", paddingLeft: 20, marginTop: 10 }}
                        onPress={() => navigation.navigate("UpdateProfileScreen")}
                    >
                        <Text>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={{ height: 50, justifyContent: "center", paddingLeft: 20, marginTop: 10 }}
                        onPress={() => navigation.navigate("BookingStatus")}
                    >
                        <Text>Your Bookings</Text>
                    </TouchableOpacity>
                </View>




            </ScrollView>

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({

    userDetails: {
        alignItems: 'center',
        margin: 15,
    },

    name: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },

    email: {
        fontSize: 12,
        textDecorationLine: 'underline',
        color: 'indigo',
        marginTop: 10,
    },

});

// export default DrawerContent
