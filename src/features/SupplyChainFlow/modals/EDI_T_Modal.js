import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import { connect } from "react-redux";
import styles from '../../../assets/styles';
import ColorConstants from '../../../constants/ColorConstants';
import edits from '../../../constants/Edi-T-Sets';
import Modal from 'react-native-modal';
import { HercTextFieldWithLabel } from '../../../components/SharedComponents'
import { AddEdiT, ShowEditModal, ClearEdiT } from '../Transactions/TransactionActionCreators';

class EDI_T_Sets_Modal extends Component {
    constructor(props) {
        super(props);
    }

    onSelectEdi = (item) => {

        this.props.AddEdiT(item);
        this.props.ShowEditModal();
    }

    clearEdi = () => {
        this.props.ClearEdiT();
        this.props.ShowEditModal();
    }


    render() {
        console.log('editModal', this.props)
        return (
            <Modal style={styles.baseModal}
                backdropColor={'rgba(0,0,0,0.5)'}
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
                isVisible={this.props.visible}
                onRequestClose={() => { console.log("modal closed") }}
                onBackdropPress={() => this.props.ShowEditModal()}
                onBackButtonPress={ ()=> this.props.ShowEditModal()}
            >
                <View style={styles.bodyContainer}>
                    <Text onPress={() => this.props.ShowEditModal()} style={localStyles.editLabel}>Close EDI-T Sets</Text>
                    <TouchableHighlight onPress={() => this.clearEdi()} style={localStyles.editField}>
                        <Text style={localStyles.editLabel}>Clear EDIT</Text>
                    </TouchableHighlight>
                    <FlatList
                        data={edits}
                        keyExtractor={(item) => item.index}
                        renderItem={(item) => {
                            // console.log(item, 'edits??');
                            return (
                                <TouchableHighlight key={item.index} style={{ justifyContent: "center" }} onPress={() => this.props.AddEdiT(item.item)}>
                                    <HercTextFieldWithLabel label={item.item.value} text={item.item.name} />
                                </TouchableHighlight>
                            )
                        }}
                    />

                </View>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => ({
    visible: state.TransactionReducers.modals.editModal,
})

const mapDispatchToProps = (dispatch) => ({
    AddEdiT: (item) => dispatch(AddEdiT(item)),
    ClearEdiT: () => dispatch(ClearEdiT()),
    ShowEditModal: () => dispatch(ShowEditModal())
});
export default connect(mapStateToProps, mapDispatchToProps)(EDI_T_Sets_Modal);
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
