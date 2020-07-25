//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import IconWithText from '../buttons/IconWithText';
import UpdatesPage from '../resources/pages/UpdatesPage';
import SymptomsPage from '../resources/pages/SymptomsPage';
import ReportingPage from '../resources/pages/ReportingPage';
import NextStepsPage from '../resources/pages/NextStepsPage';
import SupplyLocatorPage from '../resources/pages/SupplyLocatorPage';

// create a component
class Resources extends Component {
    constructor(props) {
      super(props);

      this.state = {
        screen: 'main'
      };

      this.bindMethods();
    }

    render() {
      let markup = null;

      const screenData = {
        handleClickBackButton: this.handleClickBackButton
      };

      switch(this.state.screen) {
        case 'main': 
          markup = this.buildResourcesScreen();
          break;

        case 'updates':
          markup = <UpdatesPage {...screenData} />;
          break;

        case 'symptoms':
          markup = <SymptomsPage {...screenData} />;
          break;

        case 'reporting':
          markup = <ReportingPage {...screenData} />;
          break;

        case 'nextsteps':
          markup = <NextStepsPage {...screenData} />;
          break;

        case 'locator':
          markup = <SupplyLocatorPage {...screenData} />;
          break;

        default:
          break;
      }

      return markup;
    }

    bindMethods() {
      this.handleClickUpdatesLink = this.handleClickUpdatesLink.bind(this);
      this.handleClickBackButton = this.handleClickBackButton.bind(this);
      this.handleClickSymptomsLink = this.handleClickSymptomsLink.bind(this);
      this.handleClickReportingLink = this.handleClickReportingLink.bind(this);
      this.handleClickNextStepsLink = this.handleClickNextStepsLink.bind(this);
      this.handleClickLocatorLink = this.handleClickLocatorLink.bind(this);

      return this;
    }

    buildResourcesScreen() {
      const commonData = {
            color: '#848484',
            type: 'ionicon'
          },
          links = [
            {
              ...commonData,
              handleClick: this.handleClickUpdatesLink,
              name: 'md-globe',
              text: 'COVID-19 Updates'
            },
            {
              ...commonData,
              handleClick: this.handleClickSymptomsLink,
              name: 'md-thermometer',
              text: 'COVID-19 Symptoms'
            },
            {
              ...commonData,
              handleClick: this.handleClickReportingLink,
              name: 'md-person',
              text: 'COVID-19 Self Reporting'
            },
            {
              ...commonData,
              handleClick: this.handleClickNextStepsLink,
              name: 'md-arrow-up',
              text: 'Next Steps if you have COVID-19'
            },
            {
              ...commonData,
              handleClick: this.handleClickLocatorLink,
              name: 'md-medkit',
              text: 'Health Supply Locator'
            }
          ],
          builtLinks = links.map((data, idx) => {
            return <IconWithText key={idx} {...data} />;
          })


        return (
          <View style={styles.container}>
            {builtLinks}
          </View>
        );
    }

    handleClickBackButton() {
      this.setState({
        screen: 'main'
      });
    }

    handleClickUpdatesLink() {
      this.setState({
        screen: 'updates'
      });
    }

    handleClickSymptomsLink() {
      this.setState({
        screen: 'symptoms'
      });
    }

    handleClickReportingLink() {
      this.setState({
        screen: 'reporting'
      });
    }

    handleClickNextStepsLink() {
      this.setState({
        screen: 'nextsteps'
      });
    }

    handleClickLocatorLink() {
      this.setState({
        screen: 'locator'
      });
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start'
    }
  });

//make this component available to the app
export default Resources;
