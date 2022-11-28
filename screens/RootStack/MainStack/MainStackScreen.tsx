import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StockScreen from "./StockScreen";
import ConnectUserScreen from "./ConnectUserScreen"
import HomeScreen from "./HomeScreen"

export type MainStackParamList = {
  StockScreen: undefined;
  ConnectUserScreen: undefined;
  HomeScreen: undefined;

  
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
        name = "StockScreen"
        options={{ headerShown: false }}
        component={StockScreen}
      /> 
      
      <MainStack.Screen
      name = "ConnectUserScreen"
      options={{ headerShown: false }}
      component={ConnectUserScreen}
    />


    </MainStack.Navigator>
  );
}
