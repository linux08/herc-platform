import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');
import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';
import assets from "../../components/TesterAssets";
import Header from "../../components/Headers/Header";

// import Header from "../../components/Headers/Header";
// import { TransInfoCard, TransactionComponent } from "../../components/SupplyChainComponents";

import {
    BigYellowButton, // props =  buttonName, onPress
    HercTextInputWithLabel, //props: placholder, name, label, localOnChange

} from "../../components/SharedComponents";

import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responisiveUI';

export default class SupplyChainMetrics extends Component {
    navigationOptions = ({ navigation }) => {
        return {
            header: <Header headerName={'Asset Name'} navigation={navigation} />
        }
    };

    constructor(props) {
        // console.log(this.props.navigation, "navigation??")
        super(props);
        console.log("componentTest")

    }

    testOnPress = () => {
        console.log("this is this.state", this.state);
    };

    onMetricUpdate = (change, metricName) => {
        this.setState({
            [metricName]: change
        })

    }
    renderMetrics = (coreProps) => {

        let metrics = Object.keys(coreProps);
        let numOfMetrics = metrics.length;
        let metricList = [];
        metrics.forEach((x, i) => {

            metricList.push(
                <HercTextInputWithLabel
                    key={x}
                    label={coreProps[x]}
                    placeholder={coreProps[x]}
                    name={coreProps[x]}
                    localOnchange={this.onMetricUpdate}
                />
            )
        })
        return metricList;
    };

    render() {
        return (

            <View style={styles.baseContainer}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor='transparent'
                />
                <Header headerName={'Asset Name'} navigation={this.props.navigation} />
                <View style={styles.bodyContainer}>

                    {this.renderMetrics(assets[0].CoreProps)}

                    <BigYellowButton buttonName={"Submit"} onPress={this.testOnPress} />
                </View>
            </View>
        );
    };

}
