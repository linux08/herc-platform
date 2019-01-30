import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CameraModal from '../../assets/modals/CameraSourceModal';
import EditModal from '../../assets/modals/Edi-T-Modal'
import styles from "../../assets/styles";
import ColorConstants from "../../assets/ColorConstants";
import React, { Component } from 'react';
import Header from "../../components/Headers/Header";
import { TransInfoCard, TransactionComponent, CameraTransactionComponent } from "../../components/SupplyChainComponents";

var ImagePicker = require('react-native-image-picker');
const { height, width } = Dimensions.get('window');

import {
    BigYellowButton
} from "../../components/SharedComponents";

import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responisiveUI';

export default class SupplyChainTX extends Component {
    navigationOptions = ({ navigation }) => {
        return {
            header: <Header headerName={'Asset Name'} navigation={navigation} />
        }
    }
    constructor(props) {
        // console.log(this.props.navigation, "navigation??")
        super(props);
        console.log("componentTest")
        this.state = {
            camerModalVisibility: false,
            editModalVisibility: false,
            img: {},
            doc: {}
        }
        this.showCameraModal = this.showCameraModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this._pickImage = this._pickImage.bind(this);

    }

    setPic = (snappedImg) => {
        console.log("setting a taken image");
        this.setState({
            img: snappedImg
        })
    }

    showCameraModal = () => {
        console.log("show the camera modal");
        this.setState({
            camerModalVisibility: !this.state.camerModalVisibility
        })

    }
    _pickImage = () => {
        console.log("ImageUpload Camera: picking image")

        ImagePicker.launchImageLibrary({}, (response) => {

            if (response.didCancel) {
                console.log('ImageUpload Camera: User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImageUpload Camera: ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('ImageUpload Camera: User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    img: {
                        image: "data:image/jpg;base64," + response.data,
                        size: response.fileSize,
                        uri: source
                    }
                });
                this.showCameraModal();
            }
        });
    }

    showEditModal = () => {
        console.log('show the edit modal');
        this.setState({
            editModalVisibility: !this.state.editModalVisibility
        })


    }

    testOnPress = () => {
        console.log("this will be Transaction Start!");
        console.log(this.state, 'state here');
    }

    // renderCamera(){
    //     console.log("trying to go to the camera")
    //     this.props.navigation.navigate("Camera");
    // }

    _onBackdropPress = () => {
        this.showCameraModal();

    }


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

                    <View style={localStyles.transactionComponentListContainer}>

                        <CameraTransactionComponent
                            image={this.state.img.string}
                            onPress={() => this.showCameraModal()}
                            iconName='camera'
                            componentName={"Add Photo"}
                        />
                        <TransactionComponent iconName='text-document' componentName={"Add Documents"} />
                        <TransactionComponent onPress={() => this.showEditModal()} iconName='pencil' componentName={"Choose EDI-T Sets"} />
                        <TransactionComponent iconName='clipboard' componentName={"Add Metrics"} />

                    </View>
                    <View style={localStyles.pageBottom}>
                        <BigYellowButton buttonName={"Submit"} onPress={this.testOnPress} />
                    </View>
                </View>

                <CameraModal
                    visibility={this.state.camerModalVisibility}
                    changeModal={this.showCameraModal}
                    _pickImage={this._pickImage}
                    setPic={this.setPic}
                    navigation={this.props.navigation}
                    routeName={'SupplyChainTx'}
                    onBackdropPress={this._onBackdropPress}
                />


                <EditModal visibility={this.state.editModalVisibility} changeModal={this.showEditModal} />
            </View>
        )
    }
}

const localStyles = StyleSheet.create({

    textBold: {
        fontSize: 14,
        color: ColorConstants.MainSubGray,
        marginLeft: 3,
        fontWeight: 'bold',
    },

    textNormal: {
        fontSize: 14,
        color: ColorConstants.MainSubGray,
        marginLeft: 3,
        fontWeight: 'normal',
    },
    transactionComponentListContainer: {
        width: '100%',
        height: heightPercentageToDP('50'),
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: ColorConstants.MainGray,
        // margin: 5
    },

    pageBottom: {
        height: '20%',
        backgroundColor: ColorConstants.MainGray,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        padding: 20,
    },




})