import {
    ScrollView,
    View,
    StatusBar,
    Alert,
    Share
} from 'react-native';
const loadingGif = require("../../assets/icons/liquid_preloader_by_volorf.gif");
import React, { Component } from 'react';
import { connect } from "react-redux";
import styles from "../../assets/styles";
import { AddAsset } from "../../features/RegisterAssetFlow/RegAssetActionCreators";
import { AssetCard } from "../../components/AssetCard";
import { ToggleCamSourceModal } from "../../features/CamSourceModal/CamSourceModalActionCreators";
import CustomModal from '../../components/modals/CustomModal';
import CameraSourceModal from "../../features/CamSourceModal/Modal/CameraSourceModal";
import { AddPhotoButton, AddMetricButton, RegisterButton } from "../../components/RegisterAssetComponents/RegisterAssetInputs";
import { BasePasswordInput, HercTextInput, HercTextInputWithLabel } from "../../components/SharedComponents";
// import { toggleCamSourceModal } from "../../actions/ModalVisibilityActions";
import firebase from "../../constants/Firebase";
const rootRef = firebase.database().ref();

import ColorConstants from "../../constants/ColorConstants";
class RegAsset1 extends Component {

    constructor(props) {
        // console.log(this.props.navigation, "navigation??")
        super(props);
        console.log("In RegAsset1", props)
        this.state = {
          showImageErrorModal: false,
          metrics: {},
          content: ""
        }
        this.corePropChange = this.corePropChange.bind(this);
        this.pwChange = this.pwChange.bind(this);
        this.setPic = this.setPic.bind(this);
    }

    componentWillMount = () => {
        console.log(this.props, "regAsset1 Props Will mount")
        let newAsset = Object.assign({}, this.props.newAsset);
        this.setState({
            newAsset
        })

        if (this.props.canRegisterAsset === false){
          Alert.alert(
            "Welcome to HERCULES",
            "Registering an asset requires 1000 HERC. Click the button below to purchase additional HERC.",
            [
              {
                text: "Already Have!",
                onPress: () => {console.log("clicked already have!")}
              },
              {
                text: "Purchase",
                onPress: () => { Linking.openURL("https://purchase.herc.one") }
              }
            ]
          );
        }
    }

    // componentDidMount =() => {
    //     console.log(this.props, "props regasset1 didmount")
    // }

    renderInputs = () => {

        let metrics = Object.keys(this.state.newAsset.CoreProps);
        let metricInputs = [];

        //  Trying to get the FIRST input to have a red placeholder
        metrics.map((x, idx) => {
            // let name = x
            idx === 0 ?
                metricInputs.push(
                    <HercTextInputWithLabel
                        key={idx}
                        name={"Metric1"}
                        label={"Metric 1"}
                        placeholder={'Required'}
                        placeholderTextColor="crimson"
                        localOnChange={this.corePropChange}
                    />
                )
                :
                metricInputs.push(
                    <HercTextInputWithLabel
                        label={"Metric " + (idx + 1)}
                        key={x}
                        name={"Metric" + (idx + 1)}
                        placeholder={x}
                        localOnChange={this.corePropChange}
                    />
                )


        })
        console.log(metricInputs);
        return metricInputs;
    }

    //  Functions to pass to the components for value changes
    pwChange = (pwChar) => {
        console.log(pwChar, 'incompoTest Passing functions')
        this.setState({
            ...this.state,
            newAsset: {
                ...this.state.newAsset,
                Password: pwChar
            }
        });
    }

    assetNameChange = (nameEdits) => {
        this.setState({
            ...this.state,
            newAsset: {
                ...this.state.newAsset,
                Name: nameEdits,
            }
        })
    }

    corePropChange = (inputValue, name) => {
        console.log('inputValue', inputValue, "changing coreprop text", name);
        this.setState({
            ...this.state,
            newAsset: {
                ...this.state.newAsset,
                CoreProps: {
                    ...this.state.newAsset.CoreProps,
                    [name]: inputValue
                }
            }
        })
    }


    // same function for both gallery and camera
    setPic = (img) => {
        console.log("setting image, same message for gallery or camera");
        this.setState({
            ...this.state,
            newAsset: {
                ...this.state.newAsset,
                Logo: img.imageString,
                LogoUri: img.uri
            }
        })
    }
    // the function for now to pass the newAsset to Redux State and navigate to confirm.

    CheckIfUserIsCurrent = async (username) => {
      const snapshot = await rootRef.child("users").child(username).once("value");
      console.log('jm exists?', username, snapshot.exists())
        if (snapshot.exists() == true){
          console.log('jm true')
          return true
        } else {
          console.log('jm false')
          return false
        }
      }

      _sendInvite = async () => {
        try {
          const result = Share.share({
              message: "Join Herc Today | A Leading Blockchain Supply Chain Protocol\nhttps://play.google.com/store/apps/details?id=com.HERC",
              url: "https://play.google.com/store/apps/details?id=com.HERC",
              title: "A Leading Supply Chain Protocol Tool"
            },
            {
              dialogTitle: "Send a Hercules Invitation"
            }
          );
        } catch (e) {
          alert(e.message)
        }
      }

    onPressTest = async () => {
        let newAsset = Object.assign({}, this.state)
        let userExists = await this.CheckIfUserIsCurrent(this.state.newAsset.Password)

        if (userExists === true){
          if (!newAsset.newAsset.Logo){
            this.setState({ content: "Please include an image with your asset."})
            this.setState({ showImageErrorModal: true })
          } else {
            if (this.props.canRegisterAsset){
              this.props.AddAsset(this.state.newAsset);
              this.props.navigation.navigate("RegAsset2");
            } else {
              this.setState({ content: "Your account does not meet the minimum amount to register an asset."})
              this.setState({ showImageErrorModal: true })
            }
          }
        } else {
          Alert.alert(
          'The user [' + this.state.newAsset.Password +'] is not a Hercules User.',
          'Would you like to invite them?' ,
          [
            {text: 'Later', onPress: () => console.log('OK Pressed'), style: 'later'},
            {text: 'Send Invite ', onPress: () => this._sendInvite()},
          ],
          { cancelable: false }
        )
        }

    }

    // function to add metric, am considering implementing the modal, but this
    // seems to work

    addMetric = () => {
        let newMetricNumber = Object.keys(this.state.newAsset.CoreProps).length + 1;
        console.log("CoreProps Length: ", newMetricNumber)
        if (newMetricNumber >= 16) {
            Alert.alert("NO More CoreProps");
        } else {
            let newMetricName = "Metric" + newMetricNumber;

            let newCoreProps = Object.assign({}, this.state.newAsset.CoreProps, {
                ...this.state.newAsset.CoreProps,
                [newMetricName]: ""
            })
            console.log(newCoreProps, 'newCoreProps');
            this.setState({
                ...this.state,
                newAsset: {
                    ...this.state.newAsset,
                    CoreProps: newCoreProps
                }
            })
            // this.renderInputs();
        }

    }
    render() {
        console.log(this.state, this.props);

        let metricInputs = this.renderInputs();

        return (

            <View style={styles.baseContainer}>
                <StatusBar
                    barStyle={'light-content'}
                    translucent={true}
                    backgroundColor='transparent'

                />
                <View style={styles.bodyContainer}>

                    <HercTextInputWithLabel
                        name='Asset Name'
                        label='Asset Name'
                        placeholder='Required'
                        localOnChange={this.assetNameChange}
                        placeholderTextColor="crimson"
                    />
                    <BasePasswordInput
                        label='Asset Password'
                        placeholder='Required'
                        pwChange={this.pwChange}
                        placeholderTextColor="crimson"
                    />

                    <ScrollView style={{ alignSelf: "center", width: "103%", maxHeight: '30%' }}>
                        {metricInputs}
                    </ScrollView>
                    <AddMetricButton onPress={() => this.addMetric()} />

                    <AddPhotoButton onPress={() => this.props.ToggleCamSourceModal()} />

                    <View style={[styles.pageBottom, { justifyContent: 'flex-end' }]}>
                        <AssetCard asset={this.state.newAsset} />

                        <RegisterButton onPress={this.onPressTest} />
                    </View>

                    {/* Modal 1 */}


                </View>

                <CameraSourceModal
                    backdropColor={'rgba(0,0,0,0.5)'}
                    visible={this.props.showCamSourceModal}
                    onRequestClose={() => { console.log("modal closed") }}
                    routeName={'RegAsset1'}
                    setPic={this.setPic}
                />

                <CustomModal
                    content={this.state.content}
                    modalCase="error"
                    isVisible={this.state.showImageErrorModal}
                    onBackdropPress={() => {this.setState({showImageErrorModal: false}) }}
                    closeModal={() => {this.setState({showImageErrorModal: false}) }}
                    dismissRejectText={"OK"}
                    />

                {/* <CustomModal
                    heading={"Your thing is Happening"}
                    content={this.state.content}
                    modalCase="add"
                    isVisible={this.state.showAddMetricModal}
                    onBackdropPress={this.toggleAddMetricModal}
                    closeModal={this.toggleAddMetricModal}
                /> */}
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    showCamSourceModal: state.CamSourceModalReducer.showCamSourceModal,
    newAsset: state.RegAssetReducers.newAsset,
    canRegisterAsset: state.RegAssetReducers.canRegisterAsset,
    assetCreator: state.AccountReducers.edge_account
});

const mapDispatchToProps = (dispatch) => ({
    AddAsset: (newAsset) => dispatch(AddAsset(newAsset)),
    // getHercId: () => dispatch(getHercId()),
    ToggleCamSourceModal: () =>
        dispatch(ToggleCamSourceModal())
})
export default connect(mapStateToProps, mapDispatchToProps)(RegAsset1);
