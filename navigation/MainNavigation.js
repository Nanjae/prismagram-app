import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";

const MainNavigation = createStackNavigator(
  {
    PhotoNavigation,
    TabNavigation,
    MessageNavigation
  },
  { headerMode: "none" }
);

export default createAppContainer(MainNavigation);
