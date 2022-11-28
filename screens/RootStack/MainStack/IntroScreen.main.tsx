import React, { useState, useEffect } from "react";
import { View, FlatList, Text, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { MainStackParamList } from "./MainStackScreen";
import { getAuth, signOut } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "IntroScreen">;
}


export default function IntroScreen({ navigation }: Props) {


  //Setting up Auth 
  const auth = getAuth();


  //Auth related methods
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
    <>
      <PortfolioHeader />
      <View style={{padding: 20}}><Text style={{fontWeight: 'bold', fontSize: 18}}>Top Movers</Text></View>
      <View style={{padding: 20}}><Text style={{fontWeight: 'bold', fontSize: 18}}>My Stocks</Text></View>
    </>
  );
}

const PortfolioHeader = () => {
  return (
    <LinearGradient colors={["darkgreen", "green", "lightgreen"]} style={{borderRadius: 20, shadowOpacity: 0.8, paddingTop: 60, paddingBottom: 50, shadowRadius: 20}}>
      <View style={{borderRadius: 20, shadowRadius: 20, shadowOpacity: 0.8, paddingVertical: 45}}>
        <SafeAreaView>
          <View style={{paddingHorizontal: 20}}>
            <Text style={{color: "white", fontWeight: 'bold', fontSize: 20}}>Genvest</Text>
            <Text style={{color: "white", fontSize: 45, fontWeight: 'bold', fontStyle: 'italic'}}>$299,375.25</Text>
            <Text style={{color: "white"}}>Balance Available</Text>
            </View>
        </SafeAreaView>
      </View>
   </LinearGradient>
  );
}