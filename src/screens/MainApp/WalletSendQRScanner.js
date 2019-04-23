import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from "react-redux";
import { GetQRData } from '../../features/WalletFlow/WalletActionCreators';


class WalletSendQRScanner extends Component {

    _handleBarcodeRead = (QRData) => {
        console.log("this is what was read", QRData.data);
        this.props.GetQRData(QRData.data);
        this.props.navigation.navigate("WalletFlow")
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onBarCodeRead={(QRData) => this._handleBarcodeRead(QRData)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});

const mapDispatchToProps = dispatch => ({
    GetQRData: (QRData) => dispatch(GetQRData(QRData))
}) 

export default connect(null,
    mapDispatchToProps
)(WalletSendQRScanner);