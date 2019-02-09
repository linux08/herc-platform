import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
} from 'react-native';
const loadingGif = require("../../assets/icons/liquid_preloader_by_volorf.gif");
import { connect } from "react-redux";
import { AssetCard } from "../../components/AssetCard";
import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';
import CameraSourceModal from "../../components/modals/CameraSourceModal";
import CameraModal from "../../components/modals/CameraModal";
import { createStackNavigator } from 'react-navigation';
import { AddPhotoButton, AddMetricButton, RegisterButton } from "../../components/RegisterAssetComponents/RegisterAssetInputs";
import { BasePasswordInput, HercTextInput, HercTextInputWithLabel } from "../../components/SharedComponents";
import { toggleCamSourceModal, toggleCameraModal } from "../../actions/ModalVisibilityActions";
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

class RegAsset1 extends Component {

    constructor(props) {
        // console.log(this.props.navigation, "navigation??")
        super(props);
        console.log("In RegAsset1", props)
        this.state = {

            showAddMetricModal: false,
            showModal3: false,
            asset: {
                HercId: 123,
                Name: "",
                Logo: null,
                CoreProps: {
                    Metric1: "",
                    Metric2: "",
                    Metric3: "",
                    Metric4: "",
                    // Metric5: "",
                    // Metric6: "",

                }
            }
        }
        this.localOnChange = this.localOnChange.bind(this);
        this.pwChange = this.pwChange.bind(this);
        // this.showCamSourceModal = this.showCamSourceModal.bind(this);

    }


    renderInputs = () => {
        let coreProps = this.state.asset.CoreProps;
        let metrics = Object.keys(coreProps);
        let metricInputs = [];
        metrics.map((x) => {
            // let name = x

            metricInputs.push(
                <HercTextInput
                    key={x}
                    name={x}
                    placeholder={x}
                    localOnChange={this.localOnChange}
                />
            )
        })
        console.log(metricInputs);
        return metricInputs;
    }

    showAddMetricModal = () => {
        // console.log(this.state.showAddMetricModal, "showAddMetricModal");
        this.setState({
            showAddMetricModal: !this.state.showAddMetricModal
        })
        // console.log(this.state.showAddMetricModal, "showmodal1after");
    }

    pwChange = (pwChar) => {
        console.log(pwChar, 'incompoTest Passing functions')
        this.setState({
            Password: pwChar
        });
    }

    localOnChange = (inputValue, name) => {
        console.log('inputValue', inputValue, "changing metric text", name);
        this.setState({
            [name]: inputValue
        })
    }

    setPic = (img) => {
        console.log("setting a taken image");
        this.setState({
            ...state,
            asset: {
                ...state.asset,
                Logo: img
            }
        })
    }


    // addMetric = () => {
    //     let oldCoreProps = this.state.asset.CoreProps;
    //     let oldMetLength = Object.keys(oldCoreProps).length;
    //     console.log(oldMetLength, "length of coreProps")
    //     console.log(oldCoreProps, "oldCoreProps");
    //     let newMetricName = "metric" + (oldMetLength + 1);

    //     let newCoreProps = Object.assign({}, oldCoreProps, {
    //         ...oldCoreProps,
    //         [newMetricName]: ""
    //     })
    //     console.log(newCoreProps, 'newCoreProps');
    //     this.setState({
    //         asset: {
    //             CoreProps: newCoreProps
    //         }
    //     })


    // }


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

                    <BasePasswordInput
                        label='Asset Password'
                        placeholder='Asset Password'
                        pwChange={this.pwChange}
                    />

                    <HercTextInputWithLabel
                        name='Asset Name'
                        label='Asset Name'
                        placeholder='Asset Name'
                        localOnChange={this.localOnChange}
                    />

                    {metricInputs}

                    <AddMetricButton onPress={() => this.addMetric()} />

                    <AddPhotoButton onPress={() => this.props.toggleCamSourceModal(true)} />

                    <View style={[styles.pageBottom, { justifyContent: 'flex-end' }]}>
                        {this.state.asset.Logo &&
                            <AssetCard asset={this.state.asset} />
                        }
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
                <CameraModal
                    visible={this.props.showCameraModal}
                    setPic={this.setPic}
                />
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    showCamSourceModal: state.ModalVisibilityReducers.showCamSourceModal,
    showCameraModal: state.ModalVisibilityReducers.showCameraModal
});

const mapDispatchToProps = (dispatch) => ({
    toggleCamSourceModal: (show) =>
        dispatch(toggleCamSourceModal(show)),
    toggleCameraModal: (show) =>
        dispatch(toggleCameraModal(show))
})
export default connect(mapStateToProps, mapDispatchToProps)(RegAsset1);
