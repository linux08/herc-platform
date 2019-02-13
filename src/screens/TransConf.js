import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableHighlight,
    StatusBar,
    Alert,
    YellowBox,
    ActivityIndicator
} from "react-native";
import { createStackNavigator } from "react-navigation";

import {

    GETTING_IPFS,
    GOT_IPFS,
    IPFS_ERROR,
    GETTING_FCT,
    GOT_FCT,
    FCT_ERROR
 } from '../actions/types'

 
