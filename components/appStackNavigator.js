import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/home';
import EventDetails from '../screens/eventDetails';
import MyUpcomingEvents from '../screens/myEvents';
import NotificationScreen from '../screens/notifications';


export const AppStackNavigator = createStackNavigator({
    Home: {screen: HomeScreen, 
    navigationOptions: {headerShown: false}},
    Notifications: {screen: NotificationScreen, 
    navigationOptions: {headerShown: false}},
    EventDetails: {screen: EventDetails,
    navigationOptions: {headerShown: false}},
    UpcomingEvents: {screen: MyUpcomingEvents,
    navigationOptions: {headerShown: false}}
},{

    initialRouteName: 'Home'
})