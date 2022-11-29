import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { SafeAreaView, Image, StyleSheet, ScrollView, Text } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider, getRedirectResult} from "firebase/auth"; //used for google Auth
import { styles } from "./SignInScreen.Styles";


interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignInScreen">;
}


export default function SignInScreen({ navigation }: Props) {
  
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [appError, setAppError] = useState<String>("")
  const [visible, setVisible] = useState<boolean>(false)

  const auth = getAuth(); 
  // auth.languageCode = 'it'; //provider's OAuth flow to the user's preferred language 

  // const provider = new GoogleAuthProvider(); //google auth 


  // creates account
  const createAcccount = async () => {
   try{
    const userCredential = await signInWithEmailAndPassword(auth, username, password)
    console.log("login1");
   } 
    catch(error:any) {
      setAppError(error.code.replace('auth/', '').replace('-', ' '));
      setVisible(true);
  };
}

//Reset password method
const resetPassword = async () => {

  try{
   const userCredential = await sendPasswordResetEmail(auth, username)
  } 
   catch(error:any) {
     setAppError(error.code.replace('auth/', '').replace('-', ' '));
     setVisible(true);
  
 };
}

const onToggleSnackBar = () => setVisible(!visible);

const onDismissSnackBar = () => setVisible(false);


  return (
    <>

    
  
      <SafeAreaView >

      <Text style = {styles.titleText}> Genvest </Text> 
      
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
         <Button  style = {styles.resetPasswordButton} mode="text" onPress={resetPassword}>
          reset password
        </Button>
        
        <Button  style = {styles.logInButton} mode="contained" onPress={createAcccount}>
          Login
        </Button>

        <Button style = {styles.signUpButton} mode="text" onPress={() => navigation.navigate("SignUpScreen")}>
          Sign Up
        </Button>

       

        <Snackbar
          duration={3000}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
         {appError}
      </Snackbar>


      </SafeAreaView>
    </>
  );
}
  
