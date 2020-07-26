//import liraries
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
class Button extends Component {

    render() {
        const buttonData = {
            onPress: this.props.onPress,
            style: styles.button
          };

        return (
            <TouchableOpacity {...buttonData}>
              <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#848484',
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        color: '#088A85',
    }
  });

//make this component available to the app
export default Button;
