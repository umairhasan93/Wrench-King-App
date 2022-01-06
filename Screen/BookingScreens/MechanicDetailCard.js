import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Card } from 'react-native-paper';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const MechanicDetailCard = (props) => {

    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])
    return (
        <View>
            <Card style={styles.detailCard}>
                <View>
                    <Text style={styles.heading}>Mechanic Details</Text>
                </View>

                <View style={{ marginTop: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 30, width: 60 }}>
                            <Text style={styles.nameHeading}>Name: </Text>
                        </View>

                        <View>
                            <Text style={styles.name}>{props.mechanicName}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 30, width: 60 }}>
                            <Text style={styles.nameHeading}>Contact: </Text>
                        </View>

                        <View>
                            <Text style={styles.number}>{JSON.stringify(props.mechanicNumber)}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 30, width: 60 }}>
                            <Text style={styles.nameHeading}>Address: </Text>
                        </View>

                        <View>
                            <Text style={styles.address}>{props.mechanicAddress}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 30, width: 60 }}>
                            <Text style={styles.nameHeading}>Rating: </Text>
                        </View>

                        <View>
                            <Text style={styles.rating}>{props.mechanicRating}</Text>
                        </View>

                    </View>
                </View >

            </Card >
        </View >
    )
}

const styles = StyleSheet.create({
    HeadingText: {
        fontSize: 20,
        marginLeft: 20,
        color: '#000000',
        marginBottom: -7
    },


    detailCard: {
        paddingBottom: 20,
        width: WIDTH - 30,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: WIDTH / 25,
        backgroundColor: '#F9E79F'
    },

    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 10,
        textDecorationLine: 'underline',
        color: 'red'
    },

    nameHeading: {
        marginTop: 10,
        fontWeight: 'bold',
        color: 'green',
        fontSize: 15,
    },

    name: {
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },

    numberHeading: {
        marginTop: 10,
        marginLeft: 30,
        fontWeight: 'bold',
        color: 'green',
        fontSize: 15,
    },

    number: {
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },

    addressHeading: {
        marginTop: 10,
        marginLeft: 30,
        fontWeight: 'bold',
        color: 'green',
        fontSize: 15,
    },

    address: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 25,
        width: 220,
        fontWeight: 'bold',
        fontSize: 15,
    },

    ratingHeading: {
        marginTop: 10,
        marginLeft: 30,
        fontWeight: 'bold',
        color: 'green',
        fontSize: 15,
    },

    rating: {
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },
})

export default MechanicDetailCard