import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Linking
} from 'react-native';
import { Card } from 'react-native-paper';
import MenuButton from '../Components/NavigationDrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const TowingVan = ({ navigation }) => {

    const dialCall = (number) => {
        let phoneNumber = ''

        phoneNumber = 'tel:$' + number

        Linking.openURL(phoneNumber)
    }

    const [towingVan, setTowingVan] = useState([])

    useEffect(() => {
        let url = `${API}towingVan/Get`
        fetch(url)
            .then((response) => response.json())
            .then((json) => setTowingVan(json))
            .catch((error) => console.error(error))

    }, []);


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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon style={styles.backIcon} name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 15, marginBottom: 170 }}>
                <Text style={styles.HeadingText}>Towing Van Contact</Text>
                <ScrollView>
                    {
                        towingVan.map((towingvan, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    key={index}
                                    style={{ marginLeft: 3, marginTop: 12 }}
                                    onPress={() => dialCall(towingvan.contactNo)}
                                >

                                    <Card style={styles.card}>
                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>

                                            <View style={{ width: WIDTH / 2, justifyContent: 'center' }}>
                                                <Text style={styles.name}>{towingvan.name}</Text>
                                            </View>

                                            <TouchableOpacity activeOpacity={0.7} style={styles.ratingContainer}>
                                                <Icon style={styles.starIcon} name="star" size={18} />
                                                <Text style={styles.rating}>{towingvan.rating}</Text>
                                            </TouchableOpacity >

                                        </View>

                                        <View style={{ marginTop: 15, width: WIDTH / 2 }}>
                                            <Text style={styles.name}>{towingvan.contactNo}</Text>
                                        </View>
                                    </Card>

                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
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

    backIcon: {
        marginLeft: WIDTH / 4.2,
        marginTop: 7
    },

    HeadingText: {
        fontSize: 22,
        marginLeft: 20,
        color: '#000000',
        marginBottom: 7,
        fontWeight: 'bold',
    },

    card: {
        // height: 203,
        width: WIDTH - 30,
        borderRadius: 10,
        marginRight: WIDTH / 32.3,
        marginLeft: 10,
        marginBottom: 10,
        // backgroundColor: '#7E6CCA',
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

    name: {
        fontSize: 20,
        // marginTop: 3,
        marginLeft: WIDTH / 20,
        color: 'red',
        fontWeight: 'bold',
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
        marginLeft: WIDTH - 310,
        marginTop: 5,
        backgroundColor: '#ffff00',
        height: 30,
        width: 70,
        borderRadius: 50,
        flexDirection: 'row',

    }
})

export default TowingVan