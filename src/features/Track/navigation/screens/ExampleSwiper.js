import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View, Image, Dimensions, Share, TouchableHighlight, Clipboard, Alert } from 'react-native'
import AssetCard from '../../.././../components/AssetCard';
import { connect } from "react-redux";
import { VERSION } from '../../.././../components/settings.js'
import ColorConstants from '../../../../constants/ColorConstants';
import { widthPercentageToDP, heightPercentageToDP } from '../../../../assets/responsiveUI'
const hercpngIcon = require('../../../../assets/icons/hercIcon.png');
const { height, width } = Dimensions.get('window');

import { SwiperTextFieldWithLabel, SwiperBigYellowButton, SwiperTextFieldWithLabelAndCopy, SwiperTextFieldWithLabelAndHercIcon, SimpleAssetCard } from './components';
import { AlertAddAlert } from 'material-ui/svg-icons';
import { Icon } from 'native-base';
const swiperShareIcon = require("../../images/swiperShare.png");
import FeatherIcons from 'react-native-vector-icons/Feather';

class ExampleSwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: Object.keys(this.props.transactions).map(x => this.props.transactions[x]),
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
    }
  }

  _goToWebView = (factomChain, factomEntry) => {
    this.props.navigation.navigate('FactomWebView', { data: { factomChain, factomEntry } });
  }

  makeMessage = (cardData) => {
    let data = cardData.data;
    let messageData = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        messageData.push(key + ': ' + "https://ipfs.io/ipfs/" + data[key] + ';' + "\n")
      }
    }

    let header = cardData.header
    //location is not yet implemented, but this is an example
    // let location = header.tXLocation.toUpperCase() + " ";
    let time = header.dTime;
    let password = header.password;
    let title = header.name + " " + " Transaction @ " + time + ";" + "\n"
    let price = + header.price + " Herc" + ";\n";
    let sig = "Sent from Herc v" + VERSION
    let message = title + messageData + "\n" + 'Permissible: ' + password + "\n" + 'Price: ' + price + "\n " + sig;
    return [title, message];
  }

  sharing = (data) => {

    if (data) {
      let shareTitle = this.makeMessage(data);
      Share.share({
        message: shareTitle[1],
        title: shareTitle[0]
      },
        {// Android only:
          dialogTitle: shareTitle.title,
          // iOS only:
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter'
          ]
        })
    }
  }

  _copyIPFSHashToClipboard = (data) => {
    let ipfsDirectLink = "https://ipfs.io/ipfs/" + data;
    Clipboard.setString(ipfsDirectLink);
    this._alertCopied(ipfsDirectLink);
  }

  _copyFactomEntryViewToClipboard = (chainID, entryID) => {
    let factomDirectLink = "https://explorer.factom.com/chains/" + chainID + "/entries/" + entryID;
    Clipboard.setString(factomDirectLink);
    this._alertCopied(factomDirectLink);
  }

  _copyFactomChainViewToClipboard = (chainID) => {
    let factomDirectLink = "https://explorer.factom.com/chains/" + chainID;
    Clipboard.setString(factomDirectLink);
    this._alertCopied(factomDirectLink);
  }

  _alertCopied = (text) => {
    Alert.alert(
      'Copied', text
    );
  }

  renderCard = (card, index) => {
    if (card) {
      let unKey = this.props.SelectedAsset.key;
      let factomChain = this.props.SelectedAsset.hashes.chainId;
      let corePropsHash = this.props.SelectedAsset.hashes.ipfsHash;
      let factomEntry = card.header.factomEntry
      let data = card.data;
      let header = card.header;
      let metricsHash, ediTHash, documentHash, imageHash, price;

      if (data.hasOwnProperty('ediT')) {
        ediTHash = data.ediT;
      }

      if (data.hasOwnProperty('documents')) {
        documentHash = data.documents;
      }

      if (data.hasOwnProperty('images')) {
        imageHash = data.images;
      }

      if (data.hasOwnProperty('metrics')) {
        metricsHash = data.metrics;
      }

      if (header.hasOwnProperty('price')) {
        price = header.price.toString();
      }

      return (
        <View key={unKey} style={swiperStyles.card}>
          {header.dTime && <SwiperTextFieldWithLabel key={'Created'} text={header.dTime} label={'Created'} />}

          <TouchableHighlight onLongPress={() => this._copyFactomChainViewToClipboard(factomChain)} style={{ width: "97%" }}>
            <View>
              <SwiperTextFieldWithLabelAndCopy key={factomChain} label={'Factom Chain'} text={factomChain} />
            </View>
          </TouchableHighlight>

          {/* line below is currently not applicable */}
          {/* {header.tXLocation && <SwiperTextFieldWithLabel key={'Classification'} text={header.tXLocation} label={'Classification'} />} */}

          <TouchableHighlight onLongPress={() => this._copyFactomEntryViewToClipboard(factomChain, factomEntry)} style={{ width: "97%" }}>
            <SwiperTextFieldWithLabelAndCopy key={factomEntry} text={factomEntry} label={'Factom Entry'} />
          </TouchableHighlight>

          <TouchableHighlight onLongPress={() => this._copyIPFSHashToClipboard(imageHash)} style={{ width: "97%" }} >
            <View>
              {corePropsHash && <SwiperTextFieldWithLabelAndCopy key={corePropsHash} label={'Core Properties'} text={corePropsHash} />}
            </View>
          </TouchableHighlight>

          <TouchableHighlight onLongPress={() => this._copyIPFSHashToClipboard(imageHash)} style={{ width: "97%" }}>
            <View>
              {imageHash && <SwiperTextFieldWithLabelAndCopy key={imageHash} label={'Image StorJ'} text={imageHash} />}
            </View>
          </TouchableHighlight>

          <TouchableHighlight onLongPress={() => this._copyIPFSHashToClipboard(metricsHash)} style={{ width: "97%" }} >
            <View>
              {metricsHash && <SwiperTextFieldWithLabelAndCopy key={metricsHash} label={'Metrics IPFS'} text={metricsHash} />}
            </View>
          </TouchableHighlight>

          <TouchableHighlight onLongPress={() => this._copyIPFSHashToClipboard(documentHash)} style={{ width: "97%" }}>
            <View>
              {documentHash && <SwiperTextFieldWithLabelAndCopy key={documentHash} label={'Document IPFS'} text={documentHash} />}
            </View>
          </TouchableHighlight>

          <TouchableHighlight onLongPress={() => this._copyIPFSHashToClipboard(ediTHash)} style={{ width: "97%" }}>
            <View>
              {ediTHash && <SwiperTextFieldWithLabel key={ediTHash} label={'EDI-T IPFS'} text={ediTHash} />}
            </View>
          </TouchableHighlight>
          <View>
            {price && <SwiperTextFieldWithLabelAndHercIcon key={price} label={'Price'} text={price} />}
          </View>
          <SwiperBigYellowButton buttonName={'View Factom Chain'} key={index} onPress={() => this._goToWebView(factomChain, factomEntry)} />
        </View>
      )
    }
  }

  onSwiped = (direction) => {
    console.log("this isthe direction of swipe ", direction)
  }

  updateCardIndex = () => {
    // currentCard = this.state.cards[index];
    this.setState({
      cardIndex: this.state.cardIndex + 1
    }, () => console.log("updated card index", this.state))
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
    this.updateCardIndex();
  };

  swipeRight = () => {
    this.updateCardIndex();
  };

  swipeDown = () => {
    this.updateCardIndex();
  };

  swipeUp = async () => {
    this.sharing(this.state.cards[this.state.cardIndex]);
    this.updateCardIndex();
  };

  handleButtonLeft = () => {
    if (this.state.swipedAllCards === false) {
      this.swiper.swipeLeft();
    }
  }

  handleButtonRight = () => {
    if (this.state.swipedAllCards === false) {
      this.swiper.swipeRight();
    }
  }

  handleButtonUp = () => {
    if (this.state.swipedAllCards === false) {
      this.swiper.swipeTop();
    }
  }

  render() {
    let cardIndex = this.state.cardIndex;
    return (
      <View style={swiperStyles.container}>
        {/* <SimpleAssetCard asset={this.props.SelectedAsset} /> */}
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwiped={() => console.log("swiped acknowledged")}
          onSwipedLeft={() => this.swipeLeft()}
          onSwipedRight={() => this.swipeRight()}
          onSwipedTop={() => this.swipeUp()}
          onSwipedBottom={() => this.swipeDown()}
          onTapCard={this.swipeUp}
          cards={this.state.cards}
          cardIndex={cardIndex}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={2}
          stackSeparation={15}
          overlayLabels={swiperOverlayLables}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        >
        </Swiper>
        <View style={{ justifyContent: "space-around", flexDirection: "row", width: "100%", height: "15%" }}>
          <View style={{ justifyContent: "center" }}>
            <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => this.handleButtonLeft()}>
              <FeatherIcons name="corner-up-left" size={30} />
            </TouchableHighlight>
          </View>
          <View style={{ justifyContent: "center" }}>
            <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => this.handleButtonUp()}>
              <FeatherIcons name="share-2" size={30} />
            </TouchableHighlight>
          </View>
          <View style={{ justifyContent: "center" }}>
            <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => this.handleButtonRight()}>
              <FeatherIcons name="corner-up-right" size={30} />
            </TouchableHighlight>
          </View>

        </View>
      </View>
    )
  }
}

mapStateToProps = (state) => ({
  SelectedAsset: state.AssetReducers.selectedAsset,
  transactions: state.AssetReducers.selectedAsset.transactions
})

export default connect(mapStateToProps)(ExampleSwiper);



export const swiperStyles = StyleSheet.create({
  container: {
    backgroundColor: ColorConstants.MainBlue,
    justifyContent: "flex-end",
    flexDirection: "column",
    flex: 1
  },

  card: {
    width: '98%',
    height: '80%',
    backgroundColor: ColorConstants.MainGray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",

    alignSelf: "flex-end",
    alignContent: "center",
    top: -2,
  },
  text: {
    color: '#F3c736',
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: 'transparent',
    height: 17,
  },
  image: {
    resizeMode: 'cover',
    height: 100,
    width: 100,
  },
  imgcontainer: {
    flex: 1,
    backgroundColor: "blue",

    justifyContent: "center",
    margin: 5
  },
  assetLocationLabel: {
    height: 30,
    width: 150,
    resizeMode: "contain",
    marginTop: 10,
    alignSelf: "center"
  },
  done: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent'
  },
  TransactionReview: {
    color: '#f3c736',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: "200",
    fontFamily: 'dinPro',
  },
  transDocField: {
    height: 45,
    width: '100%',
    justifyContent: "space-around",
    padding: 2,
    margin: 2,
    alignSelf: 'center',
    borderColor: '#F3c736',
  },
  TransactionReviewName: {
    fontFamily: 'dinPro',
    fontSize: 14,
    color: 'white',
    margin: 2,
    marginBottom: 5,
    textAlign: 'left'
  },
  TransactionReviewTime: {
    color: '#f3c736',
    fontSize: 14,
    fontFamily: 'dinPro',
    textAlign: 'center'
  },
  revPropVal: {
    fontFamily: 'dinPro',
    fontSize: 14,
    color: '#f3c736',
    margin: 2,
  },
  transPropField: {
    height: 20,
    width: 225,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    margin: 2,
    backgroundColor: "#021227",
    alignSelf: "center"
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 3,
    borderColor: '#F3c736',
    height: 17,
  }
})

export const swiperOverlayLables = {
  bottom: {
    title: 'SAVE',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  },
  left: {
    title: 'DISCARD',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: -30
      }
    }
  },
  right: {
    title: 'COMPLETE',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: 30
      }
    }
  },
  top: {
    title: 'TRANSFER',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  }
};
