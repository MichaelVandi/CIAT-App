//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import IconButton from '../../buttons/IconButton';

// create a component
class NextStepsPage extends Component {

    render() {
        const backButtonData = {
          handleClick: this.props.handleClickBackButton,
          color: '#2D3047',
          name: 'md-arrow-back',
          raised: true,
          type: 'ionicon'
        };

        return (
          <View>
            <IconButton {...backButtonData} />
            <Text>
              COVID-19 Next Steps
            </Text>
          </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({

  });

//make this component available to the app
export default NextStepsPage;
