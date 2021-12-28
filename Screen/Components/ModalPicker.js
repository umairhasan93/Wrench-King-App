import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'

const Companies = ["Daihatsu", "Faw", "Honda", "Hyundai", "Kia", "Nissan", "Suzuki", "Toyota"]
const Years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
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
            <View style={[styles.modal, { width: WIDTH - 80, height: HEIGHT / 2.45 }]}>
                <ScrollView>

                    {company}

                </ScrollView>
            </View>

        </TouchableOpacity>
    )
}

const ModalPickerYear = (props) => {

    const onPressModelItem = (year) => {
        props.changeYearModalVisibility(false);
        props.setYearr(year)
    }

    const year = Years.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.company}
                key={index}
                onPress={() => onPressModelItem(item)}
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
            onPress={() => props.changeYearModalVisibility(false)}
            style={styles.container}
        >
            <View style={[styles.modal, { width: WIDTH - 80, height: HEIGHT / 2.45 }]}>
                <ScrollView>

                    {year}

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

export { ModalPickerMade, ModalPickerYear }