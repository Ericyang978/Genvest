import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ConnectUserScreen from "./ConnectUserScreen"

export type MainStackParamList = {
  HomeScreen: undefined;
  ConnectUserScreen: undefined;
  
};

const MainStack = createStackNavigator<MainStackParamList>();

export function MainStackScreen() {
  return (
    <MainStack.Navigator>

       <MainStack.Screen
        name = "HomeScreen"
        options={{ headerShown: false }}
        component={HomeScreen}
      /> 
      
      <MainStack.Screen
      name = "ConnectUserScreen"
      options={{ headerShown: false }}
      component={ConnectUserScreen}
    />


    </MainStack.Navigator>
  );
}
