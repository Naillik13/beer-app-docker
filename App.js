import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import TabBarIcon from "./src/components/TabBarIcon"
import {Platform} from "react-native"

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
});

HomeStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-beer`
                    : 'md-beer'
            }
        />
    ),
};

HomeStack.path = '';

export default createAppContainer(
    createBottomTabNavigator(
        {
            Home: HomeStack
        },
        {
            tabBarOptions: {
                showLabel: false, // hide labels
            },
            initialRouteName: "Home"
        }
    )
);
