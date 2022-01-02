import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import MenuButton from '../Components/NavigationDrawerHeader'

const HomeScreen = ({ navigation }) => {


    const images = ([
        'https://www.mechanicustaad.pk/wp-content/uploads/2019/01/48421042_621075531679514_6562751771075149824_n-2.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41LLIGCbZGRTcX2HyD4TGiS97BfFdyty87A&usqp=CAU',
        'https://cdn1.vectorstock.com/i/1000x1000/54/70/online-car-service-and-maintenance-concept-vector-18945470.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBHDCnhJAJLbADyvz43nfRlVgJ_XtbYcPFABbtblDpRVB3xrFbTvGfOU-65_Sr_vnTGto&usqp=CAU'
    ])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'lavender' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#000000', height: 50, paddingTop: 6 }}>
                <MenuButton onPress={() => navigation.openDrawer()} />
                {/* <Image source= {require('')}/> */}
                <Text style={styles.headerText}>Wrench King</Text>
            </View>
            <View style={{ flex: 0.72, padding: 16 }}>
                <Card style={styles.ImageSliderContainer}>
                    <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image }}
                                style={{ height: 200, width: 350, resizeMode: 'cover', borderRadius: 10 }} />
                        ))
                        }
                    </ScrollView>
                </Card>

            </View>

            <View style={{ flexDirection: 'row', marginBottom: 25, marginTop: 80 }}>
                <TouchableOpacity onPress={() => navigation.navigate('CarMechanicScreen')}>
                    <Card style={styles.OptionCardContainer1}>
                        <Text style={styles.text}>Car</Text>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('BikeMechanicScreen')}>
                    <Card style={styles.OptionCardContainer2}>
                        <Text style={styles.text}>Bike</Text>
                    </Card>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <Card style={styles.OptionCardContainer3}>
                        <Text style={styles.Towingtext}>Towing</Text>
                    </Card>
                </TouchableOpacity>

                <Card style={styles.OptionCardContainer4}></Card>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        alignItems: "center",
        marginLeft: 60,
        marginTop: 2,
        color: 'red'
    },
    ImageSliderContainer: {
        height: 200,
        width: 350,
        borderRadius: 10
    },

    OptionCardContainer1: {
        height: 120,
        width: 165,
        marginLeft: 17,
        marginRight: 2,
        borderRadius: 10,
        backgroundColor: '#58D68D',
        justifyContent: 'center',
        alignItems: 'center'
    },

    OptionCardContainer2: {
        height: 120,
        width: 165,
        marginLeft: 17,
        marginRight: 2,
        borderRadius: 10,
        backgroundColor: '#5DADE2',
        justifyContent: 'center',
        alignItems: 'center'
    },

    OptionCardContainer3: {
        height: 120,
        width: 165,
        marginLeft: 17,
        marginRight: 2,
        borderRadius: 10,
        backgroundColor: '#E59866',
        justifyContent: 'center',
        alignItems: 'center'
    },

    OptionCardContainer4: {
        height: 120,
        width: 165,
        marginLeft: 17,
        marginRight: 2,
        borderRadius: 10,
        backgroundColor: '#F4D03F',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 100,
        marginTop: 50,
    },

    Towingtext: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 80,
        marginTop: 50,
    }

})

export default HomeScreen;