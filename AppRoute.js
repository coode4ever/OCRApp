import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import Edit from './src/screens/Edit';
import History from './src/screens/History';
import Home from './src/screens/Home';
import Language from './src/screens/Language';
import Preview from './src/screens/Preview';
import Settings from './src/screens/Settings';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

export default function AppRoute() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="Preview" component={Preview} />
        <Stack.Screen name="Edit" component={Edit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
