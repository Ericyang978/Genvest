import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import firebase from "firebase";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignUpScreen">;
}


export default function SignUpScreen({ navigation }: Props) {
 

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [appError, setAppError] = useState<String>("")
  const [visible, setVisible] = useState<boolean>(false)

  const auth = getAuth();

  // creates account
  const createAcccount = async () => {

   try{
    const userCredential = await createUserWithEmailAndPassword(auth, username, password)
    console.log(userCredential.user)
   } 
    catch(error:any) {
      setAppError(error.code.replace('auth/', '').replace('-', ' '));
      setVisible(true);
     
  };
}

// Code for SnackBar (from docs)
const onToggleSnackBar = () => setVisible(!visible);

const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      <SafeAreaView style={styles.container}>

        <Appbar.Header>
         {/* <Appbar.BackAction onPress={() => {navigation.navigate("SignInScreen")}} /> */}
         <Appbar.Content title="Create an Account"/>
        </Appbar.Header>
      
      <Text> </Text>
        <TextInput
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
         create account
        </Button>


        <Text> </Text> 
        <Button  mode="contained" onPress={() => navigation.navigate("SignInScreen")}>
          Sign In
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
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#ffffff",
  },
});

