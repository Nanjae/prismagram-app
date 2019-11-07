import React from "react";
import { View } from "react-native";
import {} from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import { createStackNavigator } from "react-navigation-stack";
import MessagesLink from "../components/MessagesLink";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    }
  });

export default createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home, {
      title: "Home",
      headerRight: <MessagesLink />
    })
  },
  Search: {
    screen: stackFactory(Search, { title: "Search" })
  },
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => {
        navigation.navigate("PhotoNavigation");
      }
    }
  },
  Notifications: {
    screen: stackFactory(Notifications, { title: "Notifications" })
  },
  Profile: {
    screen: stackFactory(Profile, { title: "Profile" })
  }
});
