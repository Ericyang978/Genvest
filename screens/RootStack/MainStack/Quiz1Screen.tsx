import React, { useState, useEffect } from "react";
import { shuffle } from "./educationutils/ArrayUtils";
import { quest } from "./educationutils/questions";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { View, TouchableOpacity, FlatList, Text, SafeAreaView } from "react-native";
import { MainStackParamList } from "./MainStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";

const data = Object.keys(quest)

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "Quiz1Screen">;
}

export default function Quiz1Screen({ navigation }: Props) {

  const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("")
const [options, setOptions] = useState([]);
const [numCorrect, setCorrect] = useState(0);
const [numTotal, setTotal] = useState(0);

//back button
const AppBarComponent = () => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => {navigation.navigate("DividendsScreen")}} />
    </Appbar.Header>
  );
};


//obtains next question while updating state
const nextQuestion = () => {
let index = data[numCorrect % data.length]


setQuestion(quest[index][0])
setAnswer(quest[index][1])
setOptions(shuffle([quest[index][1], quest[index][2], quest[index][3], quest[index][4]]))

};

//calls nextQuestion when the question total is changed
useEffect(
  () => {
    nextQuestion();
  },
  [
    numTotal
  ]
);

//creates buttons for answer choices
const nameButtons = [];
  for (let i = 0; i < 4; i++) {
    const j = i;
    nameButtons.push(
    <Button mode="contained" onPress={() => selectedNameChoice(j)} > 
    {options[j]}
  
    </Button>

    );
  }
  
  //updates state after answer choice is pressed
  const selectedNameChoice = (index: any) => {
    if (options[index] === answer){
     setCorrect(numCorrect + 1);
    }
    setTotal(numTotal + 1);
   };

  



return (

<SafeAreaView>
  <AppBarComponent /> 
  <Appbar.Header>
        <Appbar.Content title="Quiz 1: Dividends" />
      </Appbar.Header>
  <Text  style = {{textAlign: "center", fontSize: 36, color: "green"}} > Score: {numCorrect}/{numTotal} </Text> 
  <Text>  </Text>
  <Text style = {{textAlign: "center", fontSize: 24, color: "grey"}}> {question} </Text>
  <Text>  </Text>
  {nameButtons[0]} 
  <Text>  </Text>
  {nameButtons[1]} 
  <Text>  </Text>
  {nameButtons[2]} 
  <Text>  </Text>
  {nameButtons[3]} 
  <Text>  </Text>
</SafeAreaView>


);

}

