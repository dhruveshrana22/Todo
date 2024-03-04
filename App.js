import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './Screen/HomeScreen';
import Detail from './Screen/DetailScreen';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const Stack = createStackNavigator();
function App() {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Detail' component={Detail} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App;
