import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { connect } from "react-redux";
import Header from "../components/Headers/Header";

import RegAssetSplashTest from "../screens/RegisterAsset/RegAssetSplash_Draft_1";
import RegAsset1 from "../screens/RegisterAsset/RegAsset_1_Draft_1";
import RegAsset2 from "../screens/RegisterAsset/RegAsset_2_Draft_1";

const RegisterAssetNavigator = createStackNavigator(
    {

        RegAssetSplash1: {
            screen: RegAssetSplashTest,
            navigationOptions: ({ navigation }) => ({
                header: <Header headerTitle={"Register Asset"} navigation={navigation} />
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
        }
    },
    {// when a nested stack navigator, set headerMode: 'none' to disable the passed in header
        initalRouteName: 'RegAsset2',
        headerMode: 'none',

    }

);


export default RegisterAssetNavigator;