//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform, 
  Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE, Polygon, Circle } from 'react-native-maps';
import { Icon } from 'react-native-elements';
import SearchBar from 'react-native-search-bar';
import { Surface } from 'react-native-paper';
import { zipAndCities } from './../globalVariables/globalVariables';
import { zipCodePopulation } from './../globalVariables/zipCodePopulation';
import { apiKey } from './../globalVariables/hidden';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
var _this;
var deviceWidth = Dimensions.get('window').width;
const zipAndCitiesList = zipAndCities;
let url = "https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_MASTER_ZIP_CODE_CASES/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
// create a component
class Map extends Component {
  constructor(props) {
    super(props);
    this.arrayHolder = zipAndCitiesList;
    this.search1 = React.createRef();
    _this = this;
    var longitude;
    var latitude;
    this.state = {
        latitude: 38.30310300,
        longitude: -76.52231000,
        routeCoordinates: [],
        prevLatLng: {},
        coordinate: new AnimatedRegion({
         latitude: 38.964882,
         longitude: -76.840271,
         latitudeDelta: 0,
         longitudeDelta: 0
        }),
        search: '',
        showSearchView: false,
        showDataOverlay: false,
        dataSource: zipAndCitiesList,
        renderPolygons: false,
        polygon: [],
        zipCode: '',
        city: '',
        forceShowSnapShot: false,
        snapShot: {

        }
    }
    // TODO: remember to uncomment 
    Geolocation.getCurrentPosition(position => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      this.setState ({
        latitude: latitude,
        longitude: longitude,
        routeCoordinates: [],
        prevLatLng: {},
        coordinate: new AnimatedRegion({
         latitude: latitude,
         longitude: longitude,
         latitudeDelta: 0,
         longitudeDelta: 0
        })
      });
      this.getZipCode(latitude, longitude);
    })
    // this.getZipCode(latitude, longitude);
    this.getZipCode(this.state.latitude.toString(), this.state.longitude.toString());
    // alert("This page shows the rate of concentration of covid -19");
    // this.getCoords();
  }
  // This function gets data from the covid 19 api and adds the total cases to display on the map
  getZipCodesDataFromApi = () => {
    var that = this;
    var generatedPolygons = [];
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
      for (var i = 0; i < data.features.length; i++) {
        let zipCode  = data.features[i]["attributes"];
        // data.features[i][attributes]
        var columnName = Object.keys(zipCode);
        var totalCases = 0;
        var currentZip = zipCode["ZIP_CODE"];
        var newPolygon = {};
        // Add zip code to new polygon object
        newPolygon.zip = currentZip;
        // Calculate total cases in this zip code
        columnName.forEach(function(column) {
          // console.log(column.toString());
          if (!(column.toString() === "OBJECTID" || column.toString() === "ZIP_CODE")) {
            // console.log(zipCodes[column])
            totalCases = Number.isInteger(zipCode[column]) ? totalCases + zipCode[column] : totalCases;
            // console.log(totalCases);
          }
        });
        // Add total cases to the new polygon object
        newPolygon.totalCases = totalCases;
        // Add coordinates for new polygon
        var coords = that.getPointByZipCode(currentZip);
        newPolygon.coords = coords;
        var radius;
        var fillColor;
        if (totalCases > 300) {
          radius = 1500;
          fillColor = "rgba(0, 140, 255, 0.6)";
        } else if (totalCases > 150) {
          radius = 1000;
          fillColor = "rgba(0, 140, 255, 0.3)"
        } else {
          radius = 500;
          fillColor = "rgba(0, 140, 255, 0.1)"
        }
        newPolygon.radius = radius;
        newPolygon.fillColor = fillColor;
        generatedPolygons.push(newPolygon);
        
      }

    });
    // Add the new polygons to state
    this.setState({
      polygon: generatedPolygons,
      renderPolygons: true,
    })
  }
  componentDidMount() {
    this.watchID = Geolocation.watchPosition(
      position => {
        const { coordinate, routeCoordinates } =   this.state;
        const {latitude, longitude} = position.coords;
        const newCoordinate = {
          latitude,
          longitude
        };
          this.setState({
            latitude,
            longitude,
            routeCoordinates: routeCoordinates.concat([newCoordinate]),
            prevLatLng: newCoordinate
          });
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      
    );
    // Get zip codes data from api
    this.getZipCodesDataFromApi();
    // Get user's own zip code
    // this.getZipCode(this.state.latitude.toString(), this.state.longitude.toString());
    // TODO: Get snapshot
    this.getDataSnapshot(this.state.zipCode);
  }
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  searchFilter(text) {
    const newData = this.arrayHolder.filter(function(item) {
      const itemData = item.zc ? item.zc.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }
  getTotalCasesFromPolygonObject = (zipCode) => {
    var totalCases = 0;
    this.state.polygon.filter(function(item) {
      if (item.zip === zipCode) {
        totalCases = item.totalCases;
      }
    })
    // console.log(totalCases);
    // var totalCases = matches;
    return totalCases;
  }
  // I am so sorry for the redundancy here :-(
  getTotalPopulationByZipCode = (zipCode) => {
    var totalPopulation = "Not Found";
    zipCodePopulation.filter(function(item) {
      if (item.zip === zipCode) {
        totalPopulation = item.population;
      }
    });
    return totalPopulation;
  }
  getPointByZipCode = (zipCode) => {
    // Search for geo point with zip code from the zip and cities list
    const newData = this.arrayHolder.filter(function(item) {
      const itemData = item.zip ? item.zip.toUpperCase() : "".toUpperCase();
      const textData = zipCode.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    // Initialize coordinates with default value
    var coords = {
      latitude: 38.26928300,
      longitude: -76.64336000
    };
    // if data was found, add it to new coords var
    if (typeof newData[0] != "undefined") {
      coords['latitude'] = parseFloat(newData[0]["lat"]);
      coords['longitude'] = parseFloat(newData[0]["lng"]);
    }
    return coords;
  }
  // onRegionChange(region) {
  //   this.setState({ region });
  // }
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
        console.log(addressArray);
        var city = addressArray[addressArray.length - 3];
        var zipAndState = addressArray.length - 2;
        var zip = addressArray[zipAndState].split(" ")[1];
        console.log(city + " " + zip);
        that.setState({
          zipCode: zip,
          city: city,
        })
        that.getDataSnapshot(zip);
        
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
  getDataSnapshot = (zipCode) => {
    console.log('get snapshot');
    var that = this;
    console.log("In the get snap fnx" + zipCode);
    var snapShot = {};
    if (zipCode.toString().length > 1) {
      console.log("was here to look for snap" + zipCode)
      // get snap shot details
      // Search in polygons for the zi code and get total cases,
      var totalCases = this.getTotalCasesFromPolygonObject(zipCode.toString());
      console.log(totalCases);
      snapShot.totalCases = totalCases;
      // get number of icu beds in use
      var icuApi = "https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_TotalCurrentlyHospitalizedAcuteAndICU/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
      fetch(icuApi)
      .then((response) => response.json())
      .then(function(data) {
        var index = data.features.length - 1;
        var icuData = data.features[index]["attributes"];
        var icuNumber = icuData["ICU"];
        var acuteNumber = icuData["Acute"];
        snapShot.icu = icuNumber;
        snapShot.acute = acuteNumber;
        console.log("iicu num " + icuNumber);
      })
      // Get positive rate
      var positiveRateApi = "https://services.arcgis.com/njFNhDsUCentVYJW/arcgis/rest/services/MDCOVID19_TestingVolume/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
      fetch(positiveRateApi)
      .then((response) => response.json())
      .then(function(data) {
        var posData = data.features[data.features.length - 1]["attributes"];
        var posRate = posData["percent_positive"];
        var totalTests = posData["number_of_tests"];
        snapShot.infectionRate = posRate;
        snapShot.totalTests = totalTests;
        console.log("infection rate" + posRate);
      })
      // Get Population
      var totalPopulation = this.getTotalPopulationByZipCode(zipCode.toString());
      console.log("Population: " + totalPopulation);
      snapShot.population = totalPopulation;

      this.setState({
        snapShot: snapShot,
      });
    }
  }
  implementSearch = () => {
    // Get search text
    var search = this.state.search;
    var zipFromSearch = parseInt(search);
    if (zipFromSearch.toString().length ===  5 && zipFromSearch != NaN) {
      // First get lat long and change map region
      var coords = this.getPointByZipCode(zipFromSearch.toString());
      // Update region
      this.setState({
        latitude: coords.latitude,
        longitude: coords.longitude,
        forceShowSnapShot: true,
        showDataOverlay: true,
      });
      console.log("getting snap" + zipFromSearch);
      this.getZipCode(coords.latitude, coords.longitude);
      // get data snapshot
      this.getDataSnapshot(zipFromSearch);
    } else {
      alert('Enter a valid zip code or select an option from dropdown');
    }
    
  }
  updateSearch = (search) => {
     this.setState({
       search
     })
  }
  showSearchView = () => {
    this.setState({
      showSearchView: !this.state.showSearchView,
    })
  }
  showDataOverlay = () => {
    this.setState({
      showDataOverlay: !this.state.showDataOverlay,
    })
  }
  listViewSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

    render() {
      // alert(JSON.stringify(this.state));
        return (
            <View style={styles.container}>
              <MapView style = {styles.map}
                showsUserLocation
                followsUserLocation
                loadingEnabled
                region={this.getMapRegion()}>
                
                {/* // {onRegionChange={this.onRegionChange}} */}
                <Marker.Animated
                  ref = {marker => {
                    this.marker = marker;
                  }}
                  coordinate = {this.state.coordinate}
                />
                {/* <Circle
                      center = {{ latitude: 38.964882, longitude: -76.840271 }}
                      radius = {1000}
                      fillColor={'rgba(200, 300, 200, 0.5)'}
                /> */}
                {
                  // So I have decided to use circle instead but I am too lazy to
                  // change this.state.polygon to circle sorry :-<
                  this.state.renderPolygons === true && (this.state.polygon.map(polygon => (
                    <Circle
                      center = { polygon.coords }
                      radius = {polygon.radius}
                      fillColor={polygon.fillColor}
                      strokeColor = {polygon.fillColor}
                    />
                  )))
                }
                {/* {this.state.polygon.map(polygon => (
                  <Polygon
                    key={polygon.zip}
                    coordinates={polygon.coords}
                    // holes={polygon.holes}
                    strokeColor="#F00"
                    fillColor="rgba(255,0,0,0.5)"
                    strokeWidth={1}
                  />
                ))} */}
              </MapView>
              <View style={styles.topOverlay}>
                <View>
                  <TouchableOpacity style={styles.infoIconView}
                    onPress={this.showDataOverlay}>
                    <Icon
                      name = "md-information-circle-outline"
                      type = "ionicon"
                      raised = {true}
                      color = "#088A85"
                    />
                  </TouchableOpacity>
                    {this.state.showDataOverlay && 
                    (this.state.search.length < 2 || this.state.forceShowSnapShot) &&
                    <Surface style={styles.surface}>
                      <View>
                        <Text style={styles.heading}>{this.state.city} : {this.state.zipCode}</Text>
                        <View style={styles.rowView}>
                          <Text style={styles.subheading}>Total cases: </Text>
                          <Text style={styles.dataText}>{this.state.snapShot.totalCases}</Text>
                        </View>
                        <View style={styles.rowView}>
                          <Text style={styles.subheading}>Total Population: </Text>
                          <Text style={styles.dataText}>{this.state.snapShot.population}</Text>
                        </View>
                        <View style={styles.rowView}>
                          <Text style={styles.subheading}>Infection Rate: </Text>
                          <Text style={styles.dataText}>{this.state.snapShot.infectionRate}%</Text>
                        </View>
                        <View style={styles.rowView}>
                          <Text style={styles.subheading}>Total Tests: </Text>
                          <Text style={styles.dataText}>{this.state.snapShot.totalTests}</Text>
                        </View>
                        <View style={styles.rowView}>
                          <Text style={styles.subheading}>Acute Beds In Use: </Text>
                          <Text style={styles.dataText}>{this.state.snapShot.acute}</Text>
                        </View>
                        <View style={styles.rowView}>
                          <Text style={styles.subheading}>ICU Beds In Use: </Text>
                          <Text style={styles.dataText}>{this.state.snapShot.icu}</Text>
                        </View>
                        
                      </View>
                    </Surface>
                    }
                </View>
                { this.state.showSearchView &&
                <View>
                  <SearchBar
                    placeholder = "Enter city or zip code"
                    style={styles.searchBar}
                    text={this.state.search}
                    ref={this.search1}
                    onChange={e => console.log(e.nativeEvent)}
                    onChangeText={text => this.searchFilter(text)}
                    onSearchButtonPress={() => this.implementSearch()}
                  />
                  {this.state.search.length > 1 &&
                    <FlatList
                    style={styles.flatListView}
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.listViewSeparator}
                    renderItem={({item}) => (
                      <TouchableOpacity onPress={() => this.setState({search: item.zc})}>
                        <Text style={styles.listText}>{item.zc}</Text>
                      </TouchableOpacity>
                      )}
                    enableEmptySections={true}
                    keyExtractor={(item, index) => index.toString()}
                    />
                  }
                </View>
                }

                <TouchableOpacity style={styles.searchIconView}
                onPress={this.showSearchView}
                >
                  <Icon
                    name = "md-search"
                    type = "ionicon"
                    raised = {true}
                    color = "#088A85"

                  />
                </TouchableOpacity>
                
              </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      
    },
    map: {
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
    },
    topOverlay: {
      width: '100%',
      height: 0.6 * deviceWidth,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      position: 'absolute',
      top: 25,
    }, 
    infoView: {
      display: 'flex',
      flexDirection: 'column',
    },
    searchIconView: {

    },
    searchView: {
      alignSelf: 'center'
    },
    searchBar: {
      width: 0.6 * deviceWidth,
      height: 60,
      elevation: 9,
      borderRadius: 50
    },
    surface: {
      padding: 10,
      elevation: 4,
      marginHorizontal: 10,
      borderRadius: 10,
      opacity: 0.85,
      position: 'absolute',
      width: deviceWidth * 0.5,
      top: 70
    },
    rowView: {
      display: "flex",
      flexDirection: 'row',
    },
    heading: {
      fontWeight: 'bold',
      marginRight: 3,
      color: '#088A85'
    },
    subheading: {
      fontWeight: 'normal',
      marginRight: 3
    },
    dataText: {
      fontWeight: 'bold'
    },
    listItem: {
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 18,
      backgroundColor: '#fff',
    },
    listText: {
      padding: 10,

    },
    flatListView:{
      width: 0.6 * deviceWidth,
      height: 200,
      backgroundColor: 'white',
      opacity: 0.5
    }
  });

//make this component available to the app
export default Map;
