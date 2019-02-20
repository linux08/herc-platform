import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import styles from '../../assets/styles';
import { connect } from "react-redux";
import ColorConstants from '../../constants/ColorConstants';
import Modal from 'react-native-modal';
import { BigYellowButton, HercTextInputWithLabel } from '../../components/SharedComponents'

class MetricModal extends Component {
    constructor(props) {
        super(props);
        this.state={}
        this.onMetricUpdate = this.onMetricUpdate.bind(this)
    }

    testOnPress = () => {
        console.log("jm metricModal this.state", this.state);
    };

    onMetricUpdate = (change, metricName) => {
        console.log(change, metricName, "jm trying to do the thing")
        this.setState({
            [metricName]: change
        }, () => {console.log("jm", this.state)})

    }

    renderMetrics = (coreProps) => {

        let metrics = Object.keys(coreProps);
        let numOfMetrics = metrics.length;
        let metricList = [];
        metrics.forEach((x, i) => {
          console.log("jm check this",x, i)
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
        console.log("jm this.props.metrics",this.props.metrics)
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

                    <ScrollView contentContainerStyle={localStyles.scrollView}>
                        {this.renderMetrics(this.props.metrics)}
                        <BigYellowButton buttonName={"Submit"} onPress={this.testOnPress} />
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
    logo: state.AssetReducers.selectedAsset.Logo
});

const mapDispatchToProps = (dispatch) => ({
    setSet: (item) => dispatch(setSet(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(MetricModal);

const localStyles = StyleSheet.create({
  scrollView: {
      width: '100%',
      justifyContent: 'center',
      height: '60%'
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
