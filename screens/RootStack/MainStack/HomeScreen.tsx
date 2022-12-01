import React, { useState, useEffect, useReducer } from "react";
import { View, FlatList, Text, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { MainStackParamList } from "./MainStackScreen";
import { getAuth, signOut } from "firebase/auth";
// import { getFirestore, collection, query, onSnapshot, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirestore, doc, collection, getDoc } from "firebase/firestore";
import { UserAttributes } from "../../../models/UserAttributes.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { BottomNavigation } from 'react-native-paper';
import SettingScreen from "./SettingScreen";
import {PortfolioScreen} from "./PortfolioScreen"
import EducationScreen from "./EducationScreen"
import {Ionicons} from "@expo/vector-icons";


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

   //Bottom Navigation Code 

  //  const PortfolioScreen = () => <Text> Portfolio</Text> ;


  //  const EducationRoute = () => <Text>Education</Text>;


  //  //https://materialdesignicons.com/ icons list
  //    const [index, setIndex] = useState(0);
  //    const [routes, setRoutes] = useState([
  //      { key: 'portfolio', title: 'Portfolio', focusedIcon: 'hand-coin', unfocusedIcon: 'hand-coin-outline'},
  //      { key: 'education', title: 'Education', focusedIcon: 'book', unfocusedIcon: 'book-outline' },
  //      { key: 'settings', title: 'Settings', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline'},
  //    ]);

  //    const renderScene = BottomNavigation.SceneMap({
  //     portfolio: PortfolioScreen,   
  //     education: EducationRoute,
  //     settings: SettingScreen,
  //    });

  const Tab = createBottomTabNavigator();

  return (

    <>
      <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: any = "alert";

        if (route.name === 'Portfolio') {
          iconName = focused
            ? 'cash' 
            : 'cash-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'cog': 'cog-outline';
        }
        else if (route.name === 'Education') {
          iconName = focused ? 'book': 'book-outline';
        }

        // https://icons.expo.fyi/
        return  <Ionicons name = {iconName} size={size} color={color} /> ;
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,

    })}
  >
    <Tab.Screen name="Portfolio" component={PortfolioScreen} />
    <Tab.Screen name="Education" component={EducationScreen} />
    <Tab.Screen name="Settings" component={SettingScreen} />
  </Tab.Navigator>
    </>
    
    // <BottomNavigation
    // navigationState={{ index, routes }}
    // onIndexChange={setIndex}
    // renderScene={renderScene}
    // />

    // <SafeAreaView>
       
        

    //   <AppBarComponent />
    //   <TypeOfAccount />
  
    //   <Text> current user ID: {auth.currentUser?.uid}</Text>
    //   <Button
    //     mode='contained'
    //     onPress={() => navigation.navigate("ConnectUserScreen")}>
    //     Connect User Accounts
    //   </Button>

    //   <Text> </Text>

    //   <Text> </Text>

    

    //   <Text> </Text>

    //   <Button
    //     mode='contained'
    //     onPress={() => navigation.navigate("PortfolioScreen")}>
    //     Go to Portfolio Screen
    //   </Button>

    //   <Text> </Text>

    //   <Button mode='contained' onPress={logout}>
    //     Log Out
    //   </Button>

    //   <Text> </Text> 

      
    //  </SafeAreaView>
  );
}
