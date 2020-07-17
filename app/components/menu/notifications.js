//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';

// create a component
class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            heading: "Notifications",
            notifications: [
                {   title: "Contact Tracing",
                    text: 'You may have been in contact with someone who tested positive for COVID - 19 ' +
                    "Here's what you can do to keep yourself and other safe",
                    link: 'coronavirus.maryland.gov'
                }
            ]
        }
    }

    render() {
        return (
            <ScrollView>
            <View>

                <Text style = {styles.header}>{this.state.heading}</Text>
                <FlatList
                    style={styles.flatListStyle}
                    data={this.state.notifications}
                    renderItem={({item}) => (
                      <TouchableOpacity style={styles.notificationView}>
                        <View> 
                            <View style={styles.titleView}>
                                <Text style={styles.title}>{item.title}: </Text>
                                <Text style={styles.content}> {item.text}</Text> 
                            </View>
                        </View>
                      </TouchableOpacity>
                      )}
                    enableEmptySections={true}
                    keyExtractor={(item, index) => index.toString()}
                />
                

            </View>
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
    },
    flatListStyle: {
        
    },
    header: {
        fontWeight: 'normal',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    content: {
        marginTop: 5,
    },
    link: {
        fontWeight: 'normal',
        textAlign: 'justify',
        marginTop: 10,
    },
    notificationView: {
        borderBottomColor: '#2D3047',
        borderBottomWidth: 0.5,
        borderTopColor: '#2D3047',
        borderTopWidth: 0.5,
        paddingBottom: 5,
    },
    titleView: {
        display: 'flex',
        flexDirection: 'column'        
    }
    
  });

//make this component available to the app
export default Notification;
