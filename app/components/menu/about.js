//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
class About extends Component {
    constructor(props){
        super(props);
        this.state = {
            heading: "About CIAT",
            mainText: "CIAT is a COVID-19 informational and tracking application" + 
            "This app is an answer to many uncertainties related to COVID-19 as it" +
            "offers health updates, health supplies locator, visualized information on infection "+
            "rates across cities and postal codes in Maryland State." + 
            "\n\nThis application is unique because it is tailored specifically for Marylanders to" +
            "provide cues on how to safely return to social interactions and work." + 
            "The app was created based on user-centered design (UCD) approach" + 
            "taking users' needs into consideration" + 
            "CIAT was also implemented based on features and functionality suggested by users.",
        }
    }

    render() {
        return (
            <View>
                <Text style = {styles.header}>{this.state.heading}</Text>
                <Text style = {styles.content}>{this.state.mainText}</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      
    },
    textStyle: {
        fontSize: 40,
    },
    header: {
        fontWeight: 'normal',
        fontSize: 20,
        textAlign: 'center',
    },
    content: {
        fontWeight: 'normal',
        textAlign: 'justify',
        marginTop: 20,
    }
  });

//make this component available to the app
export default About;
