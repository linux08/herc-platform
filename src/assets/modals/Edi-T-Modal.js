import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import { connect } from "react-redux";
import styles from '../styles';
import ColorConstants from '../ColorConstants';
import edits from '../../constants/Edi-T-Sets';
import Modal from 'react-native-modal';
import { setSet } from '../../actions/AssetActions';

class EDI_T_Sets_Modal extends Component {
    constructor(props) {
        super(props);
    }
    _setEdit = (item) => {
        console.log('pressedEdit', item)

        // this.props.setSet(item);
        // this.props.navigation.navigate('SupplyChainReview', { logo: this.props.logo, name: this.props.name });
    }

    _arrayOfSets = () => {
        console.log("mapping sets begins")
        edits.map((item, idx) => {
            // console.log(item)
            return (
                <TouchableHighlight style={{ justifyContent: "center" }} key={idx} onPress={() => this._setEdit(item)}>
                    <View style={localStyles.editField}>
                        <Text style={localStyles.editName}>{item.name.trim()}</Text>
                        <Text style={localStyles.editName}>{item.value}</Text>
                    </View>
                </TouchableHighlight>
            )
        });
    }

    render() {
        let visibility = this.props.visibility;
        let arrayOfSets = this._arrayOfSets();
        return (
            <Modal style={styles.baseContainer}
                backdropColor={'rgba(0,0,0,0.5)'}
                isVisible={visibility}
                onRequestClose={() => { console.log("modal closed") }}
            >
                <View style={styles.bodyContainer}>
                    <Text onPress={this.props.changeModal} style={localStyles.editLabel}>EDI-T Sets</Text>
                    <FlatList
                        data={edits}
                        renderItem={(item) => {   
                            console.log(item,'edits??');
                            return(
                            <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => this._setEdit(item)}>
                                <View style={localStyles.editField}>
                                    <Text style={localStyles.editName}>{item.item.name}</Text>
                                    <Text style={localStyles.editName}>{item.item.value}</Text>
                                </View>
                            </TouchableHighlight>
                            )
                        }}
                    />
                    {/* <ScrollView style={{ alignSelf: "center", width: "100%" }}> */}
                    {/* {arrayOfSets} */}
                    {/* </ScrollView> */}
                    {/* </FlatList> */}
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
export default EDI_T_Sets_Modal;
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
