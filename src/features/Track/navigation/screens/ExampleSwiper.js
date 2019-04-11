import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View, Image, Dimensions, Share, TouchableHighlight, Clipboard, Alert } from 'react-native'
import AssetCard from '../../.././../components/AssetCard';
import { connect } from "react-redux";
import ColorConstants from '../../../../constants/ColorConstants';
import { widthPercentageToDP, heightPercentageToDP } from '../../../../assets/responsiveUI'
const hercpngIcon = require('../../../../assets/icons/hercIcon.png');
const { height, width } = Dimensions.get('window');

import { SwiperTextFieldWithLabel, SwiperBigYellowButton, SimpleAssetCard } from './components';
import { AlertAddAlert } from 'material-ui/svg-icons';
import { Icon } from 'native-base';
const swiperShareIcon = require("../../images/swiperShare.png");
import FeatherIcons from 'react-native-vector-icons/Feather';


// demo purposes only
// function * range (start, end) {
//   for (let i = start; i <= end; i++) {
//     yield i
//   }
// }

// const SwiperTextFieldWithLabel = (props) => {
//   return (
//     <View key={props.label} style={localStyles.textFieldContainer}>
//       <Text style={localStyles.labelText}>{props.label}</Text>
//       <Text style={localStyles.textField}>{props.text}</Text>
//     </View>
//   )

// }

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
    console.log('goto webview')
    this.props.navigation.navigate('FactomWebView', { data: { factomChain, factomEntry } });

    // let url;
    // if (data.factomChain){
    //   url = "https://explorer.factom.com/chains/" + factomChain + "/entries/" + factomEntry
    // }
    // return (
    //   <WebView
    //     source={{ uri: url }}
    //     style={{ margin: 0, padding: 0, flex: 1, width: '100%' }}
    //   />
    // )

  }

  makeMessage = (cardData) => {

    console.log(cardData, 'in makeing message')

    let data = cardData.data;

    let messageData = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        messageData.push(key + ': ' + "https://ipfs.io/ipfs/" + data[key] + ';' + "\n")
      }
    }

    console.log(messageData, 'new messageDAta!')

    let header = cardData.header
    // let location = header.tXLocation.toUpperCase() + " ";
    let time = header.dTime;
    let password = header.password;

    let title = header.name + " " + " Transaction @ " + time + ";" + "\n"


    let price = + header.price + "Herc" + ";\n";
    let sig = "Sent from Herc v.1.0"

    let message = title + messageData + "\n" + 'Password: ' + password + "\n" + 'Price: ' + price + "\n " + sig;


    return [title, message];
  }

  sharing = (data) => {
    console.log(data, 'shareDAta')
    let shareTitle = this.makeMessage(data);
    console.log(shareTitle, 'shareTitle');

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

  _copyIPFSHashToClipboard = (data) => {
    let ipfsDirectLink = "https://ipfs.io/ipfs/" + data;
    Clipboard.setString(ipfsDirectLink);
    this._alertCopied(ipfsDirectLink);
  }

  _copyFactomHashToClipboard = (chainID, entryID) => {
    let factomDirectLink = "https://explorer.factom.com/chains/" + chainID + "/entries/" + entryID;
    Clipboard.setString(factomDirectLink);
    this._alertCopied(factomDirectLink);
  }

  _copyNonHashToClipboard = (data) => {
    Clipboard.setString(data);
    this._alertCopied(data);
  }

  _alertCopied = (text) => {
    Alert.alert(
      'Copied', text
    );
  }


  renderCard = (card, index) => {

    console.log(card, index, 'card in rendercard')
    let unKey = this.props.SelectedAsset.key;
    let factomChain = this.props.SelectedAsset.hashes.chainId;
    let corePropsHash = this.props.SelectedAsset.hashes.ipfsHash;
    let factomEntry = card.header.factomEntry
    let data = card.data;
    let header = card.header;
    let metricsHash, ediTHash, documentHash, imageHash;

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

    return (
      <View key={unKey} style={swiperStyles.card}>
        {header.dTime && <SwiperTextFieldWithLabel key={'Created'} text={header.dTime} label={'Created'} />}

        <TouchableHighlight onLongPress={() => this._copyNonHashToClipboard(factomChain)} style={{ width: "97%" }}>
          <View>
            <SwiperTextFieldWithLabel key={factomChain} label={'Factom Chain'} text={factomChain} />
          </View>
        </TouchableHighlight>

        {/* line below is currently not applicable */}
        {/* {header.tXLocation && <SwiperTextFieldWithLabel key={'Classification'} text={header.tXLocation} label={'Classification'} />} */}


        <TouchableHighlight onLongPress={() => this._copyFactomHashToClipboard(factomChain, factomEntry)} style={{ width: "97%" }}>
          <SwiperTextFieldWithLabel key={factomEntry} text={factomEntry} label={'Factom Entry'} />
        </TouchableHighlight>

        <TouchableHighlight onLongPress={() => this._copyIPFSHashToClipboard(imageHash)} style={{ width: "97%" }} >
          <View>
            {corePropsHash && <SwiperTextFieldWithLabel key={corePropsHash} label={'Core Properties'} text={corePropsHash} />}
          </View>
        </TouchableHighlight>

        <TouchableHighlight onLongPress={() => this._copyIPFSHashToClipboard(imageHash)} style={{ width: "97%" }}>
          <View>
            {imageHash && <SwiperTextFieldWithLabel key={imageHash} label={'Image StorJ'} text={imageHash} />}
          </View>
        </TouchableHighlight>

        <TouchableHighlight onLongPress={() => this._copyIPFSHashToClipboard(metricsHash)} style={{ width: "97%" }} >
          <View>
            {metricsHash && <SwiperTextFieldWithLabel key={metricsHash} label={'Metrics IPFS'} text={metricsHash} />}
          </View>
        </TouchableHighlight>

        <TouchableHighlight onLongPress={() => this._copyIPFSHashToClipboard(documentHash)} style={{ width: "97%" }}>
          <View>
            {documentHash && <SwiperTextFieldWithLabel key={documentHash} label={'Document IPFS'} text={documentHash} />}
          </View>
        </TouchableHighlight>

        <TouchableHighlight onLongPress={() => this._copyIPFSHashToClipboard(ediTHash)} style={{ width: "97%" }}>
          <View>
            {ediTHash && <SwiperTextFieldWithLabel key={ediTHash} label={'EDI-T IPFS'} text={ediTHash} />}
          </View>
        </TouchableHighlight>

        {header.price && <SwiperTextFieldWithLabel key={header.price} label={'Price'} text={[header.price, <Image key={'imageIcon'} source={hercpngIcon} style={{ height: 40, width: 40, borderRadius: 20, resizeMode: 'contain' }} />]} />}

        <SwiperBigYellowButton buttonName={'View Factom Chain'} key={index} onPress={() => this._goToWebView(factomChain, factomEntry)} />
      </View>
    )
  }

  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  swipeDown = () => {
    this.swiper.swipeBottom()
  };

  swipeUp = () => {
    this.swiper.swipeTop()
  };

  swipeRight = () => {
    this.swiper.swipeRight()
  };

  render() {
    return (
      <View style={swiperStyles.container}>
        {/* <SimpleAssetCard asset={this.props.SelectedAsset} /> */}
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwiped={() => this.onSwiped('general')}
          onSwipedLeft={() => this.onSwiped('left')}
          onSwipedRight={() => this.onSwiped('right')}
          onSwipedTop={() => this.sharing(this.state.cards[this.state.cardIndex])}
          onSwipedBottom={() => this.onSwiped('bottom')}
          onTapCard={this.swipeLeft}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          // cardVerticalMargin={80}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={2}
          stackSeparation={15}
          overlayLabels={swiperOverlayLables}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        >
          {/* <SimpleAssetCard asset={this.props.SelectedAsset} /> */}

          {/* <Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' /> */}
        </Swiper>
        <View style={{ justifyContent: "space-around", flexDirection: "row", width: "100%", height: "15%" }}>

          <View style={{ justifyContent: "center" }}>
            <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => this.swipeLeft()}>
              <FeatherIcons name="corner-up-left" size={30} />
            </TouchableHighlight>
          </View>

          <View style={{ justifyContent: "center" }}>
            <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => this.swipeUp()}>
              <FeatherIcons name="share-2" size={30} />
            </TouchableHighlight>
          </View>

          <View style={{ justifyContent: "center" }}>
            <TouchableHighlight style={{ justifyContent: "center" }} onPress={() => this.swipeRight()}>
              {/* <Text tyle={{ borderColor: "yellow", borderWidth: 3 }}>Right</Text> */}
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
    // borderColor: "yellow",
    // borderWidth: 3,
    // height: '100%',
    // width: '100%',
    backgroundColor: ColorConstants.MainBlue,
    // alignItems: "center",
    justifyContent: "flex-end",
    // display: 'flex',
    flexDirection: "column",
    flex: 1
  },

  card: {
    // borderColor: "red",
    // borderWidth: 3,
    width: '98%',
    height: '80%',
    backgroundColor: ColorConstants.MainGray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    // alignItems: "center",
    justifyContent: "center",

    alignSelf: "flex-end",
    alignContent: "center",
    top: -2,
    // marginBottom: 10,
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