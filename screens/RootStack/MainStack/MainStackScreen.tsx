import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ConnectUserScreen from "./ConnectUserScreen";
import StockScreen from "./StockScreen";
import { PortfolioScreen } from "./PortfolioScreen";

export type MainStackParamList = {
  StockScreen: undefined;
  ConnectUserScreen: undefined;
  HomeScreen: undefined;
  PortfolioScreen: undefined;
};

const MainStack = createStackNavigator<any>();

export function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name='HomeScreen'
        options={{ headerShown: false }}
        component={HomeScreen}
      />

      <MainStack.Screen
        name='StockScreen'
        options={{ headerShown: false }}
        component={StockScreen}
      />

      <MainStack.Screen
        name='PortfolioScreen'
        options={{ headerShown: false }}
        component={PortfolioScreen}
      />

      <MainStack.Screen
        name='ConnectUserScreen'
        options={{ headerShown: false }}
        component={ConnectUserScreen}
      />
    </MainStack.Navigator>
  );
}
