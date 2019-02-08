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
import CameraSourceModal from "../../components/modals/CameraSourceModal"
import { createStackNavigator } from 'react-navigation';
import { AddPhotoButton, AddMetricButton, RegisterButton } from "../../components/RegisterAssetComponents/RegisterAssetInputs";
import { BasePasswordInput, HercTextInput, HercTextInputWithLabel } from "../../components/SharedComponents";
import { toggleCamSourceModal } from "../../actions/ModalVisibilityActions";
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';

 class RegAsset1 extends Component {

    constructor(props) {
        // console.log(this.props.navigation, "navigation??")
        super(props);
        console.log("In RegAsset1", props, )
        this.state = {
            showCamSourceModal: false,
            showModal2: false,
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

    // onPressTest = () => {

    //     console.log("I got Pressed!")
    //     this.props.navigation.navigate('RegAsset2');
    // }

    // showCamSourceModal = () => {
    //     // console.log(this.state.showCamSourceModal, "showCamSourceModal");
    //     this.setState({
    //         showCamSourceModal: !this.state.showCamSourceModal
    //     })
    //     // console.log(this.state.showCamSourceModal, "showmodal1after");
    // }

    // changeModal2 = () => {
    //     console.log(this.state.showModal2, "showmodal2");
    //     this.setState({
    //         showModal2: !this.state.showModal2
    //     })
    //     console.log(this.state.showModal2, "showmodal2after");
    // }


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

    setPic = (snappedImg) => {
        console.log("setting a taken image");
        this.setState({
            Logo: snappedImg
        })
    }

    render() {


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

                    <AddMetricButton onPress={this.show} />

                    <AddPhotoButton onPress={() => this.props.showCamSourceModal(true)} />

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
                    // visible={this.props.showCamSourceModal}
                    onRequestClose={() => { console.log("modal closed") }}
                    routeName={'RegAsset1'}
                />
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    showCamSourceModal: state
    
});

const mapDispatchToProps = (dispatch) => ({
    showCamSourceModal: (show) =>
        dispatch(toggleCamSourceModal(show))
})
export default connect(mapStateToProps, mapDispatchToProps)(RegAsset1);
