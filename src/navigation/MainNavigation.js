
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
import OnboardingNavigator from "./OnboardingNavigation";
import WalletFlow from "../screens/MainApp/WalletFlow";
import RegAssetSplashTest from "../screens/RegisterAsset/RegAssetSplash_Draft_1";
import RegAsset1 from "../screens/RegisterAsset/RegAsset_1_Draft_1";
import RegAsset2 from "../screens/RegisterAsset/RegAsset_2_Draft_1";
import TrackSplash from "../../src/features/Track/navigation/screens/TrackSplash";
import SupplyChainSplash from "../features/SupplyChainFlow/screens/SupplyChainSplash";
import SupplyChainSideChoice from "../features/SupplyChainFlow/screens/SupplyChainSideChoice";
import SupplyChainTx from "../features/SupplyChainFlow/screens/SupplyChainTX_V1";
import ExampleSwiper from '../../src/features/Track/navigation/screens/ExampleSwiper'
import TrackSideChoice from '../../src/features/Track/navigation/screens/TrackSideChoice';
import FactomWebView from '../../src/features/Track/navigation/screens/FactomWebView';
import BlockScanner from '../../src/features/Track/navigation/screens/BlockScanner';

const MainNavigator = createStackNavigator({
    TestSplash: {
        screen: TestSplash,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: <Header headerTitle={'Welcome'} navigation={navigation} />
        })
    },

    TrackSplash: {
        screen: TrackSplash,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: <Header headerTitle={'Track'} navigation={navigation} />
        })
    },
    RegAssetSplashTest: {
        screen: RegAssetSplashTest,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: <Header headerTitle={'Register Asset'} navigation={navigation} />
        })
    },
    RegAsset1: {
        screen: RegAsset1,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={'Register Asset1'} navigation={navigation} />
        })
    },
    RegAsset2: {
        screen: RegAsset2,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={'Register Confirm'} navigation={navigation} />
        }),
    },
    SupplyChainSplash: {
        screen: SupplyChainSplash,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={"Supply Chain"} navigation={navigation} />
        })
    },
    SupplyChainSideChoice: {
        screen: SupplyChainSideChoice,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={"Supply Chain"} navigation={navigation} />
        })
    },
    SupplyChainTx: {
        screen: SupplyChainTx,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={"Transaction"} navigation={navigation} />
        })

    },
    WalletFlow: {
        screen: WalletFlow,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: <Header headerTitle={'Wallet'} navigation={navigation} />
        })
    },
    TrackSideChoice: {
        screen: TrackSideChoice,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: <Header headerTitle={'Track'} navigation={navigation} />
        })
    },
    TxSwiper: {
        //using the ExampleSwiper.js and not TxSwiper.js!!!!! 
            screen: ExampleSwiper,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={'Previous Transactions'} navigation={navigation} />
        })
    },
    FactomWebView: {
        screen: FactomWebView,
        navigationOptions: ({ navigation }) => ({
            header: null
        })

    },
    BlockScanner: {
        screen: BlockScanner,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={'Block Scanner'} navigation={navigation} />
        })
    },
    OnboardingNavigator: {
        screen: OnboardingNavigator,
        navigationOptions: ({ navigation, screenProps }) => ({
            header: null
        })
    },

    // BlockScanner: {
    //     screen: Blockscanner
    // },

},
    {
        initialRouteName: 'WalletFlow',
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
