
import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';


// import HiprLanding from "../screens/HiprLanding";
// import TxSwiperContainer from "../screens/MainApp/TxSwiperContainer";
// import TxSwiper from "../components/TxSwiper";
// import Wallet from "../";
import Settings from "../screens/MainApp/Settings";
// import QRCapture from "../screens/QRCapture";
// import QRCapture2 from "../screens/QRCapture2";
// import WebViewComponent from "../components/WebViewComponent";
// import DocumentStorage from "../screens/MainApp/DocumentStorage";
// import DocumentQRScanner from "../screens/MainApp/DocumentQRScanner";
import Login from "../screens/MainApp/Login";
import TestSplash from "../screens/MainApp/TestSplash";
import TrackNavigator from "../features/Track/navigation/TrackNavigation";
import Header from "../components/Headers/Header";
import SideNavMenu from "../components/SideNavMenu"
import RegAssetNavigator from "./RegisterAssetNavigation";
import SupplyChainNavigator from "./SupplyChainNavigation";
import WalletNavigator from "./WalletNavigation";

const MainNavigator = createStackNavigator({
    TestSplash: {
        screen: TestSplash,
         navigationOptions: ({ navigation, screenProps }) => ({
            header: <Header headerTitle={'Welcome'} navigation={navigation} />
        })
    },

    TrackNavigator: {
        screen: TrackNavigator,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: <Header headerTitle={'Track'} navigation={navigation} />
        })
    },
    RegAssetNavigator: {
        screen: RegAssetNavigator,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: <Header headerTitle={'RegAsset'} navigation={navigation} />
        })
    },
    SupplyChainNavigator: {
        screen: SupplyChainNavigator,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: <Header headerTitle={'Supply Chain'} navigation={navigation} />
        })
    },
    WalletNavigator: {
        screen: WalletNavigator,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: <Header headerTitle={'Wallet'} navigation={navigation} />
        })
    },

       // BlockScanner: {
    //     screen: Blockscanner
    // },



},
    {
        initialRouteName: 'WalletNavigator',
        headerMode: 'screen'


    }

)

const SideMenuNavigator = createDrawerNavigator(
        {
            MainNavigator: MainNavigator,
        },
        {
            contentComponent: SideNavMenu,
            drawerWidth: 250,
            drawerPosition: 'left',
            drawerOpenRoute: 'DrawerOpen',
            drawerCloseRoute: 'DrawerClose',
            drawerToggleRoute: 'DrawerToggle',

        })

const LoginNav = createSwitchNavigator(
    {
        Login: {
            screen: Login
        },
        SideMenuNav: {
            screen: SideMenuNavigator
        }
    },
    {
        initialRouteName: 'Login'
    }
)

// export default MainNavigator;
export default LoginNav;




