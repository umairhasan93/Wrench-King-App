import React from 'react';
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
} from 'react-native';
import { Card } from 'react-native-paper';
import MenuButton from '../Components/NavigationDrawerHeader'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const HomeScreen = ({ navigation }) => {



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
                    <TouchableOpacity activeOpacity={0.7}>
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
        width: 165,
        marginLeft: 17,
        marginRight: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#E41B17',
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
        width: 165,
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
        width: 350,
        marginLeft: 17,
        marginRight: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#E41B17',
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
        width: 350,
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
    }

})

export default HomeScreen;