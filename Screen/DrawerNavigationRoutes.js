import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './drawerScreens/HomeScreen';
import CarMechanicScreen from './CarMechanicScreens/CarMechanic'
import BikeMechanicScreen from './BikeMechanicScreen/BikeMechanic'
import BookingScreen from './BookingScreens/BookingScreen'
import BikeBookingScreen from './BookingScreens/BikeBookingScreen'
import UpdateNameScreen from "./UpdateProfile/UpdateNameScreen"
import UpdateProfileScreen from "./UpdateProfile/UpdateProfile"
import PasswordResetScreen from "./UpdateProfile/PasswordReset"
import BookingDetails from "./BookingScreens/ConfirmedBookingDetails"
import { DrawerContent } from './Components/DrawerContent'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigatorRoutes = () => {
    return (
        <>
            <Drawer.Navigator
                screenOptions={{ headerShown: false }}
                drawerContent={(props) => <DrawerContent {...props} />}
                drawerStyle={{ width: 350 }}>
                <Drawer.Screen name="HomeScreen" component={HomeScreen} />
                <Drawer.Screen name="BookingScreen" component={BookingScreen} />
                <Drawer.Screen name="BikeBookingScreen" component={BikeBookingScreen} />
                <Drawer.Screen name="CarMechanicScreen" component={CarMechanicScreen} />
                <Drawer.Screen name="BikeMechanicScreen" component={BikeMechanicScreen} />
                <Drawer.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} />
                <Drawer.Screen name="UpdateNameScreen" component={UpdateNameScreen} />
                <Drawer.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
                <Drawer.Screen name="BookingDetails" component={BookingDetails} />
            </Drawer.Navigator>

        </>
    )
}

export default DrawerNavigatorRoutes;