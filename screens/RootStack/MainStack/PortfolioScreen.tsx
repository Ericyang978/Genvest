import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { MainStackParamList } from "./MainStackScreen";
import React, { useEffect, useState } from "react";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import stockData from "./StockData";

interface Props {
  navigation: StackNavigationProp<ParamListBase, "PortfolioScreen">;
}

interface CompanyStock {
  imageURL: string;
  stockSymbol: string;
  stockPrice: number;
  increase: boolean;
  percentage: Float;
  stockName: string;
}

export let PortfolioScreen = ({ navigation }: Props) => {
    const TIMEFRAME = "1Day";

    const userStocks = ["AAPL", "BAC", "TSLA", "AAL", "GOOGL", "AMZN", "FOXA", "MSFT", "XOM", "BA"]; 
    const [lastUpdated, setLastUpdated] = useState(Date.now());
   
    useEffect(() => {
        const start = "2022-09-27T0:00:00Z";
        const end = "2022-09-28T11:00:00Z";
    
        const temp: { [key: string]: number } = {};
        const prevTemp: { [key: string]: number } = {};  
    
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
          );
    
          temp[ticker] = response.data["bars"][response.data["bars"].length - 1]["c"];
          prevTemp[ticker] = response.data["bars"][0]["c"];
          setStockPrices({ ...temp });
          setPrevStockPricse({ ...prevTemp });
        });
      }, []);

    
    const url = "wss://stream.data.sandbox.alpaca.markets/v2/iex";
    const webSocket = new WebSocket(url);
    webSocket.onopen = (event) => {
        webSocket.send(JSON.stringify({action: "auth", key: "CKCGWH2VZ2AKT1BYT9PT", secret: "wGshjHSdrm8GN9b3BXKGGgofgAFcDMf5dpkOdxzg"}))
        webSocket.send(JSON.stringify({action:"subscribe", trades:userStocks}))
    }

    const [stockPrices, setStockPrices] = useState({});
    const [prevStockPrices, setPrevStockPricse] = useState({});
    const tempWS: { [key: string]: number } = {};
    webSocket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if ('T' in parsedData[0]) {
            parsedData.forEach((info) => {
            const stockSymbol = info['S']
            const stockPrice = info['p']
            if (stockSymbol && stockPrice) {
                tempWS[stockSymbol] = stockPrice;
                
                setStockPrices({ ...tempWS })
            }
            })
        } else {
            console.log(event.data)
        }
      };
     

      const [stockItems, setStockItems] = useState({}); 
    useEffect(() => {
        setLastUpdated(Date.now())
        Object.keys(stockPrices).forEach(async (index) => {
            const prevClosePrice: Float = Number.parseFloat(prevStockPrices[index]);
            const currPrice: Float = Number.parseFloat(stockPrices[index]);
            
            const getStockName = (ticker) => {
                const currStockData = stockData.filter((stockObject) => {return stockObject.symbol === ticker})
                let currStockName = "";
                if (currStockData[0]) {
                    currStockName = currStockData[0].name
                }
                return currStockName

            }
            const stockName = getStockName(index)

            let percentage = Math.abs(currPrice - prevClosePrice) / prevClosePrice
            percentage *= 100
            percentage = Number.parseFloat(percentage.toFixed(2))
            
            let assetProfileURL = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${index.toLowerCase()}?modules=assetProfile`;
            const responseAssetProfile = await axios.get(assetProfileURL);
            let companyWebsite: string = responseAssetProfile.data.quoteSummary.result[0].assetProfile.website
            companyWebsite = companyWebsite.split('www.')[1]
            
            const imageURL = `https://logo.clearbit.com/${companyWebsite}`;

            const increase = currPrice - prevClosePrice > 0
            
            const stockElement = <StockItem key={index} navigation={navigation} stockName={stockName} percentage={percentage} increase={increase} stockSymbol={index} stockPrice={currPrice} imageURL={imageURL}/>
            if (stockItems) {
                setStockItems({...stockItems, [index]: stockElement})
            } else {
                setStockItems({index: stockElement})
            }


        })
    }, [stockPrices]);
    

    return(
        <>
        <PortfolioHeader />
        <ScrollView>
        <View style={{alignContent: 'center', alignSelf: "center", paddingTop: 10}}>
        <Text style={{color: 'grey', alignItems: "center"}}>{'Last Updated: ' + new Date(lastUpdated).toLocaleDateString() + ' ' + new Date(lastUpdated).toLocaleTimeString()}</Text>
        </View>
        
        <View style={{padding: 20}}><Text style={{fontWeight: 'bold', fontSize: 18}}>Top Movers</Text></View>
            {Object.values(stockItems).sort((item) => Object.entries(item)[4][1].percentage).slice(3)}
        <View style={{padding: 20}}><Text style={{fontWeight: 'bold', fontSize: 18}}>My Stocks</Text></View>
            {Object.values(stockItems)}
        </ScrollView>
        </>
    );
}

const PortfolioHeader = () => {
  return (
    <LinearGradient
      colors={["darkgreen", "green", "lightgreen"]}
      style={{
        borderRadius: 20,
        shadowOpacity: 0.8,
        paddingTop: 60,
        paddingBottom: 50,
        shadowRadius: 20,
      }}>
      <View
        style={{
          borderRadius: 20,
          shadowRadius: 20,
          shadowOpacity: 0.8,
          paddingVertical: 45,
        }}>
        <SafeAreaView>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              Genvest
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 45,
                fontWeight: "bold",
                fontStyle: "italic",
              }}>
              $299,375.25
            </Text>
            <Text style={{ color: "white" }}>Balance Available</Text>
          </View>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
};

interface StockItemParams {
    imageURL: string, 
    stockSymbol: string, 
    stockPrice: number, 
    increase: boolean, 
    percentage: Float, 
    stockName: string,
    navigation: any
}

const StockItem = ({imageURL, stockSymbol, stockPrice, increase, percentage, stockName, navigation}: StockItemParams) => {
    return (
        <TouchableOpacity
               onPress={() =>
                 navigation.navigate("StockScreen", {
                   stockName: stockName,
                   ticker: stockSymbol,
                 })
               }>

                <View style={{flex: 0, flexDirection: 'row', paddingLeft: 20}}>
                        <View style={{paddingRight: 5}}>
                        <Image
                            style={{height: 30, width: 30, resizeMode: 'contain'}}
                            source={{
                            uri: `${imageURL ? imageURL : 'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png'}`,
                            }}
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>{stockName}</Text>
                        <Text>{stockSymbol}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ paddingRight: 20 }}>
                        <Text>${stockPrice}</Text>
                        <View style={{borderRadius: 20, backgroundColor: `${increase ? "green" : "red"}`, padding: 3}}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>{percentage}%</Text>
                        </View>
                        </View>
                        
                    </View>
               </TouchableOpacity>
        
  );
};
