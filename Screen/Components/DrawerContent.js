import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Pressable,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItems } from '@react-navigation/drawer';

export function DrawerContent(props) {
    const navigation = useNavigation();
    return (
        <View>

            <View style={styles.userDetails}>
                <View style={styles.imageView}>

                </View>

                <Text style={styles.name}>Muhammad Umair Hasan</Text>

                <Pressable>
                    <Text style={styles.email}>umairhasan463@gmail.com</Text>
                </Pressable>
            </View>



            <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => navigation.goBack('StackNav')}>
                    <View style={styles.tabStyle}>
                        <Icon style={styles.Logouticons} name="sign-out-alt" size={22} />
                        <Text style={styles.tabText}> Logout </Text>
                    </View>
                </TouchableOpacity>
                <Text>Umair</Text>
                <Text style={styles.headerHeading}>Wrench King</Text>
                {/* <Text style={{ color: 'grey', fontWeight: 'bold', marginBottom: 10 }}>
                        V 1.0
                    </Text> */}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: 350,
        height: 740,
        position: 'absolute',
        top: 0,
        left: 0,
    },

    userDetails: {
        alignItems: 'center',
        margin: 15,
    },

    imageView: {
        alignItems: 'center',
        marginTop: 10,
        height: 120,
        width: 120,
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 9,
    },

    image: {
        width: 110,
        height: 110,
        borderWidth: 2,
        borderRadius: 100,
        resizeMode: 'stretch',
        borderColor: 'white',
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

    tabsView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    tabStyle: {
        marginTop: 15,
        marginBottom: 10,
        flexDirection: 'row',
    },
    Logouticons: {
        marginLeft: 30,
        color: 'gray',
    },

    tabText: {
        marginLeft: 20,
        fontSize: 20,
        color: 'gray',
    },

    proButtonContainer: {
        elevation: 5,
        marginLeft: 29,
        backgroundColor: 'gray',
        borderRadius: 30,
        width: 22,
        height: 22,
    },

    proButtonText: {
        textAlign: 'center',
        marginTop: 3,
        fontSize: 10,
        color: 'white',
    },

    headerLogo: {
        height: 40,
        width: 40,
        marginTop: 30,
    },

    headerHeading: {
        marginTop: 5,
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
    },
});

// export default DrawerContent
