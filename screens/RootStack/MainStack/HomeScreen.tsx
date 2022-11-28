import React, { useState, useEffect, useReducer } from "react";
import { View, FlatList, Text, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { MainStackParamList } from "./MainStackScreen";
import { getAuth, signOut } from "firebase/auth";
// import { getFirestore, collection, query, onSnapshot, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirestore, doc, collection, getDoc } from "firebase/firestore";
import { UserAttributes } from "../../../models/UserAttributes.js";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "HomeScreen">;
}

export default function HomeScreen({ navigation }: Props) {
  const [userAttributes, setUserAttributes] = useState<UserAttributes>();

  //Setting up Auth
  const auth = getAuth();

  //Setting up Database
  const db = getFirestore();
  const socialsCollection = collection(db, "UserAttributes");

  useEffect(() => {
    //gets basic information about the logged in user from the
    //user attributes collection in firebase
    const getUserAttributes = async () => {
      if (auth.currentUser !== null) {
        const docRef = doc(db, "UserAttributes", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        //checks to make sure the doc actually exists
        if (docSnap.exists()) {
          //sets a new variable with the correct age, email, and name (if they exist)
          const tempUserAttribute: UserAttributes =
            docSnap.data() as UserAttributes;
          //sets this new variable's ID to the doc's Id, which is also the User's ID
          tempUserAttribute.userId = docSnap.id;
          setUserAttributes(tempUserAttribute);
        } else {
          // doc.data() will be undefined in this case
          console.log(
            "No such document! when trying to get user info from HomeScreen"
          );
        }
      }
    };
    getUserAttributes(); //calls the function above
  }, []);

  //Auth related methods
  const logout = async () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log("error in HomeScreen " + error.messsage);
      });
    return signOut;
  };

  //App Bar (top of application)
  const AppBarComponent = () => {
    return (
      <Appbar.Header>
        <Appbar.Content title='HomeScreen' />
      </Appbar.Header>
    );
  };

  //checks the typer of user account (custodial (<18) or regular (18+))
  const TypeOfAccount = () => {
    //checks if userAttribute age field exists, and if so if age is less than 18
    if (userAttributes?.age && userAttributes.age < 18)
      return <Text> Custodial Account {userAttributes.age}</Text>;
    else if (userAttributes?.age) {
      return <Text> Parental (normal) Account {userAttributes.age}</Text>;
    } else {
      return <Text> UserAttributes.Age does not exist!</Text>;
    }
  };

  return (
    <SafeAreaView>
      <AppBarComponent />
      <TypeOfAccount />

      <Text> current user ID: {auth.currentUser?.uid}</Text>
      <Button
        mode='contained'
        onPress={() => navigation.navigate("ConnectUserScreen")}>
        Connect User Accounts
      </Button>

      <Text> </Text>

      <Text> </Text>

      <Button
        mode='contained'
        onPress={() => navigation.navigate("StockScreen")}>
        Go to Stock Screen
      </Button>

      <Text> </Text>

      <Button mode='contained' onPress={logout}>
        Log Out
      </Button>

      <Text> </Text>

      <Text> </Text>

      <Button mode='contained' onPress={logout}>
        Log Out
      </Button>
    </SafeAreaView>
  );
}
