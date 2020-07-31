//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import HeaderWithIcon from '../../listings/HeaderWithIcon';
import Button from '../../buttons/Button';
const width = Dimensions.get('window').width;

// create a component
class NextStepsPage extends Component {

    render() {
        const headerData = {
          handleClick: this.props.handleClickBackButton,
          header: 'COVID-19 Next Steps',
          subheader: 'Tested Positive: N/A',
          color: '#848484',
          name: 'md-arrow-back',
          type: 'ionicon'
        },
        buttonData = {
          text: 'Okay',
          onPress: this.props.handleClickBackButton
        };

        return (
          <View style={styles.pageWrapper}>
            <HeaderWithIcon {...headerData} />
            <View style={styles.pageWrapper}>
              <ScrollView style={styles.paragraph}>
                <View>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={styles.coverImage}
                      source={require('../../../assets/images/stay_at_home_1.png')}
                    />
                  </View>
                  <Text style={styles.paragraphText}>
                    If your test is POSITIVE and you have or had symptoms of COVID-19 such as cough, shortness of breath or difficulty breathing, fever of 100⁰F or above, chills, muscle pain, sore throat, new loss of taste or smell, or gastrointestinal symptoms like nausea, vomiting, or diarrhea, you should
                      {'\n'}{'\n'}
                    - Continue to stay at home, self-isolate, and take care of yourself as above.
                    {'\n'}{'\n'}
                    - Get care or call 911 if you have trouble breathing, persistent chest pain or pressure in the chest, new confusion, inability to wake up or stay awake, bluish lips or face, or if you think it is an emergency. Advise the person you speak with that you have been diagnosed with COVID-19.
                    {'\n'}{'\n'}
                    - You can leave quarantine and isolation after:
                    {'\n'}{'\n'}
                    - You have not had a fever for 72 hours without the use of fever medications, AND
                    {'\n'}{'\n'}
                    - Your symptoms have improved (for example, your cough or shortness of breath have improved), AND
                    {'\n'}{'\n'}
                    - At least 10 days have passed since your symptoms first appeared.
                    {'\n'}{'\n'}
                    If your test is POSITIVE and you have had no symptoms of COVID-19, you should
                    {'\n'}{'\n'}
                    - Continue to stay at home and self-isolate as above.
                    {'\n'}{'\n'}
                  </Text>

                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={styles.coverImage}
                      source={require('../../../assets/images/ambulance.png')}
                    />
                  </View>

                  <Text style={styles.paragraphText}>
                    - Watch for symptoms and take care of yourself as above if they develop, including seeking care or calling 911 if you think it is an emergency.
                    {'\n'}{'\n'}
                    - You can leave quarantine and self-isolation when at least 10 days have passed since the date of your first positive test AND you have had no symptoms since the test.
                    {'\n'}{'\n'}
                    - If you develop symptoms, you should follow the guidance above for a positive test with symptoms.
                    {'\n'}{'\n'}
                    If your test is positive, please have the people you live with and close contacts
                    {'\n'}{'\n'}
                    - Stay home and self-quarantine for 14 days after their last exposure to you.
                    {'\n'}{'\n'}
                    - Those who live with you should continue to self-quarantine for 14 days after your last day of self-quarantine.
                    {'\n'}{'\n'}
                    - Check their temperature twice a day and watch for symptoms of COVID-19.
                    {'\n'}{'\n'}
                    - Stay away from people who are at higher-risk for getting very sick from COVID-19, if possible.
                    {'\n'}{'\n'}
                    - Contact their doctor for advice if they develop a fever of 100°F or above or other COVID-19 symptoms.
                    {'\n'}{'\n'}
                    - Seek immediate care or call 911 if they think it is an emergency.
                    {'\n'}{'\n'}
                    <Text style={styles.sourceText}>
                      Source: Patient First (https://www.patientfirst.com/covid-test-results{'\n'}{'\n'}
                    </Text>
                  </Text>
                </View>
              </ScrollView>
              <View style={styles.buttonWrapper}> 
                <Button {...buttonData} />
              </View>
            </View>
          </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    sourceText: {
      fontStyle: 'italic'
    },
    paragraph: {
      padding: 10, 
      marginBottom: 55
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
    coverImage: {
      width: width * 0.95,
      height: 200,
      borderRadius: 10,
      resizeMode: 'contain'
    }
  });

//make this component available to the app
export default NextStepsPage;
