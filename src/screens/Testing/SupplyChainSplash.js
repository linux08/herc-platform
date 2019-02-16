import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import styles from "../../assets/styles";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { AddAssetButton } from "../../components/SupplyChainComponents/SupplyChainComponents.js";
import { AssetCard } from "../../components/AssetCard";
import { GettingAssetIpfsDefintion, SelectedAsset } from '../../features/SupplyChainFlow/Assets/AssetActionCreators';
// import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

class SupplyChainSplash extends Component {

    constructor(props) {
        // console.log(this.props.navigation, "navigation??")
        super(props);
        console.log("componentTest")

    }

    onSelectAsset = (assetIndex) => {
        this.props.SelectedAsset(this.props.assets[assetIndex]);
        // console.log(assetName, "I got Pressed!")
        this.props.navigation.navigate('SupplyChainSideChoice',{ headerName: this.props.assets[assetIndex].Name});
    }

    renderAssets = () => {

       return assetList = this.props.assets.map((x, i) => {
            console.log(x, i)
            return (
                <TouchableHighlight key={i} onPress={() => this.onSelectAsset(i)}>
                    <AssetCard asset={x} />
                </TouchableHighlight>
            )
        }
        )
    }

    


localOnChange = (inputValue, name) => {
    console.log('inputValue', inputValue, "changing metric text", name);
    this.setState({
        [name]: inputValue
    })
}

render() {

    let assetList = this.renderAssets();
    return (

        <View style={styles.baseContainer}>
            <StatusBar
                barStyle={'light-content'}
                translucent={true}
                backgroundColor='transparent'

            />
            <View style={styles.bodyContainer}>


                {/* <AddAssetButton onPress={this.onPressTest} /> */}
                <ScrollView>
                    {assetList}
                </ScrollView>

            </View>
        </View>
    )
}
}

const mapStateToProps = state => ({
    assets: state.AssetReducers.assets
});

const mapDispatchToProps = dispatch => ({
    SelectedAsset: asset => dispatch(SelectedAsset(asset)),
    GetAssetDef: assetIpfsHash => dispatch(GettingAssetIpfsDefintion(assetIpfsHash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplyChainSplash);

// const localStyles = StyleSheet.create({

//     imageSourceContainer: {
//         flexDirection: 'row',
//         backgroundColor: ColorConstants.MainGray,
//         padding: 10,
//         paddingTop: 30,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: '50%',
//         height: '50%',
//         borderWidth: 0,


//     },

//     sourceIconContainer: {
//         height: '100%',
//         alignItems: 'center',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         backgroundColor: ColorConstants.MainGray
//     },

//     iconButton: {
//         alignSelf: 'center',
//         marginLeft: 10,
//         backgroundColor: ColorConstants.MainGray
//         // height: widthPercentageToDP('5'),
//         // width: heightPercentageToDP('5'),

//     },

//     camSourceIcon: {
//         backgroundColor: ColorConstants.MainGray,
//         justifyContent: 'center',
//         alignSelf: 'center',
//         // height: widthPercentageToDP('10'),
//         // width: heightPercentageToDP('10'),

//     },



//     activityIndicatorWrapper: {
//         backgroundColor: '#FFFFFF',
//         height: 100,
//         width: 100,
//         borderRadius: 7,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-around'
//     },

//     modalButton: {
//         margin: 10,
//         justifyContent: 'center',
//         alignSelf: 'center',
//         borderRadius: 2,
//         borderWidth: 2,
//     },
//     wordsText: {
//         textAlign: 'center',
//     },
//     closeButtonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         width: '80%',
//     },
//     closeButton: {
//         padding: 15
//     },

//     container: {
//         width: '100%',
//         height: '100%',
//         flexDirection: 'column',
//         // backgroundColor: ColorConstants.MainBlue,
//         backgroundColor: ColorConstants.MainGray,
//         alignItems: "center",
//         justifyContent: "flex-start",
//         // marginTop: 20,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20
//     },
//     labelTitle: {
//         fontSize: 18,
//         color: ColorConstants.MainBlue,
//         margin: 5
//     },
//     menuTitle: {
//         color: ColorConstants.MainBlue,
//         fontSize: 26,
//         margin: 5,

//     },
//     passwordInputContainer: {

//         justifyContent: 'flex-start',
//         backgroundColor: ColorConstants.ElementBG
//     }

// })