//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

// create a component
class IconWithText extends Component {

    render() {
        const iconData = {
            name: this.props.name,
            type: this.props.type,
            raised: this.props.raised,
            containerStyle: {
              width: 60,
              height: 60,
              display: 'flex',
              justifyContent: 'center'
            },
            color: this.props.color,
            size: 30
          },
          buttonData = {
            onPress: this.props.handleClick
          };

        return (
            <TouchableWithoutFeedback {...buttonData}>
              <View style={styles.buttonView}>
                <Icon {...iconData}/>
                <Text style={styles.buttonText}>
                  {this.props.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    buttonText: {
      fontSize: 20,
      paddingTop: 15
    },
    buttonView: {
      display: 'flex',
      flexDirection: 'row',
      borderBottomColor: 'gray',
      borderBottomWidth: 1
    }
  });

//make this component available to the app
export default IconWithText;
