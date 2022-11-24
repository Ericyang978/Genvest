import React from "react";
import { COLOR_ACCENT, COLOR_PRIMARY } from "./AppStyles";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { EntryStackScreen } from "./screens/EntryStackScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getApps, initializeApp } from 'firebase/app';

const firebaseConfig = require("./firebasekeys.json")


if (getApps().length == 0) {
  initializeApp(firebaseConfig);
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: COLOR_PRIMARY,
    accent: COLOR_ACCENT,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <EntryStackScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

// export default function App() {
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [appError, setAppError] = useState<String>("")
//   const [visible, setVisible] = useState<boolean>(false)

//   const auth = getAuth();

//   // creates account
//   const createAcccount = async () => {

//    try{
//     const userCredential = await createUserWithEmailAndPassword(auth, username, password)
//     console.log(userCredential.user)
//    } 
//     catch(error:any) {
//       setAppError(error.code.replace('auth/', '').replace('-', ' '));
//       setVisible(true);
//       // const errorCode = error.code;
//       // const errorMessage = error.message;
//       // ..
//   };
// }

// // Code for SnackBar (from docs)
// const onToggleSnackBar = () => setVisible(!visible);

// const onDismissSnackBar = () => setVisible(false);

//   return (
//     <>
//       <SafeAreaView>

//         <Appbar.Header>
//          {/* <Appbar.BackAction onPress={() => {}} /> */}
//          <Appbar.Content title="Create an Account" />
//         </Appbar.Header>
      
//       <Text> </Text>
//         <TextInput
//           label="Email"
//           value={username}
//           onChangeText={text => setUsername(text)}
//         />
//          <Text> </Text> 
//          <TextInput
//           label="password"
//           value={password}
//           secureTextEntry={true}
//           onChangeText={text => setPassword(text)}
//         /> 
        
//          <Text> </Text> 
//         <Button  mode="contained" onPress={createAcccount}>
//          create account
//         </Button>


//         <Text> </Text> 
//         {/* <Button  mode="contained" onPress={() => navigation.navigate("SignInScreen")}>
//           Sign In
//         </Button> */}

//         <Snackbar
//           duration={1000}
//           visible={visible}
//           onDismiss={onDismissSnackBar}
//         >
//          {appError}
//       </Snackbar>


//       </SafeAreaView>
//     </>
//   );

// }
