import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './src/Redux/reducers/index';
import appStart from './src/Components/appStart';
import LogIn from './src/Components/LogIn';

const store = createStore(reducer, applyMiddleware(thunk));

const AppNavigator = createStackNavigator({
  Home: appStart,
  Login: LogIn
},
{
  initialRouteName: "Home"
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

