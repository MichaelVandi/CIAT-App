//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';

// create a component
class Resources extends Component {

    render() {
        return (
            <View style={styles.container}>
              <View style={styles.resourceView}>
                <Icon
                    name = "md-search"
                    type = "ionicon"
                    raised = {true}
                    color = "#2D3047"
                  />
                <Text style={styles.resourceText}>COVID-19 Updates</Text>
              </View>

              <View style={styles.resourceView}>
                <Icon
                    name = "md-search"
                    type = "ionicon"
                    raised = {true}
                    color = "#2D3047"
                  />
                <Text style={styles.resourceText}>COVID-19 Symptoms</Text>
              </View>


              <View style={styles.resourceView}>
                <Icon
                    name = "md-search"
                    type = "ionicon"
                    raised = {true}
                    color = "#2D3047"
                  />
                <Text style={styles.resourceText}>COVID-19 Self Reporting</Text>
              </View>


              <View style={styles.resourceView}>
                <Icon
                    name = "md-search"
                    type = "ionicon"
                    raised = {true}
                    color = "#2D3047"
                  />
                <Text style={styles.resourceText}>Next Steps if you have COVID-19</Text>
              </View>

              <View style={styles.resourceView}>
                <Icon
                    name = "md-search"
                    type = "ionicon"
                    raised = {true}
                    color = "#2D3047"
                  />
                <Text style={styles.resourceText}>Health Supply Locator</Text>
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
    resourceView: {
      display: 'flex',
      flexDirection: 'row',
      
    },
    resourceText: {
      fontSize: 20,
      paddingTop: 15,
      
    }
  });

//make this component available to the app
export default Resources;
