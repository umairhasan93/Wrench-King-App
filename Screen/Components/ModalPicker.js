import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'

const Companies = ["Daihatsu", "Faw", "Honda", "Hyundai", "Kia", "Nissan", "Suzuki", "Toyota"]
const Daihatsu = ["Mira", "Cuore", "Move", "Hijet"]
const Faw = ["Carrier", "X-PV", "V2"]
const Honda = ["Civic", "City", "B-RV", "Vezel", "Accord"]
const Hyundai = ["Sonata", "Elantra", "Tucson"]
const Kia = ["Spotage", "Picanto"]
const Nissan = ["Days", "Sunny", "Juke"]
const Suzuki = ["Mehran", "Cultus", "Alto", "Bolan", "WagonR", "APV"]
const Toyota = ["Corolla", "Yaris", "Vitz", "Camry", "Prado", "Land Cruiser", "Fortuner", "Prius", "Hilux", "Rush", "Surf", "Premio", "Fielder", "C-HR", "Axio", "Aqua", "Passo"]

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const ModalPickerMade = (props) => {

    const onPressItem = (company) => {
        props.changeModalVisibility(false);
        props.setMake(company)
    }

    const company = Companies.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.company}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
                {/* <Text>--------------------------------------------------------------------------------</Text> */}
            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.container}
        >
            <View style={[styles.modal, { width: WIDTH - 80, height: HEIGHT / 2 }]}>
                <ScrollView>

                    {company}

                </ScrollView>
            </View>

        </TouchableOpacity>
    )
}

const ModalPickerDaihatsu = (props) => {

    const onPressItem = (daihatsu) => {
        props.changeModalVisibility(false);
        props.setModell(daihatsu)
    }

    const daihatsu = Daihatsu.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.company}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
                {/* <Text>--------------------------------------------------------------------------------</Text> */}
            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.container}
        >
            <View style={[styles.modal, { width: WIDTH - 80, height: HEIGHT / 2 }]}>
                <ScrollView>

                    {daihatsu}

                </ScrollView>
            </View>

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    modal: {
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
    },

    company: {
        alignItems: 'flex-start',
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 1
    },

    text: {
        margin: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },


})

export { ModalPickerMade, ModalPickerDaihatsu }