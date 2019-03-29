import {
    ScrollView,
    View,
    StatusBar,
    Alert,
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

import ColorConstants from "../../assets/ColorConstants";
class RegAsset1 extends Component {

    constructor(props) {
        // console.log(this.props.navigation, "navigation??")
        super(props);
        console.log("In RegAsset1", props)
        this.state = {
          showImageErrorModal: false,
          metrics: {}
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
    onPressTest = () => {
        let newAsset = Object.assign({}, this.state)
        console.log(newAsset, "hopefully shallow clone")
        // if (!newAsset.newAsset.Logo){
        //   console.log('jm DO NOT PASS GO')
        //   // insert Alert modal here
        //   <CustomModal
        //       heading={"Oops! This is incomplete."}
        //       content={"Please include an image with your asset."}
        //       modalCase="error"
        //       isVisible={this.state.isVisible}
        //       onBackdropPress={() => this.toggleModal()}
        //       closeModal={this.allDone}
        //       dismissRejectText={"All Done"}
        //   />
        // }
        console.log('jm check canRegisterAsset flag', this.props.canRegisterAsset);
        if (this.props.canRegisterAsset){
          this.props.AddAsset(this.state.newAsset);
          this.props.navigation.navigate("RegAsset2");
        }
        else {
          this.setState({ showImageErrorModal: true })
        }

    }

    // function to add metric, am considering implementing the modal, but this
    // seems to work

    addMetric = () => {
        let newMetricNumber = Object.keys(this.state.newAsset.CoreProps).length + 1;
        console.log("CoreProps Length: ", newMetricNumber)
        if (newMetricNumber >= 16) {
            Alert("NO More CoreProps");
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

                    <ScrollView style={{ alignSelf: "center", width: "103%", maxHeight: '40%' }}>
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
                    content={"Please include an image with your asset."}
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
    canRegisterAsset: state.RegAssetReducers.canRegisterAsset
});

const mapDispatchToProps = (dispatch) => ({
    AddAsset: (newAsset) => dispatch(AddAsset(newAsset)),
    // getHercId: () => dispatch(getHercId()),
    ToggleCamSourceModal: () =>
        dispatch(ToggleCamSourceModal()),
})
export default connect(mapStateToProps, mapDispatchToProps)(RegAsset1);
