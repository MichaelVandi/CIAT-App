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
      trendsByZip: [],
      bedsInUse: [],
      genderDistribution: [],
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
      var posData = data.features[data.features.length - 1]["attributes"];
      var posRate = posData["percent_positive"];
      var numberOfTests = posData["number_of_tests"];
      var posRateFormatted = posRate.toString() + "%";
      that.setState({
        positiveRate: posRateFormatted,
        totalTests: numberOfTests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      });
    });

    // Get Total Hospitalized
    var hospitalizedTotal = "https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_TotalHospitalizations/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
    fetch(hospitalizedTotal)
    .then((response) => response.json())
    .then(function(data) {
      var hospitalData = data.features[data.features.length - 1]["attributes"];
      var hospitalTotal = hospitalData["Count_"];
      var hospitalizedFormatted = hospitalTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      that.setState({
        totalHospitalized: hospitalizedFormatted,
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
      genderDistribution.push(male);
      genderDistribution.push(female);
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
    console.log("gender dist: " + JSON.stringify(this.state.genderDistribution))
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    const genderData = this.state.genderDistribution
            .filter((value) => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))
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
        {/* View For ZipCode Trend */}
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
              <Text style={styles.chartTitle}>Trend of Cases in {this.state.city}</Text>
              <LineChart
                  style={{ height: 200, paddingHorizontal: 10 }}
                  data={this.state.trendsByZip}
                  svg={{ stroke: 'rgb(0,128,128)' }}
                  contentInset={{ top: 20, bottom: 20 }}
                >
                <Grid />
              </LineChart>
            </View>

            <View>
              <Text style={styles.chartTitle}>ICU and Acute Beds Currently in use</Text>
              <BarChart style={{ height: 200 }} data={this.state.bedsInUse} svg={{ fill: 'rgb(0,128,128)' }} contentInset={{ top: 30, bottom: 30 }}>
                <Grid />
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
              <PieChart style={{ height: 200 }} data={genderData}/>
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
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      marginBottom: 10,
      paddingVertical: 15,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    bottomTitle: {
      display: 'flex',
      flexDirection: 'row',
      width: deviceWidth * 0.8,
      justifyContent: 'space-around',
    }

  });

//make this component available to the app
export default Statistics;
