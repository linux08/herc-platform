import {
    StyleSheet,
    Text,
    View,
    ImageBackground
} from "react-native";
import React, { Component } from "react";
import WalletIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import menuIcon from 'react-native-vector-icons/Entypo';
import styles from "./HeaderStyles";
import { createStackNavigator } from "react-navigation";
import ColorConstants from "../../constants/ColorConstants";
import { connect } from "react-redux";
import {
    ClearImages,
    ClearDocuments,
    ClearEdiT,
    ClearMetrics } from '../../features/SupplyChainFlow/Transactions/TransactionActionCreators';


const bgImage = require("../../assets/main-bg.png")



 class Header extends Component {
    constructor(props) {
        super(props);
        console.log(props, this.state, "header stuff")
    }
    _goToWallet = () => {
      /* ********************************************
      This used to be a _goBack()
        let navigation = this.props.navigation;
        // let goBackTo = navigation.params.goBackTo
        console.log(navigation, "trying to go back")
        navigation.goBack();
        ******************************************** */
        this.props.navigation.navigate('WalletFlow');
        this._clearTransactionData();
    }
    _toggleSideMenu = () => {
       console.log('ToggleSide');

        this.props.navigation.toggleDrawer();
    }

    _clearTransactionData = () => {
        //Bugfix Zube Card #722
        //*MH* clear transaction data from redux store
        this.props.ClearImages();
        this.props.ClearDocuments();
        this.props.ClearEdiT();
        this.props.ClearMetrics();
    }

    render() {
        // let toggleSideMenu = this.props.screenProps.toggleSideMenu;
        // let screenProps = this.props.navigation.getScreenProps('toggleSideMenu');
        return (
            <View style={styles.headerCont}>
                <ImageBackground source={bgImage} style={styles.bgImage}>
                    <View style={styles.header__container}>
                        <View style={styles.sideHeaders}>
                            <WalletIcon
                                onPress={() => this._goToWallet()}
                                style={[styles.iconButton, { marginLeft: 20 }]}
                                name='account-balance-wallet'
                                color={ColorConstants.MainGold}
                                size={20}
                            />
                        </View>
                        <Text style={styles.headerText}>{this.props.headerTitle}</Text>
                        <View style={styles.sideHeaders}>
                            <Icon onPress={this._toggleSideMenu}
                                style={[styles.iconButton, { marginRight: 20 }]}
                                name='gear'
                                color={ColorConstants.MainGold}
                                size={20}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    ClearImages: () => dispatch(ClearImages()),
    ClearDocuments: () => dispatch(ClearDocuments()),
    ClearEdiT: () => dispatch(ClearEdiT()),
    ClearMetrics: () => dispatch(ClearMetrics())
})

export default connect(
    null,
    mapDispatchToProps
)(Header);