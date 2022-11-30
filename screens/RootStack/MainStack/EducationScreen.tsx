import React, { useState, useEffect } from "react";
import { shuffle } from "./educationutils/ArrayUtils";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MainStackParamList } from "./MainStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./educationutils/CourseStyles";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "EducationScreen">;
}

export default function DividendsScreen({ navigation }: Props) {
  const AppBarComponent = () => {
    return (
        <SafeAreaView style = {styles.container}>
          <ScrollView style = {styles.container}>
          
        {/* <AppBarComponent />  */}
        <Text style = {styles.discoverCoursesText}> Discover Courses </Text>
        
        <TouchableOpacity onPress={() => navigation.navigate("DividendsScreen")}>
            <Image
              style = {{
                height: 121, 
                width: 340, 
                marginTop: 20,
                resizeMode: 'contain',
                
   
             }}
            resizeMode="cover"
            source = { require("./educationutils/images/mask-group1.png")}
            />
             <Text style={styles.introToInvesting}>Intro to Dividends</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={{
              height: 121,
              width: 340,
              marginTop: 20,
              resizeMode: "cover",
            }}
            source={require("./educationutils/images/mask-group.png")}
          />
          <Text style={styles.stockMarketTerms}>Stock Market Terms</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={{
              height: 121,
              width: 340,
              marginTop: 20,
              resizeMode: "cover",
            }}
            source={require("./educationutils/images/mask-group2.png")}
          />
          <Text style={styles.whatIsA401k}>What is a 401k?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={{
              height: 121,
              width: 340,
              marginTop: 20,
              resizeMode: "cover",
            }}
            source={require("./educationutils/images/mask-group3.png")}
          />
          <Text style={styles.bullishVsBearishMarkets}>
            Bullish vs Bearish Markets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{
              height: 121,
              width: 340,
              marginTop: 20,
              resizeMode: "cover",
            }}
            source={require("./educationutils/images/mask-group4.png")}
          />
          <Text style={styles.whatAreRothIRAs}>What are Roth IRAs?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={{
              height: 121,
              width: 340,
              marginTop: 20,
              resizeMode: "cover",
            }}
            source={require("./educationutils/images/mask-group5.png")}
          />
          <Text style={styles.whatIsDiversification}>
            What is Diversification?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{
              height: 121,
              width: 340,
              marginTop: 20,
              resizeMode: "cover",
            }}
            source={require("./educationutils/images/mask-group6.png")}
          />
          <Text style={styles.whatIsDollarCostAveraging}>
            What is Dollar Cost Averaging?
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/*
  <TouchableOpacity onPress={() => navigation.navigate("DividendsScreen")}>
            <View style={styles.block1View}>
            <Image
              style = {{
                height: 121, 
                width: 360, 
                resizeMode: 'cover',
                
   
             }}
            resizeMode="cover"
            source = { require("./educationutils/images/mask-group1.png")}
            />
             <Text style={styles.introToInvesting}>Intro to Dividends</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={styles.block2View}>
            <Image
             style={styles.maskGroupIcon}
             resizeMode="cover"
             source={require("./educationutils/images/mask-group.png")}
            />
            <Text style={styles.stockMarketTerms}>Stock Market Terms</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={styles.groupView}>
            <Image
            style={styles.maskGroupIcon2}
            resizeMode="cover"
            source={require("./educationutils/images/mask-group2.png")}
            />
            <Text style={styles.whatIsA401k}>What is a 401k?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.groupView1}>
            <Image
             style={styles.maskGroupIcon3}
             resizeMode="cover"
             source={require("./educationutils/images/mask-group3.png")}
            />
            <Text style={styles.bullishVsBearishMarkets}>
            Bullish vs Bearish Markets
            </Text>
        </View>
     </TouchableOpacity>
     <TouchableOpacity>
            <View style={styles.groupView2}>
            <Image
             style={styles.maskGroupIcon4}
            resizeMode="cover"
            source={require("./educationutils/images/mask-group4.png")}
            />
        <Text style={styles.whatAreRothIRAs}>What are Roth IRAs?</Text>
      </View>
            
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={styles.groupView3}>
            <Image
             style={styles.maskGroupIcon5}
             resizeMode="cover"
            source={require("./educationutils/images/mask-group5.png")}
            />
            <Text style={styles.whatIsDiversification}>
            What is Diversification?
            </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={styles.groupView4}>
            <Image
            style={styles.maskGroupIcon6}
             resizeMode="cover"
            source={require("./educationutils/images/mask-group6.png")}
            />
            <Text style={styles.whatIsDollarCostAveraging}>
            What is Dollar Cost Averaging?
            </Text>
            </View>
        </TouchableOpacity>
  */
