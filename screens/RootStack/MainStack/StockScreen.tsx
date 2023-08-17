import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  Foundation,
  AntDesign,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { COLOR_NEGATIVE, COLOR_PRIMARY } from "../../../AppStyles";

import axios from "axios";
import moment from "moment";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const TIMEFRAME = "1Day";

interface StockBarData {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: string;
}

const graphTimeConfig: { [key: string]: number } = {
  "1 Week": 7,
  "2 Weeks": 14,
  "1 Month": 30,
  "2 Months": 60,
  "3 Months": 90,
};

const StockScreen = ({ navigation, route }) => {
  const [ticker, setTicker] = useState<string>(route.params.ticker ?? "AAPL");
  const [dayOffset, setDayOffset] = useState<number>(
    graphTimeConfig["1 Month"]
  );
  const [isNegative, setIsNegative] = useState<boolean>(false);
  const [chartData, setChartData] = useState<number[] | null>(null);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const getStocks = async () => {
      const start = `${moment()
        .subtract(dayOffset, "days")
        .toISOString()
        .substring(0, 10)}T0:00:00Z`;
      const end = `${moment()
        .subtract(1, "days")
        .toISOString()
        .substring(0, 10)}T11:00:00Z`;

      const response = await axios.get(
        `https://data.alpaca.markets/v2/stocks/${ticker}/bars`,
        {
          headers: {
            "Content-Type": "application/json",
            "Apca-Api-Key-Id": "",
            "Apca-Api-Secret-Key": "",
          },
          params: {
            start: start,
            end: end,
            timeframe: TIMEFRAME,
            adjustment: "all",
          },
        }
      );

      const chartLabels: string[] = [];
      const chartData: number[] = [];

      response.data.bars.forEach(
        ({ c: close, h: high, l: low, o: open, t: time }: StockBarData) => {
          chartLabels.push(moment(time).format("MM/DD"));
          chartData.push((high + low) / 2);
        }
      );

      setChartData(chartData);
      setLabels(chartLabels);
      setIsNegative(chartData[chartData.length - 1] < chartData[0]);
      console.log(response.data);
    };

    getStocks();
  }, [dayOffset]);


  const  [companyDescription, setCompanyDescription] = useState(); 

  useEffect(() => {

    const getCompanyDesc = async (ticker: string) => {
      let assetProfileURL = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker.toLowerCase()}?modules=assetProfile`;
      console.log(assetProfileURL)
      const responseAssetProfile = await axios.get(assetProfileURL);
      const description = responseAssetProfile.data.quoteSummary.result[0].assetProfile.longBusinessSummary
      setCompanyDescription(description)
  
    }

    getCompanyDesc(ticker);

  }, [])

   
  

  return (
    <View>
      <SafeAreaView
        style={{ height: "100%", paddingTop: StatusBar.currentHeight }}>
        <ScrollView>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 12 }}>
              {route.params.stockName ?? "Apple Inc."}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "400", marginLeft: 3 }}>
              ({ticker})
            </Text>
          </View>
          {chartData && (
            <View
              style={{
                marginTop: 4,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 12,
                marginBottom: 0,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: isNegative ? COLOR_NEGATIVE : COLOR_PRIMARY,
                }}>
                ${chartData[chartData.length - 1].toFixed(2)}
              </Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginLeft: 12,
                    color: "#454444",
                  }}>
                  {(chartData[chartData.length - 1] - chartData[0]).toFixed(2)}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginLeft: 4,
                    color: isNegative ? COLOR_NEGATIVE : COLOR_PRIMARY,
                  }}>
                  ({isNegative ? "" : "+"}
                  {Math.abs(
                    ((chartData[0] - chartData[chartData.length - 1]) /
                      chartData[0]) *
                      100
                  ).toFixed(2)}
                  %)
                </Text>
              </View>
            </View>
          )}
          {chartData && (
            <LineChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: chartData,
                  },
                ],
              }}
              onDataPointClick={(data) => console.log(data)}
              width={Dimensions.get("window").width} // from react-native
              height={250}
              verticalLabelRotation={70}
              yAxisLabel='$'
              yAxisSuffix='k'
              yAxisInterval={1} // optional, defaults to 1
              withVerticalLabels={true}
              chartConfig={{
                decimalPlaces: 2, // optional, defaults to 2dp
                backgroundColor: "#000000",
                backgroundGradientFrom: "#000000",
                backgroundGradientTo: "#000000",
                color: (opacity = 1) =>
                  isNegative
                    ? `rgba(232, 46, 62, ${opacity})`
                    : `rgba(80, 217, 116, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "1",
                  strokeWidth: "2",
                  stroke: isNegative ? COLOR_NEGATIVE : COLOR_PRIMARY,
                },
                propsForBackgroundLines: {
                  stroke: "transparent",
                },
                propsForHorizontalLabels: {
                  fontSize: 8,
                },
                propsForVerticalLabels: {
                  fontSize: 8,
                },
              }}
              bezier
              style={{
                backgroundColor: "#fff",
                marginVertical: 20,
              }}
            />
          )}
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 12, alignSelf: 'center', alignContent: 'center' }}>
            {Object.keys(graphTimeConfig).map((config: string) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setDayOffset(graphTimeConfig[config as string] as number);
                  }}
                  style={{
                    padding: 4,
                    marginLeft: 12,
                    backgroundColor:
                      graphTimeConfig[config as string] == dayOffset
                        ? COLOR_PRIMARY
                        : "#000",
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{ fontSize: 10, fontWeight: "700", color: "#fff" }}>
                    {config}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ marginLeft: 12, marginRight: 12 }}>
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#3E3E3E" }}>
              About
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: "#3e3e3e",
                fontSize: 11,
                lineHeight: 20,
              }}>
              {companyDescription && companyDescription.substring(0, 500) + "..."}
            </Text>
            <View style={{ marginTop: 12 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Foundation name='dollar-bill' size={20} color='green' />
                  <Text
                    style={{
                      color: "#3e3e3e",
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 12,
                    }}>
                    Market Price
                  </Text>
                </View>
                <View>
                  {chartData && (
                    <Text
                      style={{
                        color: "#3e3e3e",
                        fontSize: 12,
                        fontWeight: "600",
                        marginLeft: 12,
                      }}>
                      {chartData[chartData.length - 1].toFixed(2)} (
                      {isNegative ? "-" : "+"}
                      {Math.abs(
                        ((chartData[0] - chartData[chartData.length - 1]) /
                          chartData[0]) *
                          100
                      ).toFixed(2)}
                      %)
                    </Text>
                  )}
                </View>
              </View>

              <View
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <FontAwesome5 name='divide' size={16} color='green' />
                  <Text
                    style={{
                      color: "#3e3e3e",
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 12,
                    }}>
                    PE Ratio
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#3e3e3e",
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 12,
                    }}>
                    45.79
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <AntDesign name='sharealt' size={16} color='green' />
                  <Text
                    style={{
                      color: "#3e3e3e",
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 12,
                    }}>
                    EPS
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#3e3e3e",
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 12,
                    }}>
                    32.54
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <FontAwesome5 name='building' size={16} color='green' />
                  <Text
                    style={{
                      color: "#3e3e3e",
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 12,
                    }}>
                    Book Value
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#3e3e3e",
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 12,
                    }}>
                    240.43
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <AntDesign name='linechart' size={16} color='green' />
                  <Text
                    style={{
                      color: "#3e3e3e",
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 12,
                    }}>
                    Bonus
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#3e3e3e",
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 12,
                    }}>
                    33.50% (FY: 2077)
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Entypo name='pie-chart' size={16} color='green' />
                  <Text
                    style={{
                      color: "#3e3e3e",
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 12,
                    }}>
                    Dividend
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: "#3e3e3e",
                      fontSize: 12,
                      fontWeight: "600",
                      marginLeft: 12,
                    }}>
                    1.50% (FY: 2077)
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 25,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}>
              <Button style={{ borderRadius: 20, width: 150 }} mode='contained'>
                Buy
              </Button>
              <Button
                style={{
                  borderRadius: 20,
                  borderColor: COLOR_PRIMARY,
                  width: 150,
                  marginLeft: 12,
                }}
                mode='outlined'>
                Sell
              </Button>
            </View>
            <View style={{justifyContent: 'center', alignSelf: 'center'}}>

            <Button onPress={() => {navigation.goBack()}} style={{ borderRadius: 20, width: 150, margin: 10 }}>
                Go Back
              </Button>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default StockScreen;
