import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import MenuButton from '../Components/NavigationDrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#000000', height: 50, paddingTop: 6 }}>
            <MenuButton onPress={() => navigation.openDrawer()} />
            <Text style={styles.headerText}>Wrench King</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CarMechanicScreen')}>
                <Icon style={styles.backIcon} name="chevron-left" size={24} color="red" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        alignItems: "center",
        marginLeft: 60,
        marginTop: 2,
        color: 'red'
    },

    backIcon: {
        marginLeft: 100,
        marginTop: 7
    },
})

export default Header