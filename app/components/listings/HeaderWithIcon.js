//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../../components/buttons/IconButton';
import PageHeader from '../../components/listings/PageHeader';

// create a component
class HeaderWithIcon extends Component {

    render() {
        const iconData = {
            name: this.props.name,
            type: this.props.type,
            color: this.props.color,
            handleClick: this.props.handleClick
          },
          headerData = {
            header: this.props.header,
            subheader: this.props.subheader
          };

        return (
            <View style={styles.headerWrapper}>
                <View style={styles.backButtonWrapper}>
                    <IconButton {...iconData} />
                </View>
                <View style={styles.pageHeaderWrapper} >
                    <PageHeader {...headerData}/>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    headerWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    pageHeaderWrapper: {
        marginRight: 60,
        alignSelf: 'center',
        flex: 1
    },  
    backButtonWrapper: {
        alignSelf: 'flex-start',
        flexBasis: 60
    }
  });

//make this component available to the app
export default HeaderWithIcon;