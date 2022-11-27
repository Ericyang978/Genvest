import React, { useState, useEffect, useReducer } from "react";
import { View, FlatList, Text, SafeAreaView} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, Searchbar, TextInput, Snackbar, Button, Card } from "react-native-paper";
import { MainStackParamList } from "./MainStackScreen";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, collection, query, onSnapshot, getDoc, updateDoc } from "firebase/firestore"; 
import { UserAttributes } from "../../../models/UserAttributes.js";


import CardActions from "react-native-paper/lib/typescript/components/Card/CardActions";



interface Props {
  navigation: StackNavigationProp<MainStackParamList, "ConnectUserScreen">;
}


export default function HomeScreen({ navigation }: Props) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [connectUserArray, setConnectUserArray] = useState<UserAttributes[]>();


    //Defining auth
  const auth = getAuth();
    //Defining up Database
  const db = getFirestore();
  const socialsCollection = collection(db, "UserAttributes");


    //Initializes the connectUserArray in the list, which finds a user to connect accounts with
  useEffect(() => {
    const unsubscribe = onSnapshot(query(socialsCollection), (querySnapshot) => {
      let tempUserAttributeArray: UserAttributes[] = [];
        querySnapshot.forEach((userAttributeDoc: any) => {
            let newUserAttribute: UserAttributes = userAttributeDoc.data() as UserAttributes;
            newUserAttribute.userId = userAttributeDoc.id;
            //this if statement makes sure that the user him/herself doesn't appear as a possible connection
            //and that documents with empty emails (meaning invalid docs basically, since all users should
            //have a doc that has an email since this process occurs when they first sign in) are ommitted 
            if(auth.currentUser?.uid !==  newUserAttribute.userId && newUserAttribute.email !== ""){
                tempUserAttributeArray.push(newUserAttribute);
            }
        });
        //the .sort thing is an attempt to randomize the array
        setConnectUserArray(tempUserAttributeArray.sort((a, b) => 0.5 - Math.random()));
      });
    return unsubscribe;
  }, []);
  


  //App Bar (top of application)
  const AppBarComponent = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {navigation.navigate("HomeScreen")}} />
        <Appbar.Content title="Connect Accounts" />
      </Appbar.Header>
    );
  };

//   //Adds contact to a user's contact list (need concent from the other user, will work on later)
  const addContact = async (addedUser: UserAttributes ) =>{

    //makes sure a use is signed in before doing anything
    if(auth.currentUser !== null){

    
        const docRef = doc(db, "UserAttributes", auth.currentUser.uid );
        const currentUserAttributeDoc = await getDoc(docRef)
        const currentUserConnections =  currentUserAttributeDoc.data() as UserAttributes;

       //checks to make sure this user isn't already a conection
        if ( (!currentUserConnections.connectedAccounts.includes(addedUser.userId.toString())) ){

            const newUserConnection = currentUserConnections.connectedAccounts;
            newUserConnection.push(addedUser.userId.toString());

            await updateDoc(doc(db, "UserAttributes", auth.currentUser.uid ), {
                connectedAccounts: newUserConnection,
            }); 
        }

     

    }
  };

  
  

  //Renders info about the contact whcih appears, will likely
  //change search criteria from email to some username
  const renderContact = ({ item }: { item: UserAttributes }) => {

    //determines what happens after clicking a card (go to person's account page?)
    const onPress = () => {
        //for now it is homeScreen, will be changed later
      navigation.navigate("HomeScreen")
     }

     //checks to make sure the emails match the search bar
     let meetsSearchCriteria = true;
     if( item.email !== undefined  && !item.email.toUpperCase().includes(searchQuery.toUpperCase())){
         meetsSearchCriteria = false ;
     }

     //renders a card if the email isn't blank and the emails match the search criteria
     if (item.email !== undefined && meetsSearchCriteria){
        return(
            <Card onPress={onPress} style={{ margin: 10 }}>
            <Card.Title 
                title ={item.email}
                titleStyle = {{margin: 0}}
            />
        <Card.Actions>
            <Button icon="plus" mode="text" 
              onPress={() => addContact(item)}>
             Add
            </Button>

          </Card.Actions>

            
            </Card>
        );
    }
    else{
        return(
            <></>
        );
    }
};

  

 
  return(
    <SafeAreaView>
      <AppBarComponent /> 

      <Text> current user ID: {auth.currentUser?.uid}</Text>

    <Searchbar
      placeholder="Search"
      onChangeText={(query) => setSearchQuery(query)}
      value={searchQuery}
      
    />

    <FlatList
        data={connectUserArray}
         renderItem={renderContact}
         keyExtractor={(_: any, index: number) => "key-" + index}
          
       ListEmptyComponent={
           <Text  style = {{textAlign: "center", fontSize: 20, color: "gray"}} >
             No search</Text> 
         }
    />
    
    

     


    </SafeAreaView>

  );
}
