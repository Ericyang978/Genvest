import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider, getRedirectResult} from "firebase/auth"; //used for google Auth

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
      <SafeAreaView style={styles.container}>

        <Appbar.Header>
         {/* <Appbar.BackAction onPress={() => {}} /> */}
         <Appbar.Content title="Sign in" />
        </Appbar.Header>
      
      <Text> </Text>
        <TextInput
          keyboardType='email-address'
          label="Email"
          value={username}
          onChangeText={text => setUsername(text)}
        />
         <Text> </Text> 
         <TextInput
          label="password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        /> 
        
         <Text> </Text> 
        <Button  mode="contained" onPress={createAcccount}>
          Login
        </Button>

        <Text> </Text> 
        <Button  mode="contained" onPress={() => navigation.navigate("SignUpScreen")}>
          Sign Up
        </Button>

        <Text> </Text> 
        <Button  mode="outlined" onPress={resetPassword}>
          reset password
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
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#ffffff",
  },
});
