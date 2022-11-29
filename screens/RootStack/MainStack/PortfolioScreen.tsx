import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { MainStackParamList } from "./MainStackScreen";
import React, { useEffect, useState } from "react";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios"

interface Props {
    navigation: StackNavigationProp<MainStackParamList, "PortfolioScreen">;
  }

export let PortfolioScreen = ({ navigation }: Props) => {
    const TIMEFRAME = "1Day";
    interface StockBarData {
        c: number;
        h: number;
        l: number;
        n: number;
        o: number;
        t: string;
    }

    const userStocks = ["AAPL", "SPOT", "TSLA"]; 
    const url = "wss://stream.data.sandbox.alpaca.markets/v2/iex";
    const webSocket = new WebSocket(url);
    webSocket.onopen = (event) => {
        webSocket.send(JSON.stringify({action: "auth", key: "CKCGWH2VZ2AKT1BYT9PT", secret: "wGshjHSdrm8GN9b3BXKGGgofgAFcDMf5dpkOdxzg"}))
        webSocket.send(JSON.stringify({action:"subscribe", trades:userStocks}))
    }

    const [stockPrices, setStockPrices] = useState({});
    webSocket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if ('T' in parsedData[0]) {
            parsedData.forEach((info) => {
            const stockSymbol = info['S']
            const stockPrice = info['p']
            if (stockSymbol && stockPrice) {
                setStockPrices({...stockPrices, [stockSymbol]: stockPrice})
            }
            })
        } else {
            console.log(event.data)
        }
    }

        
    useEffect(() => {
        
          const start = "2022-09-27T0:00:00Z";
          const end = "2022-09-28T11:00:00Z";
          userStocks.forEach(async (ticker) => {

            const response = await axios.get(
                `https://data.alpaca.markets/v2/stocks/${ticker}/bars`,
                
                {
                  headers: {
                    "Content-Type": "application/json",
                    "Apca-Api-Key-Id": "PKOWIJ6DPRMS6MHZQNWG",
                    "Apca-Api-Secret-Key": "gStXgFAxJgmzhXdyCY4dy65lrljU8wv2PbFfEk2i",
                  },
                  params: {
                    start: start,
                    end: end,
                    timeframe: TIMEFRAME,
                    adjustment: "all",
                  },
                }
              )


            const temp = {}
            response.data.bars.forEach((stockData: Object) => {
                if ('c' in stockData) {
                    const closePrice = Number.parseInt(stockData['c'])
                    temp[ticker] = closePrice;
                }
            })
            setStockPrices({...stockPrices, ...temp})
        })

    }, [])


    useEffect(() => {
        console.log(stockPrices)
    }, [stockPrices]);
    
    return(
        <>
        <PortfolioHeader />
        <ScrollView>
        <View style={{padding: 20}}><Text style={{fontWeight: 'bold', fontSize: 18}}>Top Movers</Text></View>
        <View>
        <TouchableOpacity onPress={() => navigation.navigate("StockScreen")}><StockItem stockName="Apple Inc." percentage={11} increase={false} stockSymbol="AAPL" stockPrice={1232} imageURL="https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png"/></TouchableOpacity>
        <Text> </Text>
        <StockItem stockName="Meta Inc." percentage={11} increase={true} stockSymbol="META" stockPrice={1232} imageURL="https://1000logos.net/wp-content/uploads/2016/11/meta-logo.png"/>
        <Text> </Text>
        <StockItem stockName="Google Inc." percentage={11} increase={false} stockSymbol="GOOG" stockPrice={1232} imageURL="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"/>
        <Text> </Text>
        </View>

        <View style={{padding: 20}}><Text style={{fontWeight: 'bold', fontSize: 18}}>My Stocks</Text></View>
        <View>
        <TouchableOpacity onPress={() => navigation.navigate("StockScreen")}><StockItem stockName="Apple Inc." percentage={11} increase={false} stockSymbol="AAPL" stockPrice={1232} imageURL="https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png"/></TouchableOpacity>
        <Text> </Text>
        <StockItem stockName="Amazon Inc." percentage={11} increase={true} stockSymbol="AMZN" stockPrice={1232} imageURL="https://pngimg.com/uploads/amazon/amazon_PNG13.png"/>
        <Text> </Text>
        <StockItem stockName="Boeing Inc." percentage={11} increase={false} stockSymbol="BA" stockPrice={1232} imageURL="https://impactnw.org/wp-content/uploads/2019/12/6130-300x300.png"/>
        <Text> </Text>
        <StockItem stockName="Microsoft Inc." percentage={11} increase={true} stockSymbol="MSFT" stockPrice={1232} imageURL="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"/>
        <Text> </Text>
        <StockItem stockName="Meta Inc." percentage={11} increase={true} stockSymbol="META" stockPrice={1232} imageURL="https://1000logos.net/wp-content/uploads/2016/11/meta-logo.png"/>
        <Text> </Text>
        <StockItem stockName="Google Inc." percentage={11} increase={false} stockSymbol="GOOG" stockPrice={1232} imageURL="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"/>
        <Text> </Text>
        <StockItem stockName="Rivian Inc." percentage={11} increase={true} stockSymbol="RIVN" stockPrice={1232} imageURL="https://upload.wikimedia.org/wikipedia/commons/e/ee/Rivian_Logo_Mark_Gold.png"/>
        <Text> </Text>
        <StockItem stockName="Spotify Inc." percentage={11} increase={false} stockSymbol="SPOT" stockPrice={1232} imageURL="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"/>
        <Text> </Text>
        </View>
        </ScrollView>
        </>
    );
}

const PortfolioHeader = () => {
  return (
    <LinearGradient colors={["darkgreen", "green", "lightgreen"]} style={{borderRadius: 20, shadowOpacity: 0.8, paddingTop: 60, paddingBottom: 50, shadowRadius: 20}}>
      <View style={{borderRadius: 20, shadowRadius: 20, shadowOpacity: 0.8, paddingVertical: 45}}>
        <SafeAreaView>
          <View style={{paddingHorizontal: 20}}>
            <Text style={{color: "white", fontWeight: 'bold', fontSize: 20}}>Genvest</Text>
            <Text style={{color: "white", fontSize: 45, fontWeight: 'bold', fontStyle: 'italic'}}>$299,375.25</Text>
            <Text style={{color: "white"}}>Balance Available</Text>
            </View>
        </SafeAreaView>
      </View>
   </LinearGradient>
  );
}

const StockItem = ({imageURL, stockSymbol, stockPrice, increase, percentage, stockName}: {imageURL: string, stockSymbol: string, stockPrice: number, increase: boolean, percentage: Float, stockName: string}) => {
    return (
        <View style={{flex: 0, flexDirection: 'row', paddingLeft: 20}}>
        <View style={{paddingRight: 5}}>
        <Image
            style={{height: 30, width: 30, resizeMode: 'contain'}}
            source={{
            uri: imageURL,
            }}
        />
        </View>
        <View>
            <Text style={{fontWeight: 'bold'}}>{stockName}</Text>
            <Text>{stockSymbol}</Text>
        </View>
        <View style={{flex: 1}} />
        <View style={{paddingRight: 20}}>
        <Text>${stockPrice}</Text>
        <View style={{borderRadius: 20, backgroundColor: `${increase ? "green" : "red"}`, padding: 3}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>{percentage}%</Text>
        </View>
        </View>
        
      </View>
    )
}
