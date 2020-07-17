//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
class MenuContainer extends Component {

    render() {
        const viewToShow = () => {
            switch(this.props.view) {
                case "About":
                    return "";
                case "Privacy Policy":
                    return "Pri";
                case "Language":
                    return "";
                case "FAQ":
                    return "faq";
                case "Notifications":
                    return "";
                
            }
        }

        return (
            <View style={styles.container}>

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
    indicator:{

      alignItems: 'center',
      flex:8

    },
    offline:{
        flex:2
    },
    textStyle: {
        fontSize: 40,
    }
  });

//make this component available to the app
export default MenuContainer;
