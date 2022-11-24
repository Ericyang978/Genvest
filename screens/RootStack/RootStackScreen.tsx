import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackScreen } from "./MainStack/MainStackScreen";
import { NavigationContainer } from "@react-navigation/native";

export type RootStackParamList = {
  Main: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export function RootStackScreen() {
  const options = { headerShown: false };
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ presentation: 'modal' }} initialRouteName="Main">
        
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={options}
        />
       
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
