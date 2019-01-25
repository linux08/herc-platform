import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import Header from "../components/Headers/Header";

import SupplyChainSplash from "../screens/Testing/SupplyChainSplash";
import SupplyChainSideChoice from "../screens/Testing/SupplyChainSideChoice";

const SupplyChainNavigator = createStackNavigator(
    {
        SupplyChainSplash: {
            screen: SupplyChainSplash,
        },
        // headerTitle={navigation.state.params.headerName}
        SupplyChainSideChoice: {
            screen: SupplyChainSideChoice,
            navigationOptions: ({ navigation }) => ({
                header: <Header headerTitle={"Asset Name"} navigation={navigation} />
            })
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