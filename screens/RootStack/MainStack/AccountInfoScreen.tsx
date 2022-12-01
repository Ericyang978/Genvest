import React, { useState, useEffect, useReducer } from "react";
import { View, FlatList, Text, SafeAreaView} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, Searchbar, TextInput, Snackbar, Button, Card } from "react-native-paper";
import { MainStackParamList } from "./MainStackScreen";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, collection, query, getDoc, getDocs, updateDoc, where } from "firebase/firestore"; 
import { UserAttributes } from "../../../models/UserAttributes";
import {styles} from "./StylesFolder/AccountInfoScreen.styles"





interface Props {
  navigation: StackNavigationProp<MainStackParamList, "AccountInfoScreen">;
}


export default function AccountInfoScreen({ navigation }: Props) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userContactArray, setUserContactArray] = useState<string[]>([""]);
  const [userAge, setUserAge] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>("");




 
  const auth = getAuth();
  //Defining up Database
  const db = getFirestore();
  const UserAttributesArray = collection(db, "UserAttributes");

  useEffect(() => {
    getUserAttributes(); 
  }, []);


  const getUserAttributes = async () =>{
    if (auth.currentUser !== null){
      const docRef = doc(db, "UserAttributes", auth.currentUser.uid );
      const currentUserAttributeDoc = await getDoc(docRef)
      let currentUserAttributes: UserAttributes = currentUserAttributeDoc.data() as UserAttributes;
      currentUserAttributes.userId = currentUserAttributeDoc.id;   
      setUserEmail(currentUserAttributes.email);
      setUserName(currentUserAttributes.name);
      setUserID(currentUserAttributes.userId);
      setUserContactArray(currentUserAttributes.connectedAccounts);
      setUserAge(currentUserAttributes.age.toString());
      setUserPhoneNumber(currentUserAttributes.phoneNumber);

     }
  }

  const confirmAccountChanges = async () =>{
    if(auth.currentUser !== null){

    await updateDoc(doc(db, "UserAttributes", auth.currentUser.uid ), {
      age: userAge,
      email: userEmail, 
      name: userName,
      phoneNumber: userPhoneNumber,
  });   }

    navigation.goBack(); 

  }

  const AppBarComponent = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {navigation.goBack()}} />
        <Appbar.Content title="Personal Info" />
      </Appbar.Header>
    );
  };
 

  return(
    <SafeAreaView style = {styles.container}>

    <AppBarComponent/>

    <View style={styles.row}> 
      <Text style = {styles.labelText}> name </Text>

      <TextInput style = {styles.textInput}
      placeholder= {userName}
      label="name"
      value={userName}
      onChangeText={text => setUserName(text)}
      />
    </View>


    <View style={styles.row}> 
      <Text  style = {styles.labelText}> email </Text>
      <TextInput style = {styles.textInput}
          keyboardType="email-address"
          placeholder= {userEmail}
          label="name"
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
      /> 
    </View>

    <View style={styles.row}> 
      <Text  style = {styles.labelText}>  age </Text>
      <TextInput style = {styles.textInput}
          keyboardType="numeric"
          placeholder= {userAge}
          label="name"
          value={userAge}
          onChangeText={text => setUserAge(text)}
      /> 
    </View>

    <View style={styles.row}> 
      <Text  style = {styles.labelText}> Phone Number </Text>
      <TextInput style = {styles.textInput}
          keyboardType="phone-pad"
          placeholder= {userPhoneNumber}
          label="Phone Number"
          value={userPhoneNumber}
          onChangeText={text => setUserPhoneNumber(text)}
      />
    </View>


    <Button onPress = {confirmAccountChanges} >
        confirm
    </Button>






     


    </SafeAreaView>

  );
}
