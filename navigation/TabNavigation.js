import React from "react";
import { View, Image, Platform } from "react-native";
import {} from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Search from "../screens/Tabs/Search";
import Profile from "../screens/Tabs/Profile";
import Detail from "../screens/Detail";
import { createStackNavigator } from "react-navigation-stack";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import styled from "styled-components";
import { stackStyles } from "../components/config";
import styles from "../styles";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      Detail: {
        screen: Detail,
        navigationOptions: {
          headerTintColor: styles.blackColor,
          title: "탐색 탭",
          headerTitleStyle: { marginLeft: 0 }
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: { ...stackStyles }
      }
    }
  );

const Container = styled.View`
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: <MessagesLink />,
        headerTitle: (
          <Container>
            <NavIcon name={"logo-instagram"} />
            <Image
              style={{ width: 100, height: 50, marginLeft: 10 }}
              resizeMode="contain"
              source={require("../assets/logo.png")}
            />
          </Container>
        )
      }),
      navigationOptions: {
        tabBarIcon: () => (
          <NavIcon name={Platform.OS === "ios" ? "ios-home" : "md-home"} />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, { headerBackTitle: null }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate("PhotoNavigation");
        },
        tabBarIcon: (
          <NavIcon
            name={
              Platform.OS === "ios"
                ? "ios-add-circle-outline"
                : "md-add-circle-outline"
            }
          />
        )
      }
    },
    Notifications: {
      screen: stackFactory(Notifications, { title: "Notifications" }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            name={
              Platform.OS === "ios"
                ? focused
                  ? "ios-heart"
                  : "ios-heart-empty"
                : focused
                ? "md-heart"
                : "md-heart-empty"
            }
          />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, { title: "프로필" }),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-person" : "md-person"} />
        )
      }
    }
  },
  {
    initialRouteName: "Profile",
    tabBarOptions: {
      showLabel: false,
      style: { backgroundColor: "#FAFAFA" }
    }
  }
);
