import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Pages/SplashScreen';
import HomeScreen from './Pages/HomeScreen';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import NavigatorCineflix from './Pages/NavigatorCineflix';
import { Provider } from 'react-redux';
import store from './redux/store';

const Stack = createNativeStackNavigator();

export default function Setter() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplashVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isSplashVisible ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="NavigatorCineflix" component={NavigatorCineflix} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
