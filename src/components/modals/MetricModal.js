import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import styles from '../../assets/styles';
import { connect } from "react-redux";
import ColorConstants from '../../constants/ColorConstants';
import Modal from 'react-native-modal';
import { widthPercentageToDP, heightPercentageToDP } from '../../assets/responsiveUI';
import { BigYellowButton, HercTextInputWithLabel } from '../../components/SharedComponents';
import { ShowMetricModal, AddMetrics } from '../../features/SupplyChainFlow/Transactions/TransactionActionCreators';

class MetricModal extends Component {
    constructor(props) {
        super(props);
        this.state={}
        this.onMetricUpdate = this.onMetricUpdate.bind(this)
    }

    submitMetrics = () => {
        this.props.AddMetrics(this.state)
        this.props.ShowMetricModal()
    };

    onMetricUpdate = (change, metricName) => {
        this.setState({
          ...this.state.metrics,
            [metricName]: change
        })

    }

    renderMetrics = (coreProps) => {

        let metrics = Object.keys(coreProps);
        let numOfMetrics = metrics.length;
        let metricList = [];
        metrics.forEach((x, i) => {
            metricList.push(
                <HercTextInputWithLabel
                    key={x}
                    label={x}
                    placeholder={x}
                    name={x}
                    localOnChange={this.onMetricUpdate}
                />
            )
        })
        return metricList;
    };


    render() {
        let visibility = this.props.visibility;
        return (
            <Modal style={styles.baseModal}
                backdropColor={'rgba(0,0,0,0.5)'}
                animationIn={'slideInRight'}
                animationOut={'slideOutRight'}
                isVisible={visibility}
                onRequestClose={() => { console.log("modal closed") }}

            >

                <View style={styles.bodyContainer}>
                    <Text style={localStyles.editLabel}>{this.props.assetName} Metrics</Text>
                    <Text onPress={() => this.props.ShowMetricModal()}  style={localStyles.editLabel}>Close Modal</Text>
                    <TouchableHighlight onPress={this.props.clearMetrics} style={localStyles.editField}>
                        <Text style={localStyles.editLabel}>Clear Metrics</Text>
                    </TouchableHighlight>

                    <ScrollView contentContainerStyle={localStyles.scrollView}>
                        {this.renderMetrics(this.props.metrics)}
                        <BigYellowButton buttonName={"Submit"} onPress={this.submitMetrics} />
                    </ScrollView>

                  {/*  <FlatList
                        data={this.props.metrics}
                        renderItem={(item) => {
                            console.log(item, 'jm Metrics??');
                            return (
                                    <HercTextInputWithLabel
                                     label={item.item.value}
                                     placeholder={item.item.name}
                                     />
                            )
                        }}
                    /> */}

                </View>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    metrics: state.AssetReducers.selectedAsset.ipfsDef.CoreProps,
    assetName: state.AssetReducers.selectedAsset.Name
});

const mapDispatchToProps = (dispatch) => ({
    ShowMetricModal: () => dispatch(ShowMetricModal()),
    AddMetrics: (metrics) => dispatch(AddMetrics(metrics))
});

export default connect(mapStateToProps, mapDispatchToProps)(MetricModal);

const localStyles = StyleSheet.create({
  scrollView: {
      width: widthPercentageToDP('80'),
      justifyContent: 'center',
      height: heightPercentageToDP('60')
  },
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
