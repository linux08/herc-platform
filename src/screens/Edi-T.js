import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, Image, Picker, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { StackNavigator } from 'react-navigation';
import styles from '../assets/styles';
import edits from '../reducers/Edi-T-Sets';
import { setSet } from '../actions/AssetActions';

class EditSets extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        let headerStyles = StyleSheet.create({
            header__container: {
                display: "flex",
                height: 80,
                alignSelf: "center",
                flex: 1,
                alignContent: "center",
                alignItems: "center",
                marginTop: 40,
                paddingBottom: 20
            },
            header__container__centeredBox: {
                height: "100%",
                alignItems: "center",
                flexDirection: 'row'
            },
            header__text__box: {
                height: "100%",
                marginBottom: 5,
                marginLeft: 12,
            },
            header__image__box: {
                height: "100%",
                borderRadius: 100
            },
            assetHeaderLogo: {
                height: 35,
                width: 35,
                borderRadius: 50,
            },
            headerText: {
                fontFamily: "dinPro",
                fontSize: 26,
                alignSelf: "center",
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
                marginTop: 2,
            },
        })

        return {
            headerTitle: (
              <View style={headerStyles.header__container}>
                <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => navigation.navigate("MenuOptions")}>
                  <View style={headerStyles.header__container__centeredBox}>
                    <View style={headerStyles.header__image__box}>
                      <Image
                        style={headerStyles.assetHeaderLogo}
                        source={{ uri: params.logo }}
                      />
                    </View>
                    <View style={headerStyles.header__text__box}>
                      <Text style={headerStyles.headerText}>{params.name}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            )
        }
    }
    constructor(props) {
        super(props);
        state = {};
    }
    _setEdit = (item) => {
        this.props.setSet(item);
        this.props.navigation.navigate('SupplyChainReview', { logo: this.props.logo, name: this.props.name });
    }


    render() {
        let arrayOfSets = edits.map((item, idx) => {
            return (
                <TouchableHighlight style={{ justifyContent: "center" }} key={idx} onPress={() => this._setEdit(item)}>
                    <View style={localStyles.editField}>
                        <Text style={localStyles.editName}>{item.name.trim()}</Text>
                        <Text style={localStyles.editName}>{item.value}</Text>
                    </View>
                </TouchableHighlight>
            )
        });
        return (
            <View style={styles.container}>
                <View style={[styles.containerCenter, { paddingTop: 20 }]}>
                    <ScrollView style={{ alignSelf: "center", width: "100%", paddingRight: 7 }}>
                      <Text style={localStyles.editLabel}>EDI-T Sets</Text>
                        {arrayOfSets}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    name: state.AssetReducers.selectedAsset.Name,
    logo: state.AssetReducers.selectedAsset.Logo
});

const mapDispatchToProps = (dispatch) => ({
    setSet: (item) => dispatch(setSet(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSets);

const localStyles = StyleSheet.create({
    headerField: {
        flexDirection: "row",
        width: 200,
        justifyContent: "space-around",
        alignItems: "center"
    },
    hercLogoHeader: {
        height: 45,
        width: 45,
        borderRadius: 45 / 2,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 3,
    },
    registerHeaderText: {
        fontFamily: "dinPro",
        height: 50,
        fontSize: 30,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    editLabel: {
        fontFamily: "dinPro",
        fontSize: 21,
        color: "yellow",
        margin: 5,
        alignSelf: "center",
    },
    editTouch: {
        height: 85,
        margin: 5,
        width: "75%"
    },
    editField: {
        height: 50,
        width: "75%",
        justifyContent: "center",
        padding: 3,
        margin: 5,
        alignSelf: "center",
        backgroundColor: "#ffffff"
    },
    editName: {
        fontFamily: "dinPro",
        fontSize: 18,
        color: "black",
        margin: 2,
        alignSelf: "center",
        height: 20,
        justifyContent: "center",
        textAlign: "center"
    },
})
