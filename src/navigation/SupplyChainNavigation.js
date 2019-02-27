import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import Header from "../components/Headers/Header";

import Camera from "../screens/MainApp/Camera";
import SupplyChainSplash from "../features/SupplyChainFlow/screens/SupplyChainSplash";
import SupplyChainSideChoice from "../features/SupplyChainFlow/screens/SupplyChainSideChoice";
import SupplyChainTx from "../features/SupplyChainFlow/screens/SupplyChainTX_V1";
import RegisterAssetNavigator from "./RegisterAssetNavigation";


const SupplyChainNavigator = createStackNavigator(
    {
        SupplyChainSplash: {
            screen: SupplyChainSplash,
            navigationOptions: ({ navigation }) => ({
                header: <Header headerTitle={"Supply Chain"} navigation={navigation} />
            })
        },
        // headerTitle={navigation.state.params.headerName}
        SupplyChainSideChoice: {
            screen: SupplyChainSideChoice,
        },
        SupplyChainTx: {
            screen: SupplyChainTx,
            // navigationOptions: ({ navigation }) => ({
            //     header: <Header headerTitle={navigation.state.params.headerName} navigation={navigation} />
            // })

        },
        RegAssetNavigator: {
            screen: RegisterAssetNavigator
        }
       
    },
    {
        initialRouteName: 'SupplyChainSplash',
        headerMode: 'none',
        // navigationOptions: ({ navigation }) => ({
        //     header: <Header headerTitle={"Asset Name"} navigation={navigation} />
        // })
    }


)

export default SupplyChainNavigator;
