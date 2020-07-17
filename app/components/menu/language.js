//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Picker } from 'react-native';

// create a component
class Language extends Component {
    constructor(props){
        super(props);
        this.state = {
            heading: "Language",
            data: [
                {value: 'English'}, 
                {value: 'Spanish'}, 
            ],
            language: ''
        }
    }

    render() {
        return (
            <View>
                <Text style = {styles.header}>{this.state.heading}</Text>
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
                >
                    <Picker.Item label="English" value="English" />
                    <Picker.Item label="Spanish" value="Spanish" />
                </Picker>
                <Button title="Set" color="#107E7D" style={styles.buttonStyle} onPress={()=> alert('Language features coming soon')}/>
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
        marginBottom: 10
    },
    buttonStyle: {
        borderRadius: 10,
        marginVertical: 10,
    }
  });

//make this component available to the app
export default Language;
