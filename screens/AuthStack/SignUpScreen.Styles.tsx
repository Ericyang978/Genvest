import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      paddingHorizontal: 10,
    },
    image: {
      
      justifyContent: "center",
      height: "45%",
      width: "100%",
      // resizeMode: "contain",
    },
    titleText: {
      fontWeight: "bold",
      marginTop: -30, //cursed
      marginBottom: 10,
      fontSize: 30,
      textAlign: "center",

    },
    textInput: {
      marginBottom: 20,
      width: "90%",
      height: 50,
      alignSelf: "center",
      borderRadius: 10,    
      borderTopLeftRadius: 10,  
      borderTopRightRadius: 10,  
    },
    logInButton: {
      marginBottom: 10,
      width: 200,
      alignSelf: "center",
    },
    signUpButton: {
      marginBottom: 20,
      marginTop: 10,
      width: 200,
      alignSelf: "center",
    }
  
  });
  