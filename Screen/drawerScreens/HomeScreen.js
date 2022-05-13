import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Modal,
    ToastAndroid,

} from 'react-native';
import { Card } from 'react-native-paper';
import MenuButton from '../Components/NavigationDrawerHeader'
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';
import { REACT_NATIVE_APP_API_KEY } from '@env'

const API = REACT_NATIVE_APP_API_KEY

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const HomeScreen = ({ navigation }) => {

    const showSuccessToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'Rated Successfully!',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
    };

    const [dataa, setData] = useState([])
    const [bookings, setBookings] = useState('')


    // console.log(bookings)

    const id = dataa.contact
    const username = dataa.username
    // const number = dataa.contact
    const mechanicname = bookings[0].Mechanic_Name
    const mechanicnumber = bookings[0].Mechanic_Number
    // console.log(mechanicname)
    // console.log(mechanicnumber)
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('user').then(data => {
            setData(JSON.parse(data))
        })

        let url = `${API}confirmedbooking/completebooking/`
        // console.log(url)
        fetch(url + id)
            .then(resp => resp.json())
            .then(resp => setBookings(resp))
            .catch((error) => console.error(error))

        if (bookings.length === 1) {
            setModalVisible(!modalVisible)
        }

    }, [])

    const [rating, setRating] = useState(0)

    const onStarRatingPress = (rate) => {
        setRating(rate)
    }

    const rate = () => {

        const data = {
            User_Name: username,
            User_Number: id,
            Mechanic_Name: mechanicname,
            Mechanic_Number: mechanicnumber,
            Rating: rating
        }

        let url = `${API}rating/rating`
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                //Header Defination
                'Content-Type':
                    'application/json',
            },
        })

            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson) {
                    setModalVisible(false)
                    showSuccessToastWithGravity()
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const images = ([
        'https://www.mechanicustaad.pk/wp-content/uploads/2019/01/48421042_621075531679514_6562751771075149824_n-2.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41LLIGCbZGRTcX2HyD4TGiS97BfFdyty87A&usqp=CAU',
        'https://cdn1.vectorstock.com/i/1000x1000/54/70/online-car-service-and-maintenance-concept-vector-18945470.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBHDCnhJAJLbADyvz43nfRlVgJ_XtbYcPFABbtblDpRVB3xrFbTvGfOU-65_Sr_vnTGto&usqp=CAU'
    ])


    const car = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzDAnzv7EGF8fK14kBzlUtqJtXaUsQ43h7Q&usqp=CAU' }
    const bike = { uri: 'https://www.motosport.com/motoblog/2020/How-To-Find-a-Good-mechanic.jpg' }
    const towing = { uri: 'https://dealmarkaz.pk/oc-content/uploads/1400/450674.jpg' }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#E41B17',
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 20,
                height: 50,
                paddingTop: 6,
                shadowColor: '#000000',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 10,
                shadowRadius: 10,
                elevation: 10,
            }}>
                <MenuButton onPress={() => navigation.openDrawer()} />
                <Text style={styles.headerText}>Wrench King</Text>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <View><Text style={styles.modalText}>Rate Mechanic</Text></View>
                        </View>

                        <View style={{ marginBottom: 38, marginTop: 10 }}>

                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={rating}
                                selectedStar={(rate) => onStarRatingPress(rate)}
                                fullStarColor={'red'}
                            />

                            {/* <Text>{rating}</Text> */}

                        </View>


                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.Button} onPress={() => setModalVisible(false)}>
                                <Text style={{ fontSize: 20, color: '#fff' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Button} onPress={() => rate()}>
                                <Text style={{ fontSize: 20, color: '#fff' }}>Rate</Text>
                            </TouchableOpacity>
                        </View>

                    </View >
                </View >
            </Modal >
            <Card style={{
                height: HEIGHT / 2.57,
                width: WIDTH,
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
                padding: 16,
                paddingLeft: 17,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 10,
                shadowRadius: 10,
                elevation: 10,
                borderWidth: 1,
            }}>
                <Card style={styles.ImageSliderContainer}>
                    <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image }}
                                style={{ height: HEIGHT / 3, width: WIDTH - 33, resizeMode: 'cover', borderRadius: 10 }} />
                        ))
                        }
                    </ScrollView>
                </Card>
            </Card>
            <ScrollView>
                <View style={{ flexDirection: 'row', marginBottom: 25, marginTop: 20 }}>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('CarMechanicScreen')}>
                        <ImageBackground
                            source={car}
                            resizeMode="cover"
                            style={styles.cardImage}
                        >
                            <Card style={styles.card}>
                                <Text style={styles.text}>
                                    Car Mechanic
                                </Text>
                            </Card>


                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('BikeMechanicScreen')}>
                        <ImageBackground
                            source={bike}
                            resizeMode="cover"
                            style={styles.cardImage}
                        >
                            <Card style={styles.card}>
                                <Text style={styles.text}>
                                    Bike Mechanic
                                </Text>
                            </Card>


                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.navigate('TowingVanScreen') }}>
                        <ImageBackground
                            source={towing}
                            resizeMode="cover"
                            style={styles.cardImage1}
                        >
                            <Card style={styles.card1}>
                                <Text style={styles.Towingtext}>
                                    Towing Van
                                </Text>
                            </Card>


                        </ImageBackground>
                    </TouchableOpacity>


                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        alignItems: "center",
        marginLeft: 60,
        marginTop: 2,
        color: 'white',
        fontWeight: 'bold',
    },

    ImageSliderContainer: {
        height: HEIGHT / 3,
        width: WIDTH - 33,
        borderRadius: 10,
        shadowColor: '#E41B17',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 10,
    },

    cardImage: {
        resizeMode: 'cover',
        height: HEIGHT / 5,
        width: WIDTH / 2.3,
        marginLeft: 17,
        marginRight: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 10,
    },

    card: {
        height: 38,
        width: WIDTH / 2.3,
        marginTop: HEIGHT / 6.5,
        borderRadius: 10,
        backgroundColor: '#E41B17',
        alignItems: 'center',
    },

    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FEFCFF',
        marginTop: 2
    },

    cardImage1: {

        height: HEIGHT / 3.8,
        width: WIDTH / 1.09,
        marginLeft: 17,
        marginRight: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 10,
        marginBottom: 20
    },

    card1: {
        height: 40,
        width: WIDTH / 1.09,
        marginTop: HEIGHT / 4.7,
        borderRadius: 10,
        backgroundColor: '#E41B17',
        alignItems: 'center',
    },

    Towingtext: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#FEFCFF',
        marginTop: 1
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#00000065'
    },

    modalView: {
        margin: 10,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        width: WIDTH / 1.1,
        height: WIDTH / 1.8,
        paddingBottom: 20
    },

    modalHeader: {
        width: '100%',
        height: HEIGHT / 8.2,
        padding: 10,
        // backgroundColor: 'lavender'
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 30,
        color: 'black'
    },

    Button: {
        backgroundColor: 'dodgerblue',
        width: WIDTH / 2.2,
        height: WIDTH / 8,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 5,
        borderColor: 'white',
        borderWidth: 1
    },
})

export default HomeScreen;