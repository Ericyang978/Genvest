import React, { useState, useEffect, useReducer } from "react";
import { View, FlatList, Text, SafeAreaView, ScrollView} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, Searchbar, TextInput, Snackbar, Button, Card } from "react-native-paper";
import { MainStackParamList } from "./MainStackScreen";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, collection, query, getDoc, getDocs, updateDoc, where } from "firebase/firestore"; 
import { useNavigation } from "@react-navigation/native";
import {styles} from "./StylesFolder/SettingScreen.Styles"





interface Props {
  navigation: StackNavigationProp<MainStackParamList, "SettingScreen">;
}


export default function SettingScreen({ navigation }: Props) {


 //Auth related methods

 const auth = getAuth();
 const logout = async () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log("error in HomeScreen " + error.messsage);
      });
    return signOut;
  };


  const AppBarComponent = () => {
    return (
      <Appbar.Header>
        <Appbar.Content title="Settings"/>
      </Appbar.Header>
    );
  };

 
  return(
    <SafeAreaView style = {styles.container}>
        <Text style = {styles.headerText}> Settings </Text> 

        <ScrollView> 

        <Card onPress = {() => navigation.navigate("AccountInfoScreen")} style={{ margin: 10 }}>
            <Card.Title 
                title ="Account Info"
                titleStyle = {{margin: 10}}
            />
        </Card>


        <Card onPress = {() => navigation.navigate("ConnectUserScreen")} style={{ margin: 10 }}>
            <Card.Title 
                title ="Connect Acounts"
                titleStyle = {{margin: 10}}
            />
        </Card>

        <Card onPress = {logout} style={{ margin: 10 }}>
            <Card.Title 
                title ="Log Out"
                titleStyle = {{margin: 10}}
            />
        </Card>
       
{/* 
    <Button mode="contained" onPress={() => navigation.navigate("ConnectUserScreen")} > 
        Add Contact
     </Button>

     <Button mode="contained" onPress={logout} > 
        Log out
     </Button>
      */}
     </ScrollView>
     

    </SafeAreaView>

  );
}
