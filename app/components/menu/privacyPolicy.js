//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

// create a component
class PrivacyPolicy extends Component {
    constructor(props){
        super(props);
        this.state = {
            heading: "Privacy Policy",
        }
    }

    render() {
        return (
            <ScrollView>
            <View>

                <Text style = {styles.header}>{this.state.heading}</Text>
                
                <Text style={styles.subHeading}>Introduction</Text> 
                <Text style = {styles.content}>When you use CIAT, you trust us with your personal data. 
                    We understand this is a big responsibility and we work hard to protect your information and 
                    put you in control. This privacy policy is meant to describe the personal data we collect, 
                    how that data is used and shared and your choices regarding this data.
                </Text>

                <Text style={styles.subHeading}>Information we collect</Text> 
                <Text style = {styles.content}>There are two main types of information we collect, location and COVID 
                    test results. We collect this information to provide better services to all our users and to keep 
                    the general population safe. We do not associate your personal information with the data
                    we collect. All data collected is  is encrypted as an additional layer of security
                    and stored locally on your device giving you full control of your information.
            
                </Text>

                <Text style={styles.subHeading}>We do not collect your personal data</Text> 
                <Text style = {styles.content}>We provide background bluetooth 
                    tracking so if you were to come in contact with someone who might have COVID-19, you can take the next steps 
                    to get tested or self isolate. We rely heavily on users to self-report their COVID-19 test results so that we can 
                    notify everyone they have come in contact with as quickly as possible. Since we do not collect personal information,
                    no parties involved will ever know who you are, who you've been in contact with or where you went.
                </Text>

                <Text style={styles.subHeading}>Sharing your information</Text> 
                <Text style = {styles.content}>We do not share your location or identity with any users or organizations.
                    If someone tests positive for COVID-19, we only nootifyy their contacts if they choose to upload the random strings
                    their phone has been sending to a central database. These random strings are purely gibberish and have no
                    personal information about you.
                </Text>

            </View>
            </ScrollView>
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
    subHeading: {
        fontSize: 18,
        marginTop: 15,
    },
    content: {
        fontWeight: 'normal',
        textAlign: 'justify',
        marginTop: 10,
    }
  });

//make this component available to the app
export default PrivacyPolicy;
