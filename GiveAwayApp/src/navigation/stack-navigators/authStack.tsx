import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../../scene/login';
import Register from '../../scene/register';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={Login}></Stack.Screen>
      <Stack.Screen name="register" component={Register}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
