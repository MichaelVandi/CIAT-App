//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import HeaderWithIcon from '../../listings/HeaderWithIcon';
import Button from '../../buttons/Button';

// create a component
class ReportingPage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        text: ''
      };

      this.bindMethods();
    }

    bindMethods(){
      this.handleChangeText = this.handleChangeText.bind(this);
      this.handleClickSubmit = this.handleClickSubmit.bind(this);

      return this;
    }

    render() {
        const headerData = {
          handleClick: this.props.handleClickBackButton,
          header: 'COVID-19 Self Reporting',
          subheader: 'Last Test Date: N/A',
          color: '#848484',
          name: 'md-arrow-back',
          type: 'ionicon'
        },
        buttonData = {
          text: 'Okay',
          onPress: this.handleClickSubmit
        },
        inputdata = {
          onChangeText: this.handleChangeText,
          style: styles.input,
          value: this.state.text
        };

        return (
          <View style={styles.pageWrapper}>
            <HeaderWithIcon {...headerData} />
            <View style={styles.pageWrapper}>
              <View style={styles.paragraph}>
                <View style={styles.flexItem}>
                  <Text style={styles.inputLabel}>Label:</Text>
                </View>
                <View style={styles.flexItem}>
                  <TextInput {...inputdata}/>
                </View>
              </View>
              <View style={styles.buttonWrapper}> 
                <Button {...buttonData} />
              </View>
            </View>
          </View>
        );
    }

    handleClickSubmit() {
      console.log(this.state.text);

      // Send the data to the database
    }

    handleChangeText(newText) {
      this.setState({
        text: newText
      });
    }
}

// define your styles
const styles = StyleSheet.create({
    sourceText: {
      fontStyle: 'italic'
    },
    paragraph: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    paragraphText: {
      fontSize: 17
    },
    buttonWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute', left: 0, right: 0, bottom: 10
    },
    pageWrapper: {
      flex: 1
    },
    input: {
      borderColor: '#088A85',
      borderWidth: 1
    },
    flexItem: {
      flex: 1
    },
    inputLabel: {
      fontSize: 25
    }
  });

//make this component available to the app
export default ReportingPage;
