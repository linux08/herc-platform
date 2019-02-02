import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import styles from '../styles';
import ColorConstants from '../ColorConstants';
import Modal from 'react-native-modal';
import { HercTextInputWithLabel } from '../../components/SharedComponents'

export default class MetricModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let visibility = this.props.visibility;
        console.log(this.props.metrics)
        return (
            <Modal style={styles.baseModal}
                backdropColor={'rgba(0,0,0,0.5)'}
                animationIn={'slideInRight'}
                animationOut={'slideOutRight'}
                isVisible={visibility}
                onRequestClose={() => { console.log("modal closed") }}
            >
                <View style={styles.bodyContainer}>
                    <Text onPress={this.props.changeModal} style={localStyles.editLabel}>{this.props.assetName} Metrics</Text>
                    <TouchableHighlight onPress={this.props.clearMetrics} style={localStyles.editField}>
                        <Text style={localStyles.editLabel}>Clear Metrics</Text>
                    </TouchableHighlight>
                    {/* <FlatList
                        data={this.props.metrics}
                        renderItem={(item) => {
                            console.log(item, 'Metrics??');
                            return (
                                    <HercTextInputWithLabel
                                     label={item.item.value} text={item.item.name} />
                            )
                        }}
                    /> */}

                </View>
            </Modal>
        );
    }
}

// const mapStateToProps = (state) => ({
//     // name: state.AssetReducers.selectedAsset.Name,
//     // logo: state.AssetReducers.selectedAsset.Logo
// });

// const mapDispatchToProps = (dispatch) => ({
//     setSet: (item) => dispatch(setSet(item))
// });
// export default EDI_T_Sets_Modal;
// export default connect(null, mapDispatchToProps)(EditSets);

const localStyles = StyleSheet.create({
    editField: {
        height: 50,
        width: "75%",
        justifyContent: "center",
        padding: 3,
        margin: 5,
        alignSelf: "center",
        backgroundColor: ColorConstants.ElementBG
    },
    baseModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: 'center'
    },

    modalTitle: {
        height: 50,
        fontSize: 30,
        alignSelf: "center",
        fontWeight: "bold",
        color: ColorConstants.MainBlue,
        textAlign: "center"
    },
    editLabel: {
        fontSize: 21,
        color: ColorConstants.MainBlue,
        margin: 5,
        alignSelf: "center",
    },
    editTouch: {
        height: 85,
        margin: 5,
        width: "75%"
    },
    editName: {
        fontSize: 17,
        color: ColorConstants.MainBlue,
        margin: 2,
        alignSelf: "center",
        height: 20,
        justifyContent: "center",
        textAlign: "center"
    },
})
