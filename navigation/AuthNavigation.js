import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUp from "../screens/Auth/SignUp";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    SignUp: {
      screen: SignUp,
      navigationOptions: () => ({
        gesturesEnabled: true
      })
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({ gesturesEnabled: true })
    },
    Confirm
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);
