import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, Image } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { styles } from "./SignUpScreen.Styles";



// import firebase from "firebase";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignUpScreen">;
}


export default function SignUpScreen({ navigation }: Props) {
 

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const [appError, setAppError] = useState<String>("")
  const [visible, setVisible] = useState<boolean>(false)

  const auth = getAuth();

  //DataBase methods
  const db = getFirestore();
  
  // creates account
  const createAcccount = async () => {
    
    //makes sure the age property is filled out
    if (age !== ""){

    try{

      //creates user
      const userCredential = await createUserWithEmailAndPassword(auth, username, password)
      // console.log(userCredential.user)

      //immediately adds a new doc with the user ID as title, and lists user's age 
      await setDoc(doc(db, "UserAttributes",  auth.currentUser?.uid  || "noUser"), { 
        age: age,
        email: auth.currentUser?.email?.toLowerCase(),
        name: "",
        connectedAccounts: [""],
      });

   } 
      catch(error:any) {
        setAppError(error.code.replace('auth/', '').replace('-', ' '));
        setVisible(true);
      
      };
    }   
    else {
      setAppError("please fill out age field");
      setVisible(true);
    }
  }

// Code for SnackBar (from docs)
const onToggleSnackBar = () => setVisible(!visible);

const onDismissSnackBar = () => setVisible(false);



  return (
    <>
  
    <Image style = {styles.image}
        source ={require("../../assets/FrontCoverImage.png")}
      />
  
    <SafeAreaView style = {styles.container}>

      <Text style = {styles.titleText}
      > Welcome to Genvest</Text>
        <TextInput style = {styles.textInput}

          keyboardType='email-address'
          label="Email"
          value={username}
          onChangeText={text => setUsername(text)}
        />
         <TextInput style = {styles.textInput}
          label="password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        /> 

        <TextInput style = {styles.textInput}
          keyboardType='numeric'
          label="age"
          value={age}
          onChangeText={(text)=> setAge(text)}
          maxLength={3}  //setting limit of input
        />
        
        <Button  style = {styles.signUpButton} mode="contained" onPress={createAcccount}>
         Sign Up
        </Button>

        <Button  style = {styles.logInButton} mode="text" onPress={() => navigation.navigate("SignInScreen")}>
          Log in
        </Button>

        <Snackbar
          duration={1000}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
         {appError}
      </Snackbar>


      </SafeAreaView>
    </>
  );
}


