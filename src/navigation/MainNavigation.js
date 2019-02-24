// import HiprLanding from '../screens/HiprLanding';
// import Hipr from '../screens/Hipr';
// import HiprTransactions from '../screens/HiprTransactions';


// import QRCapture from '../screens/QRCapture';
// import QRCapture2 from '../screens/QRCapture2';
// import WebViewComponent from '../components/WebViewComponent';
// import DocumentStorage from '../screens/MainApp/DocumentStorage';
// import DocumentQRScanner from '../screens/MainApp/DocumentQRScanner';
import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

// import HiprLanding from "../screens/HiprLanding";
// import TxSwiperContainer from "../screens/MainApp/TxSwiperContainer";
// import TxSwiper from "../components/TxSwiper";
import Wallet from "../screens/MainApp/Wallet";
import Settings from "../screens/MainApp/Settings";
// import QRCapture from "../screens/QRCapture";
// import QRCapture2 from "../screens/QRCapture2";
// import WebViewComponent from "../components/WebViewComponent";
// import DocumentStorage from "../screens/MainApp/DocumentStorage";
// import DocumentQRScanner from "../screens/MainApp/DocumentQRScanner";

import TestSplash from "../screens/MainApp/TestSplash";

import Header from "../components/Headers/Header";
import SideNavMenu from "../components/SideNavMenu"
import RegAssetNavigator from "./RegisterAssetNavigation";
import SupplyChainNavigator from "./SupplyChainNavigation";
import WalletNavigator from "./WalletNavigation";
import Login from '../screens/MainApp/Login';
import TrackNavigator from '../features/Track/navigation/TrackNavigation'

const MainNavigator = createStackNavigator({
    TestSplash: {
        screen: TestSplash,
         navigationOptions: ({ navigation, screenProps }) => ({
            header: <Header headerTitle={'Welcome'} navigation={navigation} />
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
    TrackNavigator: {
        screen: TrackNavigator,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={'Track'} navigation={navigation} />
        })
    }

    // Wallet: {
    //     screen: Wallet,
    // },

    // BlockScanner: {
    //     screen: Blockscanner
    // },



},
    {
        initialRouteName: 'WalletNavigator',
        headerMode: 'screen',
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
