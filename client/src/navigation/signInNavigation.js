import { createStackNavigator } from "react-navigation";

import appStart from '../Containers/appStart';
import logIn from '../Containers/logIn';
import registration from '../Containers/registration';

const AppNavigator = createStackNavigator({
    Home: appStart,
    Login: logIn,
    Registration: registration
  },
  {
    initialRouteName: "Home"
});

export default AppNavigator;