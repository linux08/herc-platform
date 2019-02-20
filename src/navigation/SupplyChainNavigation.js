import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import Header from "../components/Headers/Header";

import Camera from "../screens/MainApp/Camera";
import SupplyChainSplash from "../screens/SupplyChain/SupplyChainSplash";
import SupplyChainSideChoice from "../screens/SupplyChain/SupplyChainSideChoice";
import SupplyChainTx from "../screens/SupplyChain/SupplyChainTX_V1";
import SupplyChainMetrics from  "../screens/SupplyChain/SupplyChainMetrics";

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
        SupplyChainMetrics: {
            screen: SupplyChainMetrics,
            // navigationOptions: ({ navigation }) => ({
            //     header: <Header headerTitle={navigation.state.params.headerName} navigation={navigation} />
            // })

        },

            // navigationOptions: ({ navigation }) => ({
            //     header: <Header headerTitle={"will be asset Name"} navigation={navigation} />
            // })

        // }



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
