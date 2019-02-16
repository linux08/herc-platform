import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView
} from 'react-native';
import { connect } from "react-redux";
import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';

import CustomModal from '../../components/modals/CustomModal';
import { SettingHeaderInFirebase } from '../../features/RegisterAssetFlow/RegAssetActionCreators';
import { AssetCard } from "../../components/AssetCard";
import { RegisterButton } from '../../components/RegisterAssetComponents/RegisterAssetInputs';
import {
    BasePasswordInput,
    HercTextFieldWithLabel,
    CostDisplay
} from '../../components/SharedComponents';

// const buildingPic = require("../../assets/83MaidenLn.jpg")

class RegAsset2 extends Component {

    constructor(props) {
        super(props);
        console.log("componentTest")
        this.state = {
            isVisible: false,
            // Password: "HELMSLEYSPEAR",
            // CoreProps: {
            //     metric1: "Tenant Name",
            //     metric2: "Landlord Name",
            //     metrci3: "Building Name / Address",
            //     metric4: "Unit",
            //     metric5: "Unit Type",
            //     metric6: "Square footage",
            //     metric8: "Lease start date",
            //     metric9: "Lease commencement date",
            //     metric10: "Rent commencement date",
            //     metric11: "Lease end date",
            //     metric12: "Current rent",
            //     metric13: "Rent Bumps",
            //     metric14: "Tenant expenses",

        }
    }

    toggleModal = () => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    allDone = () => {
        this.setState({
            isVisible: false,
        })
        this.props.navigation.navigate('TestSplash');
        // this.props.clearState();

    }

    onPress = () => {
        console.log("starting the test register");
        this.props.SettingHeader(this.props.newAsset.LogoUri);
        this.setState({
            isVisible: true
        })
    }

   
    renderMetrics = () => {
        let coreProps = this.props.newAsset.CoreProps;
        let metrics = Object.keys(coreProps);
        let numOfMetrics = metrics.length;
        let metricList = [];
        metrics.forEach((x, i) => {

            metricList.push(
                <HercTextFieldWithLabel
                    key={x}
                    label={"Metric " + (i + 1)}
                    text={coreProps[x]}
                />
            )
        })
        console.log(metrics, "metrics from state");
        return metricList;
    }

    render() {
        console.log(this.props, "props in regasset2, lookin for the newAsset")
        let metricList = this.renderMetrics();
        return (
            <View style={styles.baseContainer}>

                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor='transparent'
                />

                <View style={styles.bodyContainer}>
                    <AssetCard asset={this.props.newAsset} />
                    <HercTextFieldWithLabel
                        label={"Asset Password"} value={this.props.newAsset.Password}
                        text={this.props.newAsset.Password}
                    />
                    <ScrollView>
                        {metricList}
                    </ScrollView>
                    <View style={localStyles.pageBottom}>
                        <CostDisplay amount={'1,000'} />

                        <RegisterButton onPress={this.onPress} />
                    </View>


                </View>
                <CustomModal
                    heading={"Your Asset Is Being Written To The Blockchain"}
                    content={this.props.content}
                    modalCase="progress"
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.toggleModal()}
                    percent={this.props.percent}
                    closeModal={this.allDone}
                    dismissRejectText={"All Done"}
                />

            </View>



        )
    }

}

const mapStateToProps = (state) => ({
    newAsset: state.RegAssetReducers.newAsset,
    content: state.RegAssetReducers.content,
    percent: state.RegAssetReducers.percentage


    // hercId: state.AssetReducers.hercId,
    // edgeAccount: state.WalletActReducers.edge_account,
    // wallet: state.WalletActReducers.wallet,
    // watchBalance: state.WalletActReducers.watchBalance,
});

const mapDispatchToProps = (dispatch) => ({
    SettingHeader: () => {
        dispatch(SettingHeaderInFirebase())
    }
    // clearState: () => {
    //     dispatch(clearState())
    // }


})

export default connect(mapStateToProps, mapDispatchToProps)(RegAsset2);

const localStyles = StyleSheet.create({
    pageBottom: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
        alignContent: 'center'
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    // container: {
    //     flex: 1,
    //     backgroundColor: ColorConstants.MainGray,
    //     alignItems: "center",
    //     justifyContent: "center"
    //   },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '50%',
        width: '90%',
        backgroundColor: '#00000040'

    },
    activityIndicatorWrapper: {
        // backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    modalButton: {
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 2,
        borderWidth: 2,
    },
    wordsText: {
        textAlign: 'center',
    },
    closeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
    },
    closeButton: {
        padding: 15
    },

    container: {
        width: '100%',
        // backgroundColor: ColorConstants.MainBlue,
        backgroundColor: ColorConstants.MainGray,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    inputLabel: {
        fontSize: 10,
        color: 'white'
    },
    inputContainer: {

        justifyContent: 'flex-start',
        backgroundColor: ColorConstants.MainSubCrownBlue
    }

})