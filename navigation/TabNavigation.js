import { View } from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

const TabNavigation = createBottomTabNavigator({
  Home,
  Search,
  Add: {
    screen: Home,
    navigationOptions: {
      tabBarOnPress: () => {
        console.log("Add");
      }
    }
  },
  Notifications,
  Profile
});

export default createAppContainer(TabNavigation);
