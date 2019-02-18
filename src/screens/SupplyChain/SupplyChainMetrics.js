import {
    Text,
    View,
    StatusBar,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');
import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';
// import assets from "../../components/TesterAssets";
import Header from "../../components/Headers/Header";

// import Header from "../../components/Headers/Header";
import { TransInfoCard } from "../../components/SupplyChainComponents/SupplyChainComponents";

import {
    BigYellowButton, // props =  buttonName, onPress
    HercTextInputWithLabel, //props: placholder, name, label, localOnChange

} from "../../components/SharedComponents";

import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

export default class SupplyChainMetrics extends Component {
    navigationOptions = ({ navigation }) => {
        return {
            header: <Header headerName={'Transaction Metrics'} navigation={navigation} />
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
        console.log(change, metricName, "trying to do the thing")
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
                    localOnChange={this.onMetricUpdate}
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
              
                <TransInfoCard transSide={'Originator'} hercId={'42'} />
                    <HercTextInputWithLabel
                        label={"didchange"}
                        placeholder={"testPlaceHolder"}
                        name={'testName'}
                        localOnchange={this.onMetricUpdate}
                    />
                    <View style={localStyles.centralBody}>
                        <ScrollView contentContainerStyle={localStyles.scrollView}>
                            {this.renderMetrics(assets[0].CoreProps)}
                        </ScrollView>
                    </View>
                    <BigYellowButton buttonName={"Submit"} onPress={this.testOnPress} />
                </View>
            </View>
        );
    };

}

const localStyles = StyleSheet.create({
    scrollView: {
        width: '100%',
        justifyContent: 'center'
    },
    centralBody: {

        height: "60%",
        width: '100%',
        marginTop: 10,
        marginBottom: 10
    }
})
