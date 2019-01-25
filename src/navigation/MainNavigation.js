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
import { createStackNavigator } from "react-navigation";



// import RegAsset1 from "../screens/FramedScreens/RegAsset_1_Draft_1";
// import RegAssetSplashTest from "../screens/FramedScreens/RegAssetSplash_Draft_1";
// import RegAsset2 from "../screens/Testing/RegAsset_2_Draft_1";


import BlockScanner from "../screens/BlockScanner";
import Camera from "../screens/Camera";
import Confirm from "../screens/Confirm";
import NewAssetLanding from "../screens/NewAssetLanding";
import DocUp from "../screens/DocUp";
import EdiT from "../screens/Edi-T";
import ImageUpload from "../screens/ImageUpload";
import Hipr from "../screens/Hipr";
import HiprTransactions from "../screens/HiprTransactions";
import HiprAssets from "../screens/HiprAssets";
import MetricInput from "../screens/MetricInput";
import Login from "../screens/Login";
import MenuOptions from "../screens/MenuOptions";
import NewAssetConfirm from "../screens/NewAssetConfirm";
import HiprLanding from "../screens/HiprLanding";
import TrackAssetOptions from "../screens/TrackAssetOptions";

import SupplyChainAssetList from "../screens/SupplyChainAssetList";
import SupplyChainTxRx from "../screens/SupplyChainTxRx";
import SupplyChainReview from "../screens/SupplyChainReview";
import NewAssetForm from "../screens/NewAssetForm";

import TrackAssetList from "../screens/TrackAssetList";
import TxSwiperContainer from "../screens/TxSwiperContainer";
import TxSwiper from "../components/TxSwiper";
import Wallet from "../screens/Wallet";
import Settings from "../screens/Settings";
import QRCapture from "../screens/QRCapture";
import QRCapture2 from "../screens/QRCapture2";
import WebViewComponent from "../components/WebViewComponent";
import DocumentStorage from "../screens/DocumentStorage";
import DocumentQRScanner from "../screens/DocumentQRScanner";

import TestSplash from "../screens/Testing/TestSplash"

import Header from "../components/Headers/Header";

import RegAssetNavigator from "./RegisterAssetNavigation";
import SupplyChainNav from "./SupplyChainNavigation";


const MainNavigator = createStackNavigator({
    TestSplash: {
        screen: TestSplash,
         navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={'Welcome'} navigation={navigation} />
        })
       
    },
    RegAssetNav: {
        screen: RegAssetNavigator,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={"Register Asset"} navigation={navigation} />
        })
       
    },
    SupplyChainNav: {
        screen: SupplyChainNav,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={"Supply Chain"} navigation={navigation} />
        })
       
    },
    // RegAssetSplashTest: {
    //     screen: RegAssetSplashTest,
    //     navigationOptions: ({ navigation }) => ({
    //         header: <Header headerTitle={"Register Asset"} navigation={navigation} />
    //     })
       
    // },
    // RegAssetNav: {
    //     screen: RegAssetNavigator,

    // },

    Login: { screen: Login },
    MenuOptions: { screen: MenuOptions },
    NewAssetLanding: { screen: NewAssetLanding },
    NewAssetForm: { screen: NewAssetForm },
    NewAssetConfirm: { screen: NewAssetConfirm },

    HiprLanding: { screen: HiprLanding },
    HiprAssets: { screen: HiprAssets },
    HiprTransactions: { screen: HiprTransactions },
    Hipr: { screen: Hipr },

    BlockScanner: { screen: BlockScanner },
    TxSwiperContainer: { screen: TxSwiperContainer },

    TrackAssetList: { screen: TrackAssetList },
    TrackAssetOptions: { screen: TrackAssetOptions },

    SupplyChainAssetList: { screen: SupplyChainAssetList },
    SupplyChainTxRx: { screen: SupplyChainTxRx },
    SupplyChainReview: { screen: SupplyChainReview },
    ImageUpload: { screen: ImageUpload },
    Camera: { screen: Camera },
    DocUp: { screen: DocUp },
    EdiT: { screen: EdiT },
    MetricInput: { screen: MetricInput },
    Confirm: { screen: Confirm },

    QRCapture: { screen: QRCapture },
    QRCapture2: { screen: QRCapture2 },

    Wallet: { screen: Wallet },
    Settings: { screen: Settings },

    WebViewComponent: { screen: WebViewComponent },
    TxSwiper: { screen: TxSwiper },
    DocumentStorage: { screen: DocumentStorage },
    DocumentQRScanner: { screen: DocumentQRScanner },

}, {
        initialRouteName: 'RegAssetNav',
        headerMode: 'none',
        // navigationOptions: ({ navigation }) => ({
        //     header: <Header headerTitle={'Supply Chain'} navigation={navigation} />
        // })
     
    })

export default MainNavigator;
