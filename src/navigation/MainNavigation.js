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

import RegAssetNavigator from "./RegisterAssetNavigation";
import SupplyChainNavigator from "./SupplyChainNavigation";

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
    import MenuOptions from "../screens/MenuOptions";
    // import NewAssetConfirm from "../screens/NewAssetConfirm";
    // import TrackAssetOptions from "../screens/TrackAssetOptions";

    // import SupplyChainAssetList from "../screens/SupplyChainAssetList";
    // import SupplyChainTxRx from "../screens/SupplyChainTxRx";
    // import SupplyChainReview from "../screens/SupplyChainReview";
    // import NewAssetForm from "../screens/NewAssetForm";

    // import TrackAssetList from "../screens/TrackAssetList";
    
    class SideMenuNavigator extends React.Component {

        constructor(props) {
            super(props);
    
            this.toggle = this.toggle.bind(this);
    
            this.state = {
                isOpen: false,
                selectedItem: 'MenuOptions',
            }
    
        }
    
          toggle() {
            this.setState({
                isOpen: true,
            });
        }
    
        updateMenuState(isOpen) {
            this.setState({ isOpen });
        }
    
        onMenuItemSelected = item =>
            this.setState({
                isOpen: false,
                selectedItem: item,
            });
    
        renderNavigator() {
            if (this.state.selectedItem === 'MenuOptions')
                return <MainNavigator screenProps={{ toggleSideMenu: this.toggle }} toggleMenu={this._drawerMenuToggle} />;
    
            else if (this.state.selectedItem === 'NewAssetLanding')
                return <RegAssetNavigator screenProps={{ toggleSideMenu: this.toggle }} toggleMenu={this._drawerMenuToggle} />;
    
            else if (this.state.selectedItem === 'SupplyChainAssetList')
                return <SupplyChainNavigator screenProps={{ toggleSideMenu: this.toggle }} toggleMenu={this._drawerMenuToggle} />;
    
            // else if (this.state.selectedItem === 'TrackAssetList')
            //     return <TrackAssetListNavigator screenProps={{ toggleSideMenu: this.toggle }} toggleMenu={this._drawerMenuToggle} />;
    
            // else if (this.state.selectedItem === 'Wallet')
            //     return <WalletNavigator screenProps={{ toggleSideMenu: this.toggle }} toggleMenu={this._drawerMenuToggle} />;
    
            // else if (this.state.selectedItem === 'DocumentStorage')
            //     return <DocumentStorageNavigator screenProps={{ toggleSideMenu: this.toggle }} toggleMenu={this._drawerMenuToggle} />;
    
        }
    
        render() {
            const menu = <NewMenu navigation={this.props.navigation} onItemSelected={this.onMenuItemSelected} />
            return (
                <SideMenu menu={menu} isOpen={this.state.isOpen}
                    onChange={isOpen => this.updateMenuState(isOpen)}>
                    {this.renderNavigator()}
                </SideMenu>
            );
        }
    }

const MainNavigator = createStackNavigator({
    TestSplash: {
        screen: TestSplash,
         navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={'Welcome'} navigation={navigation} />
        })
       
    },
    SideMenuNavigator: {
        screen: SideMenuNavigator,
        
    }
    // RegAssetNav: {
    //     screen: RegAssetNavigator,
    //     navigationOptions: ({ navigation }) => ({
    //         header: <Header headerTitle={"Register Asset"} navigation={navigation} />
    //     })
       
    // },
    // SupplyChainNav: {
    //     screen: SupplyChainNav,
    //     navigationOptions: ({ navigation }) => ({
    //         header: <Header headerTitle={"Supply Chain"} navigation={navigation} />
    //     })
    // }
}
    , {
        initialRouteName: 'TestSplash',
        headerMode: 'none',
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={'Welcome'} navigation={navigation} />
        })
     
    })
    
   
export default MainNavigator;

    // RegAssetSplashTest: {
    //     screen: RegAssetSplashTest,
    //     navigationOptions: ({ navigation }) => ({
    //         header: <Header headerTitle={"Register Asset"} navigation={navigation} />
    //     })
       
    // },
    // RegAssetNav: {
    //     screen: RegAssetNavigator,

    // },

    // Login: { screen: TestSplash },
    // MenuOptions: { screen: MenuOptions },
    // NewAssetLanding: { screen: NewAssetLanding },
    // NewAssetForm: { screen: NewAssetForm },
    // NewAssetConfirm: { screen: NewAssetConfirm },

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

