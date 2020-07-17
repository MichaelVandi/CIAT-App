//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DefaultTheme, Drawer, Provider as PaperProvider  } from 'react-native-paper';

// create a component
export default function Menu(onclick) {
    const [active, setActive] = React.useState(false);
    return (
        <PaperProvider theme = {theme}>
                <Drawer.Section title="We can write anything here">
                <Drawer.Item
                label="About CIAT"
                active={active === 'about'}
                onPress={() =>{
                  setActive('about');
                  
                  console.log('side menu go')
                }}
                />
                <Drawer.Item
                label="Notifications"
                active={active === 'notifications'}
                onPress={() =>  console.log('side noti')}
                />
                <Drawer.Item
                label="Language"
                active={active === 'language'}
                onPress={() =>  setActive('language')}
                />
                <Drawer.Item
                label="FAQ"
                active={active === 'faq'}
                onPress={() =>  setActive('faq')}
                />
                <Drawer.Item
                label="Privacy Policy"
                active={active === 'pp'}
                onPress={() =>  setActive('pp')}
                />
                <Drawer.Item
                label="Terms & Conditions"
                active={active === 'tc'}
                onPress={() =>  setActive('tc')}
                />
                <Drawer.Item
                label="Contact Us"
                active={active === 'cu'}
                onPress={() =>  setActive('cu')}
                />
                <Drawer.Item
                label="Follow Us"
                active={active === 'fu'}
                onPress={() =>  setActive('fu')}
                />
            </Drawer.Section>
        </PaperProvider>

    );
} 
// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      
    },
    indicator:{

      alignItems: 'center',
      flex:8

    },
    offline:{
        flex:2
    },
    textStyle: {
        fontSize: 40,
    }
  });

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#0d4a64',
      accent: '#b49935'
    },
  };
