import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import ColorConstants from "../constants/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../assets/responsiveUI';
import Icon from "react-native-vector-icons/AntDesign";



export class AssetCard extends Component {
    constructor(props) {
        super(props);
    }


    componentWillMount = () => {
        // console.log("willmount in AssetCard", this.props);
        this.setState(this.props.asset);
        console.log(this.props, " this is the assetCard props +++")
    }

    componentWillReceiveProps = (props) => {
        if (props.asset.Name != this.state.Name) {
            this.setState({
                Name: props.asset.Name
            })
        }

        if (props.asset.Logo != this.state.Logo) {
            this.setState({
                Logo: props.asset.Logo
            })
        }
        if (props.asset.hercId != this.state.hercId) {
            this.setState({
                hercId: props.asset.hercId
            })
        }
        if(props.asset.LogoUri != this.state.Logo) {
            this.setState({
                LogoUri: props.asset.LogoUri
            })
        }
    }
    render() {
        console.log(this.state, "this is state should have LOGO")
        let noImageIcon = <Icon name={'picture'} size={33} color={ColorConstants.MainBlue} />
        return (
            <View key={this.props.index} style={localStyles.assetCard}>
                <View style={localStyles.assetImageContainer}>
                    {this.state.Logo ?

                        <Image source={{ uri: this.state.LogoUri }} style={localStyles.assetImage} />

                        : noImageIcon
                    }
                </View>

                <View style={localStyles.cardMain}>
                    <View style={localStyles.cardContentLeft}>
                        <Text style={localStyles.assetLabel}>Asset Name</Text>
                        <Text style={localStyles.assetName}>{this.state.Name}</Text>
                    </View>
                    <View style={localStyles.cardContentRight}>
                        <Text style={localStyles.assetLabel}>Herc ID</Text>
                        <Text style={localStyles.assetName}>{this.state.hercId}</Text>
                    </View>
                </View>
            </View>

        )
    }
}

const localStyles = StyleSheet.create({

    assetCard: {
        // flex: 0,
        width: widthPercentageToDP('80'),
        height: heightPercentageToDP('10'),
        borderRadius: 6,
        backgroundColor: ColorConstants.MainGray,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    assetImageContainer: {
        height: '90%',
        width: '25%',
        // backgroundColor: ColorConstants.MainBlue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    assetImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'

    },

    cardMain: {
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGray,
        width: "70%",
        height: "80%",
        padding: 5

    },
    cardContentLeft: {
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContentRight: {
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    assetName: {
        fontSize: 14,
        color: ColorConstants.MainBlue,
        margin: 2,
        textAlign: 'left'
    },
    assetLabel: {
        color: ColorConstants.MainSubGray,
        fontSize: 12,
        margin: 2,
        marginRight: 3,
        textAlign: 'left'

    },



})
