
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import {
    BlockScanner,
    TrackSplash,
    TrackChoice,
    TxSwiper
}
    from './screens';

import Header from '../../../components/Headers/Header';

const TrackNavigator = createStackNavigator({

    TrackSplash: {
        screen: TrackSplash,
       
    },
    TrackChoice: {
        screen: TrackChoice,

    },
    TxSwiper: {
        screen: TxSwiper,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={'Previous Transactions'} navigation={navigation} />
        })
    },
    BlockScanner: {
        screen: BlockScanner,
        navigationOptions: ({ navigation }) => ({
            header: <Header headerTitle={'Block Scanner'} navigation={navigation} />
        })
    }
},
    {
        initalRouteName: 'TrackSplash',
        headerMode: 'none'
    }
);

export default TrackNavigator;
