import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      paddingHorizontal: 10,
    },
    titleText: {
      marginTop: 10,
      marginBottom: 20,
      fontWeight: "bold",
      fontSize: 30,
      textAlign: "center"
    },
    image: {
      justifyContent: "center",
      height: "45%",
      width: "100%",
      // resizeMode: "contain",
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
      alignSelf: "center",
      width: 350, //cursed cuz hard coded
    },
    resetPasswordButton: {
      marginTop: -20,
      marginBottom: 10,
      alignSelf: "center",
      left: 120, //also cursed cuz hard coded
      width: 350, //cursed cuz hard coded
    },
    signUpButton: {
      marginBottom: 10,
      alignSelf: "center",
      width: 200, //cursed cuz hard coded
    },
  
  
  });
  