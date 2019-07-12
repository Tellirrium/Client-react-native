import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './src/Redux/reducers/index';
import AppNavigator from './src/navigation/signInNavigation';
import ChatNavigator from './src/navigation/chatNavigation';

const store = createStore(reducer, applyMiddleware(thunk));

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    SignIn: AppNavigator,
    Chat: ChatNavigator
  },
  {
    initialRouteName: 'SignIn'
  }
));

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

