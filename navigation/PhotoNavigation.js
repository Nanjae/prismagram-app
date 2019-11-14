import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { createStackNavigator } from "react-navigation-stack";
import { stackStyles } from "../components/config";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    Take: { screen: TakePhoto, navigationOptions: { tabBarLabel: "사진" } },
    Select: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "갤러리"
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: "white"
      },
      tabStyle: { height: 40 },
      activeTintColor: "black",
      inactiveTintColor: "grey",
      labelStyle: { marginBottom: 10 },
      indicatorStyle: { backgroundColor: "black" }
    }
  }
);

export default createStackNavigator(
  {
    Tabs: {
      screen: PhotoTabs,
      navigationOptions: {
        title: "사진 선택",
        headerStyle: { height: 20 },
        headerTitleStyle: { marginBottom: 20 }
      }
    },
    UploadPhoto
  },
  { defaultNavigationOptions: { headerStyle: { ...stackStyles } } }
);
