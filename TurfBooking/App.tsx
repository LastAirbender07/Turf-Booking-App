import 'react-native-gesture-handler';
import React from 'react';
import {ModalPortal} from 'react-native-modals';
import StackNavigator from './StackNavigator';
import {Provider} from 'react-redux';
import store from './store';

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <StackNavigator />
        <ModalPortal />
      </Provider>
    </>
  );
}

export default App;
