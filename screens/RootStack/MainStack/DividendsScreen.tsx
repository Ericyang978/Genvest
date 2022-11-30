import React, { useState, useEffect } from "react";
import { shuffle } from "./educationutils/ArrayUtils";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { View, TouchableOpacity, FlatList, Text, SafeAreaView } from "react-native";
import { MainStackParamList } from "./MainStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
    navigation: StackNavigationProp<MainStackParamList, "DividendsScreen">;
  }
  
  export default function DividendsScreen({ navigation }: Props) {
    const AppBarComponent = () => {
        return (
          <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.navigate("EducationScreen")}} />
          </Appbar.Header>
          
        );
      };
    return (
        <SafeAreaView>
            <AppBarComponent /> 
            <Appbar.Header>
                <Appbar.Content title="Intro to Dividends" />
            </Appbar.Header>
            <Text> </Text>
       <View style={{ padding: 20 }}>
        <FlatList
          data={[
            { key: "Dividends are a distribution of a portion of a company's earnings" },
            { key: "Typically, they are paid on a quarterly basis or 4 times a year"},
            { key: "The dividend is reflected as a percentage of the stock's value. This percentage reflects the overall annual dividend and is split evenly among the quarters"},
            { key: 'If someone owns a stock for at least 60 days in the period of 121 days centered at the dividends date, they qualify for a reduced tax rate' },
            { key: 'Otherwise, they must pay the nomimal tax rate' },
          ]}
          renderItem={({ item }) => {
            return (
              <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16 }}>{`\u2022 ${item.key}`}</Text>
              </View>
            );
          }}
        />
      </View>
      <Button mode="contained" onPress = { () => navigation.navigate("Quiz1Screen")} > 
        Intro Dividends Quiz 1
     </Button>
      <Text> </Text>
     <Button mode="contained" onPress = { () => navigation.navigate("Quiz1Screen")} > 
        Dividends Module 1
     </Button>
        </SafeAreaView>
    )
  }