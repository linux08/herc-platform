import {
    Button,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image
} from 'react-native';
import { connect } from "react-redux";

import styles from "../../assets/styles";
import ColorConstants from "../../constants/ColorConstants";
import React, { Component } from 'react';
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';
import { GetHercId } from "../../features/RegisterAssetFlow/RegAssetActionCreators";

class RegAssetSplashTest extends Component {
    constructor(props) {
        super(props);
        console.log(this.props, 'this props in regAssetSplash')
    }

componentDidMount = () => {
    console.log('didMount regSplash')
    this.props.GetHercId();
}


    onPress = () => {
        console.log("pressing to go in RegAssetSplashDraft1");
        // this.props.GetHercId();
        this.props.navigation.navigate('RegAsset1');
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.baseContainer}>
                <View style={[styles.baseContainer, styles.splashTop]}>
                    <Image source={require('../../assets/RegisterAssetAssets/register-asset.png')}
                        style={styles.splashImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={[styles.baseContainer, styles.bodyContainer]}>

                    <Text style={localStyles.copyHeader}>
                        Register your value chain asset for full lifecycle management with a complete view.
                     </Text>

                    <Text style={localStyles.copyBody}>
                        Upon registry you can create full asset history, define, organize and track metrics, conduct asset deployment, and measure asset performance.
                    </Text>

                    <Button title='Continue' onPress={this.onPress}>ContinueButton</Button>
                </View>
            </View>
        )
    }

}

const mapDispatchToProps = (dispatch) => ({
    GetHercId: () => dispatch(GetHercId())
})
export default connect(null, mapDispatchToProps)(RegAssetSplashTest);

const localStyles = StyleSheet.create({

    baseContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: ColorConstants.MainBlue,
        alignItems: "center",
        justifyContent: "flex-start"
    },

    bodyContainer: {
        // width: '100%',
        // backgroundColor: ColorConstants.MainBlue,
        backgroundColor: ColorConstants.MainGray,
        // alignItems: "center",
        // justifyContent: "center",
        // marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    splashTop: {
        width: widthPercentageToDP('98'),
        height: heightPercentageToDP('48'),
        padding: 5,
        justifyContent: 'center'
        // backgroundColor: ColorConstants.MainBlue

    },
    splashImage: {
        width: widthPercentageToDP('60'),
        height: heightPercentageToDP('60'),
        // marginTop: 15
        // flex: 1

    },


    copyHeader: {
        fontSize: 16,
        textAlign: 'center',
        margin: 5,
        fontWeight: 'bold',
        color: ColorConstants.MainBlue

    },
    copyBody: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        color: ColorConstants.MainBlue,
        margin: 5,
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
    // wordsText: {
    //     textAlign: 'center',
    // },
    closeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
    },
    closeButton: {
        padding: 15
    },


    passwordInputLabel: {
        fontSize: 10,
        color: 'white'
    },
    passwordInputContainer: {

        justifyContent: 'flex-start',
        backgroundColor: ColorConstants.MainSubCrownBlue
    }

})
