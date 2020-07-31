//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import HeaderWithIcon from '../../listings/HeaderWithIcon';

const width = Dimensions.get('window').width;
// create a component
class SymptomsPage extends Component {

    render() {
        const headerData = {
          handleClick: this.props.handleClickBackButton,
          header: 'COVID-19 Symptoms',
          color: '#848484',
          name: 'md-arrow-back',
          type: 'ionicon'
        };

        return (
          <View>
            <HeaderWithIcon {...headerData} />
            <ScrollView style={styles.paragraph}>
              <View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={styles.coverImage}
                    source={require('../../../assets/images/fever_symptoms.png')}
                  />
                </View>
                <Text style={styles.paragraphText}>
                  COVID-19 affects different people in different ways. Most infected people will develop mild to moderate illness and recover without hospitalization.{'\n'}
                  {'\n'}
                  Most common symptoms:{'\n'}
                  {'\n'}
                  - fever.{'\n'}
                  - dry cough.{'\n'}
                  - tiredness.{'\n'}
                  {'\n'}
                  </Text>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={styles.coverImage}
                      source={require('../../../assets/images/sore_throat_symptom.png')}
                    />
                  </View>
                  <Text style={styles.paragraphText}>
                  Less common symptoms:{'\n'}
                  {'\n'}
                  - aches and pains.{'\n'}
                  - sore throat.{'\n'}
                  - diarrhoea.{'\n'}
                  - conjunctivitis.{'\n'}
                  - headache.{'\n'}
                  - loss of taste or smell.{'\n'}
                  - a rash on skin, or discolouration of fingers or toes.{'\n'}
                  {'\n'}
                  Serious symptoms:{'\n'}
                  {'\n'}
                  - difficulty breathing or shortness of breath.{'\n'}
                  - chest pain or pressure.{'\n'}
                  - loss of speech or movement.{'\n'}
                  {'\n'}
                  Seek immediate medical attention if you have serious symptoms.  Always call before visiting your doctor or health facility.{'\n'}
                  {'\n'}
                  People with mild symptoms who are otherwise healthy should manage their symptoms at home. {'\n'}
                  {'\n'}
                  On average it takes 5–6 days from when someone is infected with the virus for symptoms to show, however it can take up to 14 days.{'\n'} 
                  {'\n'}
                  <Text style={styles.sourceText}>
                    Source: WHO (https://www.who.int/health-topics/coronavirus){'\n'}
                  </Text>
                </Text>
              </View>
            </ScrollView>
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
    coverImage: {
      width: width * 0.95,
      height: 200,
      borderRadius: 10,
      resizeMode: 'contain'
    }
  });

//make this component available to the app
export default SymptomsPage;
