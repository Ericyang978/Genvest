import React, { useState, useEffect, useReducer } from "react";
import { View, FlatList, Text, SafeAreaView} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, Searchbar, TextInput, Snackbar, Button, Card } from "react-native-paper";
import { MainStackParamList } from "./MainStackScreen";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, collection, query, getDoc, getDocs, updateDoc, where } from "firebase/firestore"; 
import { UserAttributes } from "../../../models/UserAttributes.js";
import {styles} from "./StylesFolder/ConnectUserScreen.Styles";





interface Props {
  navigation: StackNavigationProp<MainStackParamList, "ConnectUserScreen">;
}


export default function ConnectUserScreen({ navigation }: Props) {

   //snack bar
   const [snackBarMessage, setSnackBarMessage] = useState<string>("");
   const [visible, setVisible] = useState<boolean>(false);
   const [currentUserAttributes, setCurrentUserAttributes] = useState<UserAttributes>();
   const [activateUseEffect, setActivateUseEffect] = useState<boolean>(false);


   //Text input Email Search
   const [searchedEmail, setSearchedEmail] = useState<string>("");


    //Defining auth
  const auth = getAuth();
    //Defining up Database
  const db = getFirestore();
  const socialsCollection = collection(db, "UserAttributes");

 
  useEffect ( () => {
    getUserConnectedAccounts(); 
  },[activateUseEffect] );

  //function get's user's connect account information
  const getUserConnectedAccounts = async () => {
    if (auth.currentUser !== null){
      const docRef = doc(db, "UserAttributes", auth.currentUser.uid );
      const currentUserAttributeDoc = await getDoc(docRef)
      const currentUserConnections: UserAttributes =  currentUserAttributeDoc.data() as UserAttributes;
      currentUserConnections.userId = currentUserAttributeDoc.id;

      //removes the first element in the list, which is "" because thats the default email
      //in the first email
      currentUserConnections.connectedAccountEmails.shift(); 
      currentUserConnections.connectedAccounts.shift(); //same thing, makes sure the arrays correspond

  
      setCurrentUserAttributes(currentUserConnections);
    }
  }
  


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
  const addContact = async () =>{

    //searches for a document with the same email, UserAttribute Doc will be null if not found
    const UserAttributeRef = collection(db, "UserAttributes");
    const UserAttributeDoc = query(UserAttributeRef, where("email", "==", searchedEmail.toLowerCase()));
    

       //Finds the Doc with this email. Little bit sus since this assumes
        //mutliple documents have the same email (hence getDocs), however only 
        //one should have this email, so I declare the searchedUserEmail as a string
        //and not [string]
        const queryUserAttributeSnapshot = await getDocs(UserAttributeDoc);

        
        let searchedUserID: string = "";
        let searchedUserEmail: string = "";


        queryUserAttributeSnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
           searchedUserID = doc.id; //sets searched user ID to this variable
           searchedUserEmail = doc.data().email; //sets searched User email to this variable
        });

        

    //makes sure a use is signed in, and that the email is valid (I.e. there is a user w/ that email)
    if(auth.currentUser !== null &&  searchedUserID!==""){
    

        //Finds the user's own document too to reference if the contact email already exists
        const docRef = doc(db, "UserAttributes", auth.currentUser.uid );
        const currentUserAttributeDoc = await getDoc(docRef)
        const currentUserConnections =  currentUserAttributeDoc.data() as UserAttributes;

       //checks to make sure this user isn't already a conection,
        if ( (!currentUserConnections.connectedAccounts.includes(searchedUserID)) ){

            const newUserConnection = currentUserConnections.connectedAccounts;
            newUserConnection.push(searchedUserID);

            const newUserConnectionEmail = currentUserConnections.connectedAccountEmails;
            newUserConnectionEmail.push(searchedUserEmail)

            await updateDoc(doc(db, "UserAttributes", auth.currentUser.uid ), {
                connectedAccounts: newUserConnection, //adds User ID
                connectedAccountEmails: newUserConnectionEmail, //adds User email
            }); 
            setSnackBarMessage("Connection confirmed")
            setVisible(true);
            setActivateUseEffect(!activateUseEffect); //changes the value so use effect updates

        }
        //sends a snackbar message that the searched user is already connected to current user
        else{
          setSnackBarMessage("This email is already connected to your account ")
          setVisible(true);
        }

     

    }
    //sends a message saying that the email doesn't exist
    else{
      setSnackBarMessage("no account with this email")
      setVisible(true);
    }

  };

  const onDismissSnackBar = () => setVisible(false);

  //deletes contact
  const deleteContact = async (selectedUser: string) => {
    if (auth.currentUser !== null && currentUserAttributes!==undefined && currentUserAttributes.connectedAccountEmails!==null)  {
      
      let indexOfDelete: number = currentUserAttributes.connectedAccountEmails.indexOf(selectedUser);
      
       //don't need to subtract 1 since first element "" is removed, and index starts at 0
      let temporaryConnectedUserEmails = currentUserAttributes.connectedAccountEmails;
      let temporaryConnectUserIDs = currentUserAttributes.connectedAccounts;

      temporaryConnectedUserEmails.splice(indexOfDelete,1);
      temporaryConnectUserIDs.splice(indexOfDelete,1);

      //adds empty "" email to front of array to standardized
      temporaryConnectedUserEmails.unshift("")
      temporaryConnectUserIDs.unshift("")

      
      // currentUserAttributes.connectedAccountEmails.splice(indexOfDelete-1,1)
      // currentUserAttributes.connectedAccounts.splice(indexOfDelete-1,1)

        await updateDoc(doc(db, "UserAttributes", auth.currentUser.uid ), {
        connectedAccounts: temporaryConnectUserIDs, //deletes User ID
        connectedAccountEmails: temporaryConnectedUserEmails, //deletes User Email
        });

        // setSnackBarMessage("Deletion confirmed")
        // setVisible(true);

    }
    else{
    console.log("in ConnectUserScreen, either currentuserAttributes doesnt exist or the connected Accounts doesn't exist")
    }
  }

  //rendering 
  const renderContact = ({ item }: { item: string }) => {

    //determines what happens after clicking a card (go to person's account page?)
    const onPress = () => {
        //for now it is homeScreen, will be changed later
      console.log("hello");
     }

     //renders a card if the email isn't blank and the emails match the search criteria
     if (item !== ""){
        return(
            <Card style={{ margin: 10 }}>
            <Card.Title 
                title ={item}
                titleStyle = {{margin: 0}}
            />
            <Card.Actions>
              <Button icon="delete" mode="text" 
               onPress={() => deleteContact(item)} >
              delete
              </Button>
          </Card.Actions>

         </Card>
        );
    }
    else{
        return(
            <> </>
        );
    }
};

  

 
  return(
    <SafeAreaView style = {styles.container}>
      <AppBarComponent /> 

      <Text style = {styles.addAccountText}> Add Account </Text> 
  
        <TextInput style = {styles.textInput}
            keyboardType="email-address"
            label="Search by email"
            value={searchedEmail}
            onChangeText={(searchedEmail) => setSearchedEmail(searchedEmail)}
            // style={{ backgroundColor: "white", marginTop: 20, marginBottom: 20 }}
          />

      <Button  style = {styles.confirmButton} mode="contained" onPress={addContact} > 
          confirm
      </Button>


      <Snackbar style = {styles.snackBar}
          duration={800}
          visible={visible}
          onDismiss={onDismissSnackBar}
          wrapperStyle = {{ bottom:0 }}
        >
          {snackBarMessage}
        </Snackbar>

      <Text style = {styles.headerText}> Connected Accounts </Text> 
      
      <FlatList style = {styles.flatList}
        data={currentUserAttributes?.connectedAccountEmails}
         renderItem={renderContact}
         keyExtractor={(_: any, index: number) => "key-" + index}

         ListEmptyComponent={
          <Text  style = {{textAlign: "center", fontSize: 20, color: "gray"}} >
            No Contacts</Text> 
        }
      />

      
    

     


    </SafeAreaView>

  );
}
