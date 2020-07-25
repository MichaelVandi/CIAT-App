//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';

// create a component
class ReportingPage extends Component {
    constructor(props) {
        super(props);

        this.bindMethods();
    }

    bindMethods() {
        this.handleClickItem = this.handleClickItem.bind(this);

        return this;
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.handleClickItem}>
                <View style={styles.itemWrapper}>
                    <Text style={styles.articleTitle}>
                        {this.props.headline.main}{'\n'}
                    </Text>
                    <View style={styles.imageWrapper}>
                        {this.buildImage()}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    buildImage() {
        let markup;

        const source = this.props.multimedia[0]

        if(source) {
            markup = (
                <Image 
                    source={{
                        uri: `https://nytimes.com/${source.url}`
                    }}
                    style={styles.image}    
                />
            );
        }

        return markup;
    }

    handleClickItem() {
        this.props.handleClickItem(this.props);
    }
}

// define your styles
const styles = StyleSheet.create({
    itemWrapper: {
        height: 100,
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        width: '100%',
        borderTopColor: 'gray',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    imageWrapper: {
        padding: 10,
        flex: 1,
        height: '100%',
        width: '100%'
    },  
    image: {
        width: 'auto',
        height: '100%'
    },
    articleTitle: {
        flex: 2
    }
  });

//make this component available to the app
export default ReportingPage;
