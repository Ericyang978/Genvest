import React, { useState, useEffect, useReducer } from "react";
import { View, FlatList, Text, SafeAreaView} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, Searchbar, TextInput, Snackbar, Button, Card } from "react-native-paper";
import { MainStackParamList } from "./MainStackScreen";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, onSnapshot, getDoc } from "firebase/firestore"; 


import CardActions from "react-native-paper/lib/typescript/components/Card/CardActions";



interface Props {
  navigation: StackNavigationProp<MainStackParamList, "ConnectUserScreen">;
}


export default function HomeScreen({ navigation }: Props) {
    const [searchQuery, setSearchQuery] = useState<string>("");


    //Defining auth
  const auth = getAuth();
    //Defining up Database
  const db = getFirestore();
  const socialsCollection = collection(db, "userInfo");


    //Initializes the contact Data in the list
//   useEffect(() => {
//     const unsubscribe = onSnapshot(query(socialsCollection), (querySnapshot) => {
//       let tempContactArray: userInfoModel[] = [];
//         querySnapshot.forEach((userInfoDoc: any) => {
//             let newContactInfo: userInfoModel = userInfoDoc.data() as userInfoModel;
//             newContactInfo.userId = userInfoDoc.id;
//             tempContactArray.push(newContactInfo);
//         });
//         setContactData(tempContactArray);
//       });
//     return unsubscribe;
//   }, []);
  


  //App Bar (top of application)
  const AppBarComponent = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {navigation.navigate("HomeScreen")}} />
        <Appbar.Content title="Add Contact Screen" />
      </Appbar.Header>
    );
  };

//   //Adds contact to a user's contact list (need concent from the other user, will work on later)
//   const addContact = async (addedContactUser: userInfoModel ) =>{

//     //makes sure a use is signed in before doing anything
//     if(auth.currentUser !== null){

//         //getting informatino from the signed in user's contacts,
//         //making sure the contact doesn't already exist and that the 
//         //contact list isn't too large. Should not run into issue where
//         //promise is rejected since doc doesn't exist because in the 
//         //sign in screen a doc in this collection is immediately created
//         // when the user signs in for the first time. 
//         const docRef = doc(db, "userContacts", auth.currentUser.uid );
//         const currentUserContactDoc = await getDoc(docRef)
//        const CurrentUserContact =  currentUserContactDoc.data() as userContactModel;

//        //checks to make sure this user isn't already a contact, and limits the number of contacts
//        //a user can have
//         if ( (!CurrentUserContact.contacts.includes(addedContactUser.userId.toString()) && CurrentUserContact.contacts.length < 7) ){
//             const newContactWithAddition = CurrentUserContact.contacts;
//             newContactWithAddition.push(addedContactUser.userId.toString());
//             await setDoc(doc(db, "userContacts", auth.currentUser?.uid  || "noUser"), {
//                 contacts: newContactWithAddition,
//             }); 
//         }

     

//     }
//   };

  
  

  //Renders info about the contact whcih appears, will likely
  //change search criteria from email to some username
//   const renderContact = ({ item }: { item: userInfoModel }) => {

//     //determines what happens after clicking a card (go to person's account page?)
//     const onPress = () => {
//         //for now it is homeScreen, will be changed later
//       navigation.navigate("HomeScreen")
//      }

//      //checks to make sure the emails match the search bar
//      let meetsSearchCriteria = true;
//      if( item.Email !== undefined  && !item.Email.toUpperCase().includes(searchQuery.toUpperCase())){
//          meetsSearchCriteria = false ;
//      }

//      //renders a card if the email isn't blank and the emails match the search criteria
//      if (item.Email !== undefined && meetsSearchCriteria){
//         return(
//             <Card onPress={onPress} style={{ margin: 10 }}>
//             <Card.Title 
//                 title ={item.Email}
//                 titleStyle = {{margin: 0}}
//             />
//         <Card.Actions>
//             <Button icon="plus" mode="text" 
//               onPress={() => addContact(item)}>
//              Add
//             </Button>

//           </Card.Actions>

            
//             </Card>
//         );
//     }
//     else{
//         return(
//             <></>
//         );
//     }
// };

  

 
  return(
    <SafeAreaView>
      <AppBarComponent /> 

      <Text> current user ID: {auth.currentUser?.uid}</Text>

    <Searchbar
      placeholder="Search"
      onChangeText={(query) => setSearchQuery(query)}
      value={searchQuery}
    />

    {/* <FlatList
        data={contactData}
         renderItem={renderContact}
         keyExtractor={(_: any, index: number) => "key-" + index}
          
       ListEmptyComponent={
           <Text  style = {{textAlign: "center", fontSize: 20, color: "gray"}} >
             No search</Text> 
         }
    /> */}
    
    

     


    </SafeAreaView>

  );
}
