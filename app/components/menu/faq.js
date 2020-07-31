import React, { Component } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity, Dimensions
} from 'react-native';
import Icon from 'react-native-ionicons';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
const width = Dimensions.get('window').width;

const CONTENT = [
  {
    title: 'What Does CIAT Stand For?',
    content: 'CIAT stands for COVID-19 Information And Tracker',
  },
  {
    title: 'What is the purpose of CIAT?',
    content: 'CIAT’s main goal is to provide relevant and necessary information' + 
    'regarding COVID-19 that is tailored to your location so that you can feel safe' + 
    'resuming normal activity in your area',
  },
  {
    title: 'How does CIAT track my location?',
    content: 'CIAT does not track your location but we do use bluetooth to alert' + 
    'you if you have come in contact with anyone who might have been exposed' + 
    'to COVID-19. For my information, please check out our privacy policy.',
  },
  {
    title: 'How do I self-report my data?',
    content: 'In order to self report your data, you should visit the resources section and click' + 
    'COVID-19 self-reporting. If you have taken a COVID-19 test and received a positive result, we' + 
    'recommend self-reporting so that we can notify others you came in contact with that they might' + 
    'have been exposed too.',
  },
  {
    title: 'Why is self-reporting important?',
    content: 'CIAT relies on you to self-report in order to notify others you have come in contact with.' + 
    'Without self-reporting, we would have no way of knowing if you have COVID-19 and who we should' + 
    'contact. That being said, when we notify everyone you’ve come in contact with that they might ' + 
    'have been exposed, we do not disclose any of your information to them because we are not ' +
    'storing any of your information on this application.',
  },
];


export default class Faq extends Component {
    state = {
      activeSections: [],
      collapsed: true,
      multipleSelect: false,
    };
  
    toggleExpanded = () => {
      this.setState({ collapsed: !this.state.collapsed });
    };
  
    setSections = sections => {
      this.setState({
        activeSections: sections.includes(undefined) ? [] : sections,
      });
    };
  
    renderHeader = (section, _, isActive) => {
      return (
        <Animatable.View
          duration={400}
          style={[styles.header, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor"
        >
        <View style={styles.headerView}>
            <Text style={styles.headerText}>{section.title}</Text>
            <View style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
            {/* <Text style={{fontSize: 18, color: 'grey'}}>></Text> */}
                <Icon ios="ios-arrow-forward" 
                android="md-arrow-forward" color="grey"
                style={{padding: 5}} />
            </View>
            
        </View>
        </Animatable.View>
      );
    };
  
    renderContent(section, _, isActive) {
      return (
        <Animatable.View
          duration={400}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor"
        >
          <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
            {section.content}
          </Animatable.Text>
        </Animatable.View>
      );
    }
  
    render() {
      const { multipleSelect, activeSections } = this.state;
  
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
            <Text style={styles.title}>Frequently Asked Questions</Text>
            <Accordion
              activeSections={activeSections}
              sections={CONTENT}
              touchableComponent={TouchableOpacity}
              expandMultiple={multipleSelect}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
              onChange={this.setSections}
            />
          </ScrollView>
        </View>
      );
    }
  }
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 20,
    },
    header: {
      // backgroundColor: '#F5FCFF',
      padding: 10,
    },
    headerText: {
        width: width * 0.78,
      textAlign: 'justify',
      fontSize: 16,
    },
    headerView: {
        display: 'flex',
        flexDirection: 'row',
        width: width * 0.97,
        // justifyContent: 'space-evenly',
    },
    content: {
      padding: 20,
      // backgroundColor: '#fff',
    },
    active: {
      // backgroundColor: '#088A85',
    },
    inactive: {
      // backgroundColor: '#088A85',
    },
    selectors: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selector: {
      backgroundColor: '#F5FCFF',
      padding: 10,
    },
    activeSelector: {
      fontWeight: 'bold',
    },
    selectTitle: {
      fontSize: 14,
      fontWeight: '500',
      padding: 10,
    },
    multipleToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 30,
      alignItems: 'center',
    },
    multipleToggle__title: {
      fontSize: 16,
      marginRight: 8,
    },
  });
