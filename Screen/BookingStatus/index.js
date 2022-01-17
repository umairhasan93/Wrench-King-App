import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';
import { Card } from 'react-native-paper';
import { Tab, TabView } from 'react-native-elements';
import MenuButton from '../Components/NavigationDrawerHeader'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Pending from "./Pending"

const BookingStatus = ({ navigation }) => {

    const [index, setIndex] = React.useState(0);

    return (
        <SafeAreaView>
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 20,
                height: 50,
                paddingTop: 6,
                shadowColor: '#E41B17',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 10,
                shadowRadius: 10,
                elevation: 10,
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon
                            style={{ marginRight: 20, marginLeft: 20, marginTop: 7 }}
                            name="align-center"
                            size={25}
                            color="red"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}>Wrench King</Text>
            </View>

            <View style={{ height: 600, backgroundColor: 'white' }}>
                <View style={{ backgroundColor: 'red' }}>
                    <Tab
                        value={index}
                        onChange={(e) => setIndex(e)}
                        indicatorStyle={{
                            backgroundColor: 'black',
                            height: 3,
                        }}

                    >
                        <Tab.Item
                            title="pending"
                            titleStyle={{ fontSize: 12, color: 'white' }}

                        />
                        <Tab.Item
                            title="confirmed"
                            titleStyle={{ fontSize: 12, color: 'white' }}

                        />
                        <Tab.Item
                            title="completed"
                            titleStyle={{ fontSize: 12, color: 'white' }}

                        />
                    </Tab>
                </View>

                <TabView value={index} onChange={setIndex} animationType="spring">
                    <TabView.Item style={{ backgroundColor: '#ffffff60', width: '100%' }}>
                        <Pending />
                    </TabView.Item>
                    <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                        <Text h1>Favorite</Text>
                    </TabView.Item>
                    <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                        <Text h1>Cart</Text>
                    </TabView.Item>
                </TabView>
            </View>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({

    headerText: {
        fontSize: 24,
        alignItems: "center",
        marginLeft: 60,
        marginTop: 2,
        color: 'red',
        fontWeight: 'bold',
    },

})

export default BookingStatus