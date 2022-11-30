import React, { useState, useEffect, useReducer } from "react";
import { View, FlatList, Text, SafeAreaView} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, Searchbar, TextInput, Snackbar, Button, Card } from "react-native-paper";
import { MainStackParamList } from "./MainStackScreen";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, collection, query, getDoc, getDocs, updateDoc, where } from "firebase/firestore"; 
import { UserAttributes } from "../../../models/UserAttributes.js";
import { useNavigation } from "@react-navigation/native";





interface Props {
  navigation: StackNavigationProp<MainStackParamList, "SettingScreen">;
}


export default function SettingScreen({ navigation }: Props) {

//    //snack bar
//    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
//    const [visible, setVisible] = useState<boolean>(false);
//    const [allUserIDs, setAllUserIDs] = useState<string[]>([])
//    const [allUserEmails, setAllUserEmails] = useState<string[]>([])


//    //Text input Email Search
//    const [searchedEmail, setSearchedEmail] = useState<string>("");


//     //Defining auth
//   const auth = getAuth();
//     //Defining up Database
//   const db = getFirestore();
//   const socialsCollection = collection(db, "UserAttributes");

//    //Initializes an array which contains all user's and their emails
//   //  useEffect(() => {
//   //   const unsubscribe = onSnapshot(query(socialsCollection), (querySnapshot) => {
//   //     let tempUserIDs: string[] = [];
//   //     let tempUserEmails: string[] = [];
//   //       querySnapshot.forEach((userAttributeDoc: any) => {
//   //         const tempUserIDValue: string = userAttributeDoc.id;
//   //         const tempUserEmailValue: string = userAttributeDoc.data().email
//   //           //this if statement makes sure that the user him/herself doesn't appear as a possible connection
//   //           //and that documents with empty emails (meaning invalid docs basically, since all users should
//   //           //have a doc that has an email since this process occurs when they first sign in) are ommitted 
//   //           if(auth.currentUser?.uid !==  tempUserIDValue && tempUserEmailValue!== ""){
//   //             tempUserIDs.push(tempUserIDValue);
//   //             tempUserEmails.push(tempUserEmailValue);

//   //           }
//   //       });
//   //       setAllUserIDs(tempUserIDs);
//   //       setAllUserEmails(tempUserEmails);
//   //     });
//   //   return unsubscribe;
//   // }, []);



  



// //   //Adds contact to a user's contact list (need concent from the other user, will work on later)
//   const addContact = async () =>{

//     //searches for a document with the same email, UserAttribute Doc will be null if not found
//     const UserAttributeRef = collection(db, "UserAttributes");
//     const UserAttributeDoc = query(UserAttributeRef, where("email", "==", searchedEmail.toLowerCase()));
    

//        //Finds the Doc with this email. Little bit sus since this assumes
//         //mutliple documents have the same email (hence getDocs), however only 
//         //one should have this email, so I declare the searchedUserEmail as a string
//         //and not [string]
//         const queryUserAttributeSnapshot = await getDocs(UserAttributeDoc);

        
//         let searchedUserID: string = "";

//         queryUserAttributeSnapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           console.log(doc.id, " => ", doc.data());
//            searchedUserID = doc.id;
//         });

        
//     console.log("Hello")

//     //makes sure a use is signed in, and that the email is valid (I.e. there is a user w/ that email)
//     if(auth.currentUser !== null &&  searchedUserID!==""){
    

//         //Finds the user's own document too to reference if the contact email already exists
//         const docRef = doc(db, "UserAttributes", auth.currentUser.uid );
//         const currentUserAttributeDoc = await getDoc(docRef)
//         const currentUserConnections =  currentUserAttributeDoc.data() as UserAttributes;

//        //checks to make sure this user isn't already a conection,
//         if ( (!currentUserConnections.connectedAccounts.includes(searchedUserID)) ){

//             const newUserConnection = currentUserConnections.connectedAccounts;
//             newUserConnection.push(searchedUserID);

//             await updateDoc(doc(db, "UserAttributes", auth.currentUser.uid ), {
//                 connectedAccounts: newUserConnection,
//             }); 
//             setSnackBarMessage("Connection confirmed")
//             setVisible(true);
//         }
//         //sends a snackbar message that the searched user is already connected to current user
//         else{
//           setSnackBarMessage("This email is already connected to your account ")
//           setVisible(true);
//         }

     

//     }
//     //sends a message saying that the email doesn't exist
//     else{
//       setSnackBarMessage("no account with this email")
//       setVisible(true);
//     }

//   };

//   const onDismissSnackBar = () => setVisible(false);
  const navigation2 = useNavigation(); 


 
  return(
    <SafeAreaView>
      <Text> hello </Text>
      <Button mode="contained" onPress={() => navigation.navigate("ConnectUserScreen")} > 
        test
     </Button>
     


    </SafeAreaView>

  );
}