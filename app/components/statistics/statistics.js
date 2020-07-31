// Import libraries
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Geolocation from 'react-native-geolocation-service';
import { apiKey } from './../globalVariables/hidden';
import { LineChart, BarChart, Grid, PieChart  } from 'react-native-svg-charts';
// import {
//   LineChart,
//   // BarChart,
// } from "react-native-chart-kit";

var deviceWidth = Dimensions.get('window').width;
// create a component
class Statistics extends Component {
  constructor(props) {
    super(props);
    var totalObject = {};
    var longitude;
    var latitude;
    this.state = {
      latitude: '',
      longitude: '',
      zipCode: '',
      city: '',
      marylandTotal: "",
      totalTests: "",
      positiveRate: "",
      totalHospitalized: "",
      criticalCondition: "",
      hospitalTrend: {
        info: {
          upperBound: 1000,
          average: 500,
          lowerBound: 2,
        },
        data: []
      },
      trendsByZip: [],
      bedsInUse: [],
      genderDistribution: [],
      testingTrend: {
        info: {
          upperBound: 1000,
          average: 500,
          lowerBound: 0,
          lowMonth: 3,
          avgMonth: 4,
          highMonth: 7,
        },
        data: []
      },
    }
    Geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      this.setState ({
        latitude: latitude,
        longitude: longitude,
      });
      this.getZipCode(latitude, longitude);
    })
  }
  UNSAFE_componentWillMount(){
    console.log('component will mount');
  }
  componentDidMount() {
    // this.getTotalObject();
  }
  getZipCode = (latitude, longitude) => {
    console.log('get zip');
    var that = this;
    let apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    apiUrl = apiUrl + latitude + "," + longitude + "&key=" + apiKey;
    // send url to google reverse geocoding api
    fetch(apiUrl)
    .then((response) => response.json())
    .then(function(data) {
  
      // get zip code from response
      if (typeof data.results[0] != 'undefined') {
        var address = data.results[0].formatted_address;
        // Split formatted address to get zip code
        var addressArray = address.split(", ")
        var city = addressArray[addressArray.length - 3];
        var zipAndState = addressArray.length - 2;
        var zip = addressArray[zipAndState].split(" ")[1];
        console.log(city + " " + zip);
        that.setState({
          zipCode: zip,
          city: city,
        })
        that.getTotalObject();
        
      } else {
        // Enter a default value
        that.setState({
          zipCode: "",
          city: 'Not Found',
        })
        
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  getTotalObject = () => {
    var that = this;
    var url = "https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_TotalCasesStatewide/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
    
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      var totalCasesObject = data.features[data.features.length - 1]["attributes"];
      var totalCasesNumber = totalCasesObject["Count_"];
      var totalCasesFormatted = totalCasesNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      that.setState({
        marylandTotal: totalCasesFormatted
      });
    });

    // Get positive rate
    var positiveRateApi = "https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_TestingVolume/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
    fetch(positiveRateApi)
    .then((response) => response.json())
    .then(function(data) {
      var highestNumOfTests = 0;
      var lowestNumOfTests = Number.MAX_VALUE;
      var lowestMonth = Number.MAX_VALUE;
      var highestMonth = Number.MIN_VALUE;
      var posData = data.features[data.features.length - 1]["attributes"];
      var posRate = posData["percent_positive"];
      var numberOfTests = posData["number_of_tests"];
      var posRateFormatted = posRate.toString() + "%";
      var testingTrend = {
        info: {
          upperBound: 1000,
          average: 500,
          lowerBound: 0,
          lowMonth: 3,
          avgMonth: 4,
          highMonth: 7,
        },
        data: []
      };
      that.setState({
        positiveRate: posRateFormatted,
        totalTests: numberOfTests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      });
      var date = new Date(data.features[data.features.length - 1]["attributes"]["date"]).getMonth();
      console.log("date : " + date);
      // Get testing volume every day
      for (var i = 0; i < data.features.length; i++) {
        let test = data.features[i]["attributes"]["number_of_tests"];
        var month = new Date(data.features[i]["attributes"]["date"]).getMonth();
        testingTrend.data.push(test);
        highestNumOfTests = Math.max(highestNumOfTests, parseInt(test));
        lowestNumOfTests = Math.min(lowestNumOfTests, parseInt(test));
        highestMonth = Math.max(highestMonth, month);
        lowestMonth = Math.min(lowestMonth, month);
      }
      var averageNumOfTests = (highestNumOfTests + lowestNumOfTests) / 2;
      var averageMonth = (highestMonth + lowestMonth) / 2;
      testingTrend.info.upperBound = Math.round(highestNumOfTests / 1000) * 1000;
      testingTrend.info.average = Math.round(averageNumOfTests / 1000) * 1000;
      testingTrend.info.lowerBound = Math.round(lowestNumOfTests / 1000) * 1000;
      testingTrend.info.lowMonth = Math.round(lowestMonth);
      testingTrend.info.highestMonth = Math.round(highestMonth);
      testingTrend.info.avgMonth = Math.round(averageMonth);
      that.setState({
        testingTrend: testingTrend,
      })

    });

    // Get Total Hospitalized
    var hospitalizedTotal = "https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_TotalHospitalizations/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
    fetch(hospitalizedTotal)
    .then((response) => response.json())
    .then(function(data) {
      var highestCount = Number.MIN_VALUE;
      var lowestCount = Number.MAX_VALUE;
      var hospitalData = data.features[data.features.length - 1]["attributes"];
      var hospitalTotal = hospitalData["Count_"];
      var hospitalTrend = {
        info: {
          upperBound: 1000,
          average: 500,
          lowerBound: 2,
        },
        data: []
      };
      var hospitalizedFormatted = hospitalTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      console.log("highest count " + highestCount);
      for (var i = 0; i < data.features.length; i++) {
        let inHospitalNow = data.features[i]["attributes"]["Count_"];
        hospitalTrend.data.push(inHospitalNow);
        if (typeof(inHospitalNow) == "number") {
          highestCount = Math.max(highestCount, parseInt(inHospitalNow));
          lowestCount = Math.min(lowestCount, parseInt(inHospitalNow));
        }
      }
      var average = (highestCount + lowestCount) / 2;
      hospitalTrend.info.upperBound = Math.round(highestCount / 1000) * 1000;
      hospitalTrend.info.lowerBound = Math.round(lowestCount / 1000) * 1000;
      hospitalTrend.info.average = Math.round(average / 1000) * 1000;

      that.setState({
        totalHospitalized: hospitalizedFormatted,
        hospitalTrend: hospitalTrend,
      })
    });

    var criticalUrl = "https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_TotalCurrentlyHospitalizedAcuteAndICU/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
    fetch(criticalUrl)
    .then((response) => response.json())
    .then(function(data) {
      var criticalData = data.features[data.features.length - 1]["attributes"];
      var criticalTotal = criticalData["Total"];
      var criticalFormatted = criticalTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var icu = criticalData["ICU"];
      var acute = criticalData["Acute"];
      var inUse = [];
      inUse.push(acute);
      inUse.push(icu);
      that.setState({
        criticalCondition: criticalFormatted,
        bedsInUse: inUse,
      })
    });

    // Get cases by Gender
    var genderUrl = "https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_CasesByGenderDistribution/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
    fetch(genderUrl)
    .then((response) => response.json())
    .then(function(data) {
      var genderData = data.features[data.features.length - 1]["attributes"];
      var male = genderData["Male"];
      var female = genderData["Female"];
      var genderDistribution = [];
      genderDistribution.push({
        key: 1,
        amount: female,
        svg: { fill: '#2D3047' }
      });
      genderDistribution.push({
        key: 0,
        amount: male,
        svg: { fill: '#088A85' }
      });
      that.setState({
        genderDistribution: genderDistribution,
      })
    });

    // Get zip code trend
    let allZipsUrl = "https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_MASTER_ZIP_CODE_CASES/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
    fetch(allZipsUrl)
    .then((response) => response.json())
    .then(function(data) {
      var dataSet =[];
      for (var i = 0; i < data.features.length; i++) {
        let allData  = data.features[i]["attributes"];
        // console.log(allData["ZIP_CODE"] + " : " + that.state.zipCode);
        if (allData["ZIP_CODE"] === that.state.zipCode) {
          // Jackpot, lets get the data
          console.log('I am here')
          var columnName = Object.keys(allData);
          columnName.forEach(function(column) {
            if (!(column.toString() === "OBJECTID" || column.toString() === "ZIP_CODE")) {
              dataSet.push(allData[column]);
              // console.log(allData[column]);
            }
          });
          that.setState({
            trendsByZip: dataSet
          })

        }
        
      }

    });



  }

  render() {
    const CUT_OFF = 20;
    console.log("gender dist: " + JSON.stringify(this.state.genderDistribution))
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    // const genderData = this.state.genderDistribution
    // .filter((value) => value > 0)
    // .map((value, index) => ({
    //     value,
    //     svg: {
    //         fill: randomColor(),
    //         onPress: () => console.log('press', index),
    //     },
    //     key: `pie-${index}`,
    // }))

    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
          <Text
            key={index}
            x={pieCentroid[ 0 ]}
            y={pieCentroid[ 1 ]}
            fill={'white'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={24}
            stroke={'black'}
            strokeWidth={0.2}
            >
            {data.amount}
          </Text>
        )
      })
    }
    return (
      <ScrollView style={{padding: 10, marginBottom: 20}}>
        {/* View For Total Section */}
        <View style={styles.dataElevationView}>
          <SwiperFlatList
            autoplay
            autoplayDelay={6}
            autoplayLoop
            index={0}
            showPagination
            paginationActiveColor="#107E7D"
            style={{paddingBottom: 30}}
          >

          <View>
            <Text style={styles.chartTitle}>Total Confirmed Cases in Maryland</Text>
            <Text style={styles.boldDataText}>{this.state.marylandTotal}</Text> 
          </View>

          <View>
            <Text style={styles.chartTitle}>Number of Tests Performed Today</Text>
            <Text style={styles.boldDataText}>{this.state.totalTests}</Text> 
          </View>

          <View>
            <Text style={styles.chartTitle}>Percentage of Positive Tests</Text>
            <Text style={styles.boldDataText}>{this.state.positiveRate}</Text> 
          </View>

          <View>
            <Text style={styles.chartTitle}>Total Patients Hospitalized</Text>
            <Text style={styles.boldDataText}>{this.state.totalHospitalized}</Text> 
          </View>

          <View>
            <Text style={styles.chartTitle}>Currently in Critical Condition</Text>
            <Text style={styles.boldDataText}>{this.state.criticalCondition}</Text> 
          </View>


          </SwiperFlatList>
        </View>
        
        {/* View For Testing Volume Trend */}
        <View style={styles.dataElevationView}>
          <SwiperFlatList
              autoplay
              autoplayDelay={10}
              autoplayLoop
              index={0}
              showPagination
              paginationActiveColor="#107E7D"
              style={{paddingBottom: 30}}
            >
            <View>
              <Text style={styles.chartTitle}>Testing Volume in Maryland</Text>
              <View style={styles.lineChartView}>
                {/* Holds the y axis label */}
                <View style = {styles.yAxisLabel}>
                  {/* Upper bound */}
                  <Text>{this.state.testingTrend.info.upperBound}</Text>
                  <Text>{this.state.testingTrend.info.average}</Text>
                  <Text>{this.state.testingTrend.info.lowerBound}</Text>
                </View>

                <View style={styles.theChartItself}>
                  <LineChart
                      style={{ height: 200, paddingHorizontal: 10 }}
                      data={this.state.testingTrend.data}
                      svg={{ stroke: 'rgb(0,128,128)' }}
                      contentInset={{ top: 20, bottom: 20 }}
                    >
                    <Grid />
                  </LineChart>
                  {/* Holds the x axis label */}
                  <View style={styles.xAxisLabel}>
                    <Text>{this.state.testingTrend.info.lowMonth}/2020</Text>
                    <Text>{this.state.testingTrend.info.avgMonth}/2020</Text>
                    <Text>{this.state.testingTrend.info.highMonth}/2020</Text>
                  </View>
                </View> 
              </View>
            </View>

            <View>
              <Text style={styles.chartTitle}>Trend of Cases in {this.state.city}</Text>
              <View style={styles.lineChartView}>
                {/* Holds the y axis label */}
                <View style = {styles.yAxisLabel}>
                  {/* Upper bound */}
                  <Text>{this.state.testingTrend.info.upperBound}</Text>
                  <Text>{this.state.testingTrend.info.average}</Text>
                  <Text>{this.state.testingTrend.info.lowerBound}</Text>
                </View>

                <View style={styles.theChartItself}>
                  <LineChart
                      style={{ height: 200, paddingHorizontal: 10 }}
                      data={this.state.trendsByZip}
                      svg={{ stroke: 'rgb(0,128,128)' }}
                      contentInset={{ top: 20, bottom: 20 }}
                    >
                    <Grid />
                  </LineChart>
                  {/* Holds the x axis label */}
                  <View style={styles.xAxisLabel}>
                    <Text>{this.state.testingTrend.info.lowMonth}/2020</Text>
                    <Text>{this.state.testingTrend.info.avgMonth}/2020</Text>
                    <Text>{this.state.testingTrend.info.highMonth}/2020</Text>
                  </View>
                </View> 
              </View>
            </View>
            
            
            </SwiperFlatList>
        </View>
        {/* View For ZipCode Trend */}
        <View style={styles.dataElevationView}>
          <SwiperFlatList
              autoplay
              autoplayDelay={10}
              autoplayLoop
              index={0}
              showPagination
              paginationActiveColor="#107E7D"
              style={{paddingBottom: 30}}
            >

            <View>
              <Text style={styles.chartTitle}>Hospitalization</Text>
              <View style={styles.lineChartView}>
                {/* Holds the y axis label */}
                <View style = {styles.yAxisLabel}>
                  {/* Upper bound */}
                  <Text>{this.state.hospitalTrend.info.upperBound}</Text>
                  <Text>{this.state.hospitalTrend.info.average}</Text>
                  <Text>{this.state.hospitalTrend.info.lowerBound}</Text>
                </View>

                <View style={styles.theChartItself}>
                  <BarChart style={{ height: 200 }} data={this.state.hospitalTrend.data} 
                      svg={{ fill: 'rgb(0,128,128)' }} contentInset={{ top: 30, bottom: 30 }}>
                    <Grid />
                  </BarChart>
                  {/* Holds the x axis label */}
                  <View style={styles.xAxisLabel}>
                    <Text>{this.state.testingTrend.info.lowMonth}/2020</Text>
                    <Text>{this.state.testingTrend.info.avgMonth}/2020</Text>
                    <Text>{this.state.testingTrend.info.highMonth}/2020</Text>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.chartTitle}>ICU and Acute Beds Currently in use</Text>
              <BarChart 
                style={{ height: 200 }} 
                data={this.state.bedsInUse} 
                svg={{ fill: 'rgb(0,128,128)' }} 
                contentInset={{ top: 30, bottom: 30 }}
                spacing={0.2}
                gridMin={0}
                >
                <Grid />
                {/* <Labels/> */}
              </BarChart>
              <View style={styles.bottomTitle}>

                <Text>Acute</Text>
                <Text>ICU</Text>
              </View>
            </View>
            
            
            </SwiperFlatList>
        </View>

        {/* View For Cases by Trend */}
        <View style={styles.dataElevationView}>
          <SwiperFlatList
              autoplay
              autoplayDelay={6}
              autoplayLoop
              index={0}
              showPagination
              paginationActiveColor="#107E7D"
              style={{paddingBottom: 30}}
            >
            <View>
              <Text style={styles.chartTitle}>Positive Cases by Gender</Text>
              <PieChart 
                style={{ height: 200 }} 
                data={this.state.genderDistribution}
                valueAccessor={({ item }) => item.amount}
                spacing={0}
                outerRadius={'95%'}
              >
              {/* <Labels/> */}
              </PieChart>
              <View style={styles.bottomTitle}>
                <Text>Male</Text>
                <Text>Female</Text>
              </View>
            </View>
            
            
            </SwiperFlatList>
        </View>
      
      </ScrollView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      
    },
    indicator:{

      alignItems: 'center',
      flex:8

    },
    offline:{
        flex:2
    },
    chartTitle: {
      width: deviceWidth,
      marginBottom: 10,
      textAlign: 'center',

    },
    boldDataText: {
      fontWeight: 'bold',
      fontSize: 30,
      color: '#107E7D',
      width: deviceWidth,
      textAlign: 'center',
    },
    dataElevationView: {
      backgroundColor: "white",
      marginBottom: 10,
    },
    bottomTitle: {
      display: 'flex',
      flexDirection: 'row',
      width: deviceWidth * 0.92,
      justifyContent: 'space-around',
    },
    lineChartView: {
      display: 'flex',
      flexDirection: 'row',
      width: deviceWidth * 0.935,
    },
    yAxisLabel: {
      height: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      marginLeft: 2
    },
    theChartItself: {
      width: '100%',
    },
    xAxisLabel: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

  });

//make this component available to the app
export default Statistics;
