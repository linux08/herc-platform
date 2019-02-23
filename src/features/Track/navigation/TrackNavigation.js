
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import ExampleSwiper from './screens/ExampleSwiper'
import TrackSplash from './screens/TrackSplash';
import TrackSideChoice from './screens/TrackSideChoice';
import WebView from './screens/WebView';

// import BlockScanner from './screens/BlockScanner';
import TxSwiper from './screens/TxSwiper';
  

import Header from '../../../components/Headers/Header';

const TrackNavigator = createStackNavigator({

    TrackSplash: {
        screen: TrackSplash,
       
    },
    TrackSideChoice: {
        screen: TrackSideChoice,

    },
    TxSwiper: {
            screen: ExampleSwiper

        // screen: TxSwiper,
        // navigationOptions: ({ navigation }) => ({
        //     header: <Header headerTitle={'Previous Transactions'} navigation={navigation} />
        // })
    },

    WebView: {
        screen: WebView,
        navigationOptions: ({ navigation }) => ({
            header: null
        })

    }
    // BlockScanner: {
    //     screen: BlockScanner,
    //     navigationOptions: ({ navigation }) => ({
    //         header: <Header headerTitle={'Block Scanner'} navigation={navigation} />
    //     })
    // }
},
    {
        initalRouteName: 'TrackSplash',
        headerMode: 'none'
    }
);

export default TrackNavigator;
