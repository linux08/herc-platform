import React, { Component } from 'react';
import { Modal, Platform, StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableHighlight, Alert, Button, ActivityIndicator, Linking } from 'react-native';
// import submit from "../components/buttons/submit.png"; // todo: turn into vector
import logo from "../assets/round.png";
import { connect } from "react-redux";
import styles from "../assets/styles";
import hercPillar from "../assets/hercLogoPillar.png";
import { incHercId, confirmAssetStarted, confirmAssetComplete, settingHeader, settingHeaderError } from "../actions/AssetActions"
import modalStyle from "../assets/confModalStyles";
// import CustomModal from "../components/CustomModal"
import { TOKEN_ADDRESS, DEVELOPERS } from "../components/settings"
import BigNumber from 'bignumber.js';
import firebase from "../constants/Firebase";

class NewAssetConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            loading: false,
            confirmComplete: false,
            balance: 'madeupBalance',
            transactionId: null
        }

        this._changeModalVisibility = this._changeModalVisibility.bind(this);
        this._CheckBalance = this._CheckBalance.bind(this);
    }


    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle:
                { justifyContent: "space-around" },
            headerTitle: (
                <View style={localStyles.headerField}>
                    <Image
                        style={localStyles.hercLogoHeader}
                        source={logo}
                    />
                    <Text style={localStyles.registerHeaderText}>Register</Text>
                </View>
            )
        }
    }


    componentDidMount() {
        console.log("here in newAssetConfirm", this.props, "that was props, state is next", this.state)
    }
    // componentWillMount() {
    // try {
    //   let balance = new BigNumber(this.props.watchBalance["HERC"])
    //   console.log(balance, "balance from watchbalanc...or");
    //   console.log(this.props, "props", this.state, "this.state");
    //   this.setState({ balance: balance.times(1e-18).toFixed(6) })
    // } catch(e) {
    //   if (this.props.wallet.balances['HERC']) {
    //     let balance =  new BigNumber(this.props.wallet.balances['HERC'])
    //     this.setState({ balance: balance.times(1e-18).toFixed(6) })
    //   }
    //   else {
    //     let balance =  new BigNumber('0')
    //     this.setState({ balance: balance.times(1e-18).toFixed(6) })
    //   }
    // }
    // this.setState({
    //     hercId: this.props.hercId
    // })
    // if (this.props.dataFlags.confirmStarted) {
    //     this.setState({ loading: true })
    // }
    // }


    _changeModalVisibility = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }


    // since all the assets require images, I took away the non-Image option
    uploadImageAsync = async (uri) => {
        this._changeModalVisibility();
        const { navigate } = this.props.navigation;
        let newAsset = this.props.newAsset;
        const response = await fetch(uri);
        const blob = await response.blob();

        let logoLocation = firebase.storage().ref('assets')
            .child(this.props.edgeAccount)
            .child(newAsset.Name)
            .child("Logo");

        let assetLocation = firebase.database().ref('assets')
            .child(this.props.edgeAccount);

        const snapshot = await logoLocation.put(blob);
        let downloadURL = snapshot.downloadURL;
        let fbAsset, ipfsAsset;


        ipfsAsset = Object.assign({}, {
            Name: newAsset.Name,
            CoreProps: newAsset.CoreProps,
            hercId: this.props.hercId,
        });

        fbAsset = {
            hercId: this.props.hercId,
            Name: newAsset.Name,
            Logo: downloadURL,
            Password: newAsset.Password
        }

        console.log("Right before sending to send_trans: jm", ipfsAsset, fbAsset)

        this.props.settingHeader(fbAsset);
        this.props.confirmAssetStarted(ipfsAsset);
        this.props.incHercId(this.props.hercId);
    }

    _CheckBalance() {

        console.log("Checking Balances, circumventing dev check")
        if (DEVELOPERS.includes(this.props.edgeAccount)) {
            // this is a developer
            console.log("You are a developer. jm")
            this.uploadImageAsync(this.props.newAsset.Logo.uri)
            console.log(this.state, this.props, "not sending the asset")
        } else {
            console.log("jm checkbalance()", this.props.wallet.balances.HERC)
            debugger;
            // this is a non-developer
            console.log("You are NOT a developer. jm")
            let price = new BigNumber(1000)

            let weibalance = new BigNumber(this.props.wallet.balances.HERC)
            //  Balance is stored as wei, converting to HERCS for check
            let convertBalance = weibalance.times(1e-18);
            // this is the math after converting the user balance to eth from wei
            let convertMath = convertBalance.minus(price);

            console.log(
                'do you have enough?', convertMath.isPositive(),
                "convertBalance" + convertBalance,
                "convertMath:" + convertMath
            );

            if (convertMath.isNegative()) {
                Alert.alert(
                    'Insufficient Funds',
                    'Current Balance: ' + convertBalance.toFixed(12) + ' HERC',
                    [
                        { text: 'Top Up Hercs', onPress: () => Linking.openURL("https://purchase.herc.one/"), style: 'cancel' },
                        { text: 'Ok', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: true }
                )
            } else {
                Alert.alert(
                    'You Meet the Minimum Balance!',
                    'Current Balance:' + convertBalance.toFixed(12) + ' HERC \n Do you wish to proceed?',
                    [
                        { text: 'Cancel', onPress: () => console.log('No Pressed'), style: 'cancel' },
                        { text: 'Yes, Make an Asset', onPress: () => this.uploadImageAsync() },
                    ],
                    { cancelable: false }
                )
            }
        }
    }




    PressSubmit = () => {

        console.log("checking balance after button press")
        console.log(this.props, "wtf is this");
        // console.log(this.props.wallet.balances);
        // this._changeModalVisibility();
        this._CheckBalance();
        // Alert.alert(
        //   'Minimum Balance Requirement: 1000 HERC',
        //   'Current Balance: \n'+ this.props.watchBalance.HERC + ' HERC \nDo you wish to check if your balance meets the minimum requirement?' ,
        //   [
        //     {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        //     {text: 'Yes', onPress: () => {this._checkBalance()} },
        //   ],
        //   { cancelable: false }
        // )


    };


    _goToMenu = () => {
        const { navigate } = this.props.navigation;
        this._changeModalVisibility();
        navigate('MenuOptions');

    };
    render() {
        const { navigate } = this.props.navigation;
        let price = this.state.fctPrice;
        let hercId = this.props.hercId;
        let newAsset = this.props.newAsset;
        let Logo, list;
        let Name = newAsset.Name;
        let password = this.props.newAsset.Password


        Logo = (<Image style={styles.assetHeaderImage} source={{ uri: newAsset.Logo.uri }} />);


        list = Object.getOwnPropertyNames(newAsset.CoreProps).map((x, i) => {
            let num = (i + 1);
            return (
                <View key={i} style={localStyles.assetMetricInputField}>
                    <Text style={localStyles.text}>Metric: {num}</Text>
                    <Text style={localStyles.input}>{x}</Text>
                </View>
            )
        })




        return (
            <View style={styles.container}>
                <View style={styles.containerCenter}>

                    <Text style={styles.assetHeaderLabel}>{Name}</Text>
                    {Logo}
                    <Text style={styles.assetHeaderLabel}>HercID: {hercId}</Text>
                    <Text style={styles.assetHeaderLabel}>Password: {password}</Text>
                    <ScrollView style={{ paddingRight: 5, alignSelf: "center", width: "100%" }}>

                        {list}

                    </ScrollView>

                    <TouchableHighlight
                        style={[localStyles.button, { backgroundColor: 'white' }]}
                        onPress={this.PressSubmit}>
                        <Text>Submit</Text>
                    </TouchableHighlight>

                    <View style={localStyles.newAssetFeeContainer}>
                        <Image style={localStyles.assetFeePillarLogo} source={hercPillar} />
                        <Text style={localStyles.assetFeePrice}>1,000</Text>
                    </View>

                </View>

                {/* <CustomModal modalCase="error"
                    closeModal={this._changeModalVisibility}
                    isVisible={this.state.modalVisible}
                    content="Your content here."
                    dismissRejectText="Close"
                /> */}

                <Modal
                    transparent={false}
                    animationType={'none'}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { console.log("modal closed") }}
                >
                 <View style={modalStyle.baseModal}>
                        <View style={modalStyle.modalCenter}>
                           <Text 
                           onPress={this._changeModalVisibility}
                           style={modalStyle.labelTitle}>Close Modal</Text>

                            {!this.props.dataFlags.confirmAssetComplete &&
                                <Text style={modalStyle.wordsText}>Your Asset Information Is Being Written To The Blockchain. {"\n"}This may take a while. Please be patient. At this point, you cannot cancel the transaction. You may return to Main Menu if you wish.</Text>
                            }

                            <View style={modalStyle.activityIndicatorWrapper}>
                                <ActivityIndicator
                                    animating={this.props.dataFlags.confirmStarted} size="large" color="#091141" />
                            </View>

                            {this.props.dataFlags.confAssetComplete &&
                                <View>
                                    <Text style={modalStyle.labelTitle}>Your Transaction Has Completed!</Text>
                                    <TouchableHighlight
                                        style={modalStyle.modalButton}
                                        onPress={() => this._goToMenu()}>
                                        <Text style={modalStyle.menuTitle}>Back to Menu</Text>
                                    </TouchableHighlight>
                                </View>
                            }

                        </View>
                    </View>
                </Modal> 
            </View>



        )
    }

}

const mapStateToProps = (state) => ({
    newAsset: state.AssetReducers.newAsset,
    hercId: state.AssetReducers.hercId,
    edgeAccount: state.WalletActReducers.edge_account,
    wallet: state.WalletActReducers.wallet,
    dataFlags: state.AssetReducers.dataFlags,
    watchBalance: state.WalletActReducers.watchBalance,
});

const mapDispatchToProps = (dispatch) => ({
    settingHeader: (fbHead) => {
        dispatch(settingHeader(fbHead))
    },
    confirmAssetStarted: (asset) =>
        dispatch(confirmAssetStarted(asset)),
    confirmAssetComplete: () =>
        dispatch(confirmAssetComplete()),

    incHercId: (hercid) =>
        dispatch(incHercId(hercid))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewAssetConfirm);

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
    assetMetricInputField: {
        height: 40,
        flexDirection: "row",
        width: "100%",
        borderColor: "blue",
        justifyContent: "space-between",
        margin: 5,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        color: "white",
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "normal",
        margin: 5,
        fontFamily: "dinPro"
    },
    input: {
        width: "53%",
        height: 24,
        textAlign: "center",
        backgroundColor: "#ffffff",
        fontSize: 16,
        fontWeight: "200",
        borderColor: "blue",
        color: "black",
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 3
    },
    imageButtons: {
        height: 40,
        width: 175,
        resizeMode: "contain",
        alignSelf: "center",
        margin: 7
    },
    newAssetFeeContainer: {
        height: 50,
        width: 125,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    assetFeePillarLogo: {
        height: 40,
        width: 30,
        backgroundColor: "#091141",
        resizeMode: "contain",
    },
    assetFeePrice: {
        backgroundColor: "#091141",
        textAlign: "center",
        fontSize: 20.2,
        fontWeight: "400",
        color: "white",
        height: 30
    },
    wordsText: {
        height: 23,
        fontSize: 20,
        fontWeight: "600",
        color: "white"
    },
    yellowText: {
        height: 23,
        fontSize: 20,
        fontWeight: "600",
        color: "yellow"
    },
    button: {
        width: 80,
        borderColor: "black",
        borderWidth: 2,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
    }


})
