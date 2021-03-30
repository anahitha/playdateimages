import * as React from 'react';
import {Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator} from './appStackNavigator';

export const AppTabNavigator = createBottomTabNavigator({
    home: { screen: AppStackNavigator,
        navigationOptions: {
            /*tabBarIcon: 
            <Image source= {require("../assets/request-list.png")}
            style = {{
              width: 40,
              height:40
            }}></Image>,*/
            tabBarLabel: "Home"
        }}
  });
