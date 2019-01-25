import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import Header from "../components/Headers/Header";

import SupplyChainSplash from "../screens/Testing/SupplyChainSplash";
import SupplyChainSideChoice from "../screens/Testing/SupplyChainSideChoice";
import SupplyChainTx from "../screens/Testing/SupplyChainTX_V1";
import Camera from "../screens/Camera";
import MetricInput from  "../screens/MetricInput";
const SupplyChainNavigator = createStackNavigator(
    {
        SupplyChainSplash: {
            screen: SupplyChainSplash,
        },
        // headerTitle={navigation.state.params.headerName}
        SupplyChainSideChoice: {
            screen: SupplyChainSideChoice,
            navigationOptions: ({ navigation }) => ({
                header: <Header headerTitle={navigation.state.params.headerName} navigation={navigation} />
            })
        },
        SupplyChainTx: {
            screen: SupplyChainTx,
            navigationOptions: ({ navigation }) => ({
                header: <Header headerTitle={"will be asset Name"} navigation={navigation} />
            })

        }



    },
    {
        initialRouteName: 'SupplyChainTx',
        headerMode: 'none',
        // navigationOptions: ({ navigation }) => ({
        //     header: <Header headerTitle={"Asset Name"} navigation={navigation} />
        // })
    }


)

export default SupplyChainNavigator;