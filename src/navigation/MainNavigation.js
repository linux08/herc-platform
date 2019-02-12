import {
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import React, { Component } from "react";
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from "react-navigation";

import BlockScanner from "../screens/BlockScanner";
import Confirm from "../screens/Confirm";

import Hipr from "../screens/Hipr";
import HiprTransactions from "../screens/HiprTransactions";
import Login from "../screens/Login";

import HiprLanding from "../screens/HiprLanding";
import TxSwiperContainer from "../screens/TxSwiperContainer";
import TxSwiper from "../components/TxSwiper";
import Wallet from "../screens/Wallet";
import Settings from "../screens/Settings";
import QRCapture from "../screens/QRCapture";
import QRCapture2 from "../screens/QRCapture2";
import WebViewComponent from "../components/WebViewComponent";
import DocumentStorage from "../screens/DocumentStorage";
import DocumentQRScanner from "../screens/DocumentQRScanner";

import TestSplash from "../screens/Testing/TestSplash";

import Header from "../components/Headers/Header";
import SideNavMenu from "../components/SideNavMenu"
import RegAssetNavigator from "./RegisterAssetNavigation";
import SupplyChainNavigator from "./SupplyChainNavigation";
// import SideMenu from 'react-native-side-menu';

// import RegAsset1 from "../screens/FramedScreens/RegAsset_1_Draft_1";
// import RegAssetSplashTest from "../screens/FramedScreens/RegAssetSplash_Draft_1";
// import RegAsset2 from "../screens/Testing/RegAsset_2_Draft_1";


// import Camera from "../screens/Camera";
// import NewAssetLanding from "../screens/NewAssetLanding";
// import DocUp from "../screens/DocUp";
// import EdiT from "../screens/Edi-T";
// import ImageUpload from "../screens/ImageUpload";
// import HiprAssets from "../screens/HiprAssets";
// import MetricInput from "../screens/MetricInput";
// import MenuOptions from "../screens/MenuOptions";
// import NewAssetConfirm from "../screens/NewAssetConfirm";
// import TrackAssetOptions from "../screens/TrackAssetOptions";

// import SupplyChainAssetList from "../screens/SupplyChainAssetList";
// import SupplyChainTxRx from "../screens/SupplyChainTxRx";
// import SupplyChainReview from "../screens/SupplyChainReview";
// import NewAssetForm from "../screens/NewAssetForm";

// import TrackAssetList from "../screens/TrackAssetList";





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
        screen: SupplyChainNavigator
    }

},
    {
        initialRouteName: 'TestSplash',
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

export default LoginNav;

    
    // HiprLanding: { screen: HiprLanding },
    // HiprAssets: { screen: HiprAssets },
    // HiprTransactions: { screen: HiprTransactions },
    // Hipr: { screen: Hipr },

    // BlockScanner: { screen: BlockScanner },
    // TxSwiperContainer: { screen: TxSwiperContainer },

    // TrackAssetList: { screen: TrackAssetList },
    // TrackAssetOptions: { screen: TrackAssetOptions },

    // SupplyChainAssetList: { screen: SupplyChainAssetList },
    // SupplyChainTxRx: { screen: SupplyChainTxRx },
    // SupplyChainReview: { screen: SupplyChainReview },
    // ImageUpload: { screen: ImageUpload },
    // Camera: { screen: Camera },
    // DocUp: { screen: DocUp },
    // EdiT: { screen: EdiT },
    // MetricInput: { screen: MetricInput },
    // Confirm: { screen: Confirm },

    // QRCapture: { screen: QRCapture },
    // QRCapture2: { screen: QRCapture2 },

    // Wallet: { screen: Wallet },
    // Settings: { screen: Settings },

    // WebViewComponent: { screen: WebViewComponent },
    // TxSwiper: { screen: TxSwiper },
    // DocumentStorage: { screen: DocumentStorage },
    // DocumentQRScanner: { screen: DocumentQRScanner },

