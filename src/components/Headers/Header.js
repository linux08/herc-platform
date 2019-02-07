import {
    StyleSheet,
    Text,
    View,
    ImageBackground
} from "react-native";
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import menuIcon from 'react-native-vector-icons/Entypo';
import styles from "./HeaderStyles";
import { createStackNavigator } from "react-navigation";
import ColorConstants from "../../assets/ColorConstants";
const bgImage = require("../../assets/main-bg.png")



 class Header extends Component {
    constructor(props) {
        super(props);
    }
    _goBack = () => {
        let navigation = this.props.navigation;
        // let goBackTo = navigation.params.goBackTo
        console.log(navigation, "trying to go back")
        navigation.goBack();
    }
    _toggleSideMenu = () => {
       let toggleSide = this.props.navigation.getScreenProps('toggleSideMenu');
       console.log('ToggleSide',toggleSide);
       toggleSide();
    }

    render() {
        // let toggleSideMenu = this.props.screenProps.toggleSideMenu;
        // let screenProps = this.props.navigation.getScreenProps('toggleSideMenu');
        return (
            <View style={styles.headerCont}>
                <ImageBackground source={bgImage} style={styles.bgImage}>
                    <View style={styles.header__container}>
                        <View style={styles.sideHeaders}>
                            <Icon
                                onPress={() => this._goBack()}
                                style={[styles.iconButton, { marginLeft: 20 }]}
                                name='arrow-left'
                                color={ColorConstants.MainGold}
                            />
                        </View>
                        <Text style={styles.headerText}>{this.props.headerName}</Text>
                        <View style={styles.sideHeaders}>
                            <Icon onPress={() => this._toggleSideMenu}
                                style={[styles.iconButton, { marginRight: 20 }]}
                                name='gear'
                                color={ColorConstants.MainGold}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
export default Header;