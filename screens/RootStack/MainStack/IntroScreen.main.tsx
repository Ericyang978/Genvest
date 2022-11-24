import React, { useState, useEffect } from "react";
import { View, FlatList, Text, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";

import { MainStackParamList } from "./MainStackScreen";
import { getAuth, signOut } from "firebase/auth";




interface Props {
  navigation: StackNavigationProp<MainStackParamList, "IntroScreen">;
}


export default function IntroScreen({ navigation }: Props) {

  const auth = getAuth();

  const logout = async () => {
    console.log("Hello")
      signOut(auth).then(() => {
      console.log("signed out ")
    }).catch((error) => {
      console.log("error in introScreen " + error.messsage );
    });
    return signOut;
  }

  return(
    <SafeAreaView>
     <Text> Hello </Text>
     <Button mode="contained" onPress={logout} > 
        Bruh
     </Button>
    </SafeAreaView>

  );
}
