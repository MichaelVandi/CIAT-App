import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, 
  PermissionsAndroid, Modal, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './app/components/map/map';
import Maps from './app/components/map/maps';
import Statistics from './app/components/statistics/statistics';
import Resources from './app/components/resources/resources';
import Icon from 'react-native-ionicons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SideMenu from 'react-native-side-menu';
// import Menu from './app/components/sideMenu/sideMenu';
import MenuContainer from './app/components/menu/menuContainer';
import { Appbar, DefaultTheme, Drawer, Provider as PaperProvider } from 'react-native-paper'
import About from './app/components/menu/about';
import PrivacyPolicy from './app/components/menu/privacyPolicy';
import Notification from './app/components/menu/notifications';
import Language from './app/components/menu/language';
import Faq from './app/components/menu/faq';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// TODO: Remember to remove this so warnings reappear.
console.disableYellowBox = true;

const requestFineLocationPermission = async() => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ],
      
      {
        title: "Location Permissions",
        message:
          "CIAT wants to show you COVID -19 cases in " +
          "your current location.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Fine Location Permission Granted");
    } else {
      console.log("Fine Location Permission Denied");
    }

  } catch (error) {
    console.warn(error);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.removeSplash = this.removeSplash.bind(this);
    this.state = {
      sideMenuOpen: false,
      selectedItem: 'About',
      latitudeCoordinate: '',
      longitudeCoordinate: '',
      menuVisible: false,
      menuViewToShow: 'None',
      showSplash: true,
    }
    requestFineLocationPermission();
  }
  componentDidMount() {
    this.removeSplash();
    // Start the bluetooth thread for contact tracing
    // this.handleBluetoothThread();
  }
  // handleBluetoothThread = () => {
  //   bluetoothThread.startTracing();
  //   // Listen for any call backs here
  // }

  onMenuButtonPressed = () => {
    // console.log('menu pressed');
    this.setState({
      sideMenuOpen: !this.state.sideMenuOpen,
    });
  }


  onMenuItemSelected = (item) => {
    this.setState({
      sideMenuOpen: false,
      selectedItem: item,
    });
  }
  updateMenuState(sideMenuOpen) {
    this.setState({ sideMenuOpen });
  }

  onClickMenuItem = () => {
    console.log('on ckick view')
  }

  Menu = () => {
    // const [active, setActive] = React.useState(false);
    return(
      <PaperProvider theme = {theme}>
                <Drawer.Section title=" ">
                <Drawer.Item
                label="About CIAT"
                onPress={() =>{
                  this.setState({
                    menuVisible: true,
                    menuViewToShow: 'About',
                  })
                }}
                />
                <Drawer.Item
                label="Notifications"
                onPress={() =>{
                  this.setState({
                    menuVisible: true,
                    menuViewToShow: 'Notifications',
                  })
                }}
                />
                <Drawer.Item
                label="Language"
                onPress={() =>{
                  this.setState({
                    menuVisible: true,
                    menuViewToShow: 'Language',
                  })
                }}
                />
                <Drawer.Item
                label="FAQ"
                // active={active === 'faq'}
                // onPress={() =>  setActive('faq')}
                onPress={() =>{
                  this.setState({
                    menuVisible: true,
                    menuViewToShow: 'FAQ',
                  })
                }}
                />
                <Drawer.Item
                label="Privacy Policy"
                onPress={() =>{
                  this.setState({
                    menuVisible: true,
                    menuViewToShow: 'Privacy Policy',
                  })
                }}
                />
                <Drawer.Item
                label="Terms & Conditions"
                onPress={() =>{
                  alert('Coming Soon');
                }}
                />
                <Drawer.Item
                label="Contact Us"
                // active={active === 'cu'}
                // onPress={() =>  setActive('cu')}
                />
                <Drawer.Item
                label="Follow Us"
                // active={active === 'fu'}
                // onPress={() =>  setActive('fu')}
                />
            </Drawer.Section>
        </PaperProvider>
    );
  }
  ShowMenu = () => {
    switch(this.state.menuViewToShow) {
      case "About":
        return (<About/>);
      case "Privacy Policy":
          return (<PrivacyPolicy/>);
      case "Language":
        return (<Language/>);
      case "FAQ":
        return <Faq/>;
      case "Notifications":
        return (<Notification/>);
      
    }
  }
  closeMenu(){
    if (this.state.menuVisible) {
      this.setState({
        menuVisible: false
      });
    }
  }
  removeSplash = () => {
    setTimeout(() => {
      this.setState({
        showSplash: false,
      })
    }, 2000)
  }
  render() {
    const menu = this.Menu();
    
    function Home() {
      return (
        <Tab.Navigator
              initialRouteName="Map"
              screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iosIconName;
                let androidIconName;
                let iconColor;
    
                if (route.name === 'Resources') {
                  iosIconName = focused ? 'ios-paper' : 'ios-paper-outline';
                  androidIconName = focused ? 'md-paper': 'md-paper';
                  iconColor = focused ? '#088A85': '#848484';
                } else if (route.name === 'Map') {
                  iosIconName = focused ? 'ios-globe' : 'ios-globe-outline';
                  androidIconName = focused ? 'md-globe': 'md-globe';
                  iconColor = focused ? '#088A85': '#848484';
                } else if (route.name === 'Statistics') {
                  iosIconName = focused ? 'ios-stats' : 'ios-stats';
                  androidIconName = focused ? 'md-stats': 'md-stats';
                  iconColor = focused ? '#088A85': '#848484';
                } 
    
                // You can return any component that you like here!

                return (
                  <Icon ios={iosIconName} android={androidIconName} color={iconColor}/>
                );
                // #088A85
                // #848484
              },
              
            })}
            tabBarOptions={{
              activeTintColor: '#088A85',
              inactiveTintColor: 'gray',
            }}
            
          >
            <Tab.Screen name="Resources" component={Resources} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Statistics" component={Statistics} />
          </Tab.Navigator>
      );
    }
    return (
      <PaperProvider theme = {theme}>
        <SideMenu isOpen = {this.state.sideMenuOpen} onChange={isOpen => this.updateMenuState(isOpen)}
          menu = {menu}>
          <Appbar.Header>
          <TouchableOpacity onPress={this.onMenuButtonPressed}>
            <Icon ios="ios-menu" android="md-menu" color="#088A85"/>
          </TouchableOpacity>
          <Appbar.Content
            title = "CIAT"
          />
        </Appbar.Header>
        
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.menuVisible}
            >
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => this.closeMenu()}>
                <Icon ios="ios-close-circle" android="md-close-circle" color="grey"
                style={{padding: 10}} />
              </TouchableOpacity>
              {this.ShowMenu()}
            </View>
          </Modal>

          { this.state.showSplash &&
            <Modal
              animationType='none'
              transparent={false}
              visible={true}
              >
              <View style={styles.splashModal}>
                <Image
                  style={styles.splashLogoStyles}
                  source={require('./logo_ciat.png')}
                />
              </View>


            </Modal>
        }
        <NavigationContainer>
          <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          >
            <Stack.Screen name = "Home" component ={Home}/>
            <Stack.Screen name = "Menu" component = {MenuContainer}/>
          </Stack.Navigator>
        </NavigationContainer>
        </SideMenu>
      </PaperProvider>
    );
  }

}
const styles = StyleSheet.create({
  iconView:{
   backgroundColor: '#107E7D',
   opacity: 10,
  },
  menuView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    marginTop: 56,
    height: '100%',
    backgroundColor: "white",
    padding: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5
  },
  splashModal: {
    height: height,
    width: width,
    // backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogoStyles: {
    width: width * 0.7,
    height: height * 0.7,
    borderRadius: 10,
    resizeMode: 'contain'
  }
  
})
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: '#b49935'
  },
};
export default App;