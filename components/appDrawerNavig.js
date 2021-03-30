import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './appTabNavigator';
import Settings from '../screens/update';
import NotificationScreen from '../screens/notifications';
import MyUpcomingEvents from '../screens/myEvents';
import CustomMenu from './customMenu';
import AddInvite from '../screens/createEvent';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {screen: AppTabNavigator},
    AddEvent: {screen: AddInvite},
    Settings: {screen: Settings},
    Notifications: {screen: NotificationScreen},
    UpcomingEvents: {screen: MyUpcomingEvents},
},{
    contentComponent: CustomMenu
},{
    initialRouteName: 'Home'
}
)