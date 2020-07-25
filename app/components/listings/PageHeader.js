//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

// create a component
class PageHeader extends Component {

    render() {
        const header = this.buildHeader(),
            subheader = this.buildSubHeader();

        return (
          <View style={styles.headerWrapper}>
              {header}
              {subheader}
          </View>
        );
    }

    buildHeader() {
        return (
            <Text style={styles.header}>
                {this.props.header}
            </Text>
        );
    }

    buildSubHeader() {
        let subheader = null;

        if(this.props.subheader){
            subheader = (
                <Text style={styles.subheader}>
                    {this.props.subheader}
                </Text>
            );
        }

        return subheader;
    }
}

// define your styles
const styles = StyleSheet.create({
    headerWrapper: {
        padding: 15
    },
    subheader: {
        fontSize: 16,
        textAlign: 'center'
    },
    header: {
        fontSize: 22,
        textAlign: 'center'
    }
  });

//make this component available to the app
export default PageHeader;
