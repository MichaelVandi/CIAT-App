//import liraries
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Image, View } from 'react-native';

// create a component
class ArticleDetailPage extends Component {

    render() {

        return (
            <ScrollView style={styles.listingWrapper}>
                <View style={styles.imageWrapper}>
                    {this.buildImage()}
                </View>
                <Text style={styles.paragraph}>
                    {this.props.lead_paragraph}
                </Text>
            </ScrollView>
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
}

// define your styles
const styles = StyleSheet.create({
    listingWrapper: {
        padding: 10, 
        marginBottom: 100
    },
    image: {
        width: 'auto',
        height: '100%'
    },
    paragraph: {
        padding: 15
    },  
    imageWrapper: {
        maxHeight: 200,
        width: '100%'
    }
  });

//make this component available to the app
export default ArticleDetailPage;
