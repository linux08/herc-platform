import {
    Button,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image
} from 'react-native';

import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';
import CustomModal from "../../components/modals/CustomModal";
import { ClearState, GetHercId }  from '../../features/RegisterAssetFlow/RegAssetActionCreators';
import { GetHeaders } from '../../features/SupplyChainFlow/Assets/AssetActionCreators';

class TestSplash extends Component {
    navigationOptions = ({ navigation, screenProps }) => ({
        header: <Header headerTitle={'Welcome'} navigation={navigation} />
    })
    constructor(props) {
        super(props);
        this.state = {
            modalIsVisible: false,

        }
     console.log("whattup");
        // this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillMount = () => {

        this.props.ClearState();
    }
    componentDidMount = () => {
        console.log("function??")
        this.props.GetHercId();
        this.props.GetHeaders();
    }

    // componentWillUnmount = () => {
    //     this.clearInterval(this.state.timer);
    // }

    // tick = () => {
    //     this.setState({
    //         counter: this.state.counter + 1
    //     });
    // }

    closeModal = (seeit) => {
        this.setState({
            modalIsVisible: seeit
        })
    }

    // toggleModal = () => {
    //     console.log("inTestSplash", this.props);
    //     let timer = setInterval(this.tick, 1000);
    //     //     this.setState({ timer });
    //     this.setState({
    //         modalIsVisible: !this.state.modalIsVisible,
    //         timer
    //     })

    // }

    // startTimer = () => {
    //     time
    // }

    render() {
        // let percent = this.state.counter % 3;
        // console.log(percent, "state at render");
        return (
            <View style={localStyles.baseContainer}>
                <StatusBar
                    // hidden={true}
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor={'transparent'}
                />
                <View style={[localStyles.baseContainer, localStyles.splashTop]}>
                    <Image source={require('../../assets/hercLogoPillar.png')}
                        style={localStyles.splashImage}
                        resizeMode="contain"
                    />

                </View>
                <View style={[localStyles.baseContainer, localStyles.bodyContainer]}>


                    <Button title='Continue' onPress={() => this.props.navigation.navigate('SupplyChainNavigator')} />
                </View>

                {/* <CustomModal
                    heading={"Your thing is Happening"}
                    content={this.state.content}
                    modalCase="progress"
                    isVisible={this.state.modalIsVisible}
                    onBackdropPress={this.toggleModal}
                    percent={percent}
                    closeModal={this.closeModal}
                /> */}
            </View>
        )
    }

}

const mapDispatchToProps = (dispatch ) => ({
    GetHercId: () => dispatch(GetHercId()),
    ClearState: () => dispatch(ClearState()),
    GetHeaders: () => dispatch(GetHeaders())
})
export default connect(null, mapDispatchToProps)(TestSplash); 

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


    CopyHeader: {
        fontSize: 14,
        textAlign: 'center',
        margin: 5
    },
    copyBody: {
        fontSize: 12

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


    passwordInputLabel: {
        fontSize: 10,
        color: 'white'
    },
    passwordInputContainer: {

        justifyContent: 'flex-start',
        backgroundColor: ColorConstants.MainSubCrownBlue
    }

})