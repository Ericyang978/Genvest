import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen from "./IntroScreen.main";

export type MainStackParamList = {
  IntroScreen: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

export function MainStackScreen() {
  return (
    <MainStack.Navigator>

       <MainStack.Screen
        name = "IntroScreen"
        options={{ headerShown: false }}
        component={IntroScreen}
      />

    </MainStack.Navigator>
  );
}
