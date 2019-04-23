import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import Header from "../components/Headers/Header";

import WalletFlow from "../screens/MainApp/WalletFlow";
import WalletSendQRScanner from "../screens/MainApp/WalletSendQRScanner";
const WalletNavigator = createStackNavigator(
    {
        WalletFlow: {
            screen: WalletFlow,
        },
        WalletSendQRScanner: {
            screen: WalletSendQRScanner,
        },
    },
    {
        initialRouteName: 'WalletFlow',
        headerMode: 'none',
        // navigationOptions: ({ navigation }) => ({
        //     header: <Header headerTitle={"Asset Name"} navigation={navigation} />
        // })
    }


)

export default WalletNavigator;
