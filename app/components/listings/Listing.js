//import liraries
import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

// create a component
class Listing extends Component {

    render() {
        const listingItems = this.buildListingItems();

        return (
            <ScrollView style={styles.listingWrapper}>
              {listingItems}
            </ScrollView>
        );
    }

    buildListingItems() {
        const ListingItem = this.props.listingItem;

        // Loop through the items array and use the passed in listingItem component to build each item
        return this.props.items.map((itemData, idx) => {
            const data = {
                ...itemData,
                handleClickItem: this.props.handleClickItem
            };

            return <ListingItem key={idx} {...data} />;
        });
    }
}

// define your styles
const styles = StyleSheet.create({
    listingWrapper: {
        padding: 10, 
        marginBottom: 100
    }
  });

//make this component available to the app
export default Listing;
