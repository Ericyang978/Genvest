import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginHorizontal: "auto",
        width: 400,
        backgroundColor: "white"
      },
      row: {
        flexDirection: "row",
        length: 1000,
      },

    labelText: {
        marginLeft: 15,
        marginTop: 17,
        marginBottom:20 ,
        marginRight: 0,
        flex: .15

    },
    textInput: {
      flex: .70,
      borderRadius: 10,    
      borderTopLeftRadius: 10,  
      borderTopRightRadius: 10,  
      marginBottom: 20
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
  