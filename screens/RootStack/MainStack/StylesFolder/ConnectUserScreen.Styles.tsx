import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffff",
      },
    headerText: {
        fontSize: 18,
        fontWeight: "400",
        // fontFamily: "Josefin Sans",
        color: "#020000",
        textAlign: "left",
        marginTop: 50,
        marginLeft: 15,
        marginBottom: 15,
    },
    addAccountText: {
        fontSize: 18,
        fontWeight: "400",
        // fontFamily: "Josefin Sans",
        color: "#020000",
        textAlign: "left",
        marginTop: 30,
        marginLeft: 15,
        marginBottom: 15,
    },
    confirmButton: {
      marginBottom: 10,
      width: 200,
      alignSelf: "center",
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
      flatList:{
        // flex: 2,
      },
      snackBar:{
        marginBottom: 475 //lists up the snackbar
      }

  
  });
  