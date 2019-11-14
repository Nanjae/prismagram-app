import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { createStackNavigator } from "react-navigation-stack";
import { stackStyles } from "../components/config";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    Select: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "갤러리"
      }
    },
    Take: { screen: TakePhoto, navigationOptions: { tabBarLabel: "사진" } }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: "white"
      },
      activeTintColor: "black",
      inactiveTintColor: "grey",
      indicatorStyle: { backgroundColor: "black" }
    }
  }
);

export default createStackNavigator(
  {
    Tabs: { screen: PhotoTabs, navigationOptions: { header: null } },
    UploadPhoto
  },
  { defaultNavigationOptions: { headerStyle: { ...stackStyles } } }
);
