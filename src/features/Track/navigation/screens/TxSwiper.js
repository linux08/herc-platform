import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { connect } from "react-redux";
import { AssetCard, HercTextFieldWithLabel, BigYellowButton, CostDisplay } from '../../../../components/SharedComponents';
import ColorConstants from '../../../../constants/ColorConstants';


const hercpngIcon = require('../../../../assets/icons/hercIcon.png');
import { TouchableHighlight, Image, Share, Text, View, Button, StyleSheet } from 'react-native';
// import { swiperStyles, swiperOverlayLables } from './styles';
// import swiperStyles from '../../../../assets/swiperStyles';
// import { WebViewComponent } from "./components/WebViewComponent"

// function * range (start, end) {
//   for (let i = start; i <= end; i++) {
//     yield i
//   }
// }

class TxSwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: Object.keys(this.props.transactions).map(x => this.props.transactions[x]),
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0,
    }
    console.log('TxSwiperConstructor', props)
  }



  // _goToWebView = data => {
  //   this.props.navigation.navigate("WebViewComponent", { data: data });
  // }

  renderCard = (card, index) => {

    console.log(card, 'card in rendercard')

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
      <View key={data.price} style={swiperStyles.card}>
        <HercTextFieldWithLabel text={header.dTime} label={'Created'} />

        <HercTextFieldWithLabel text={header.tXLocation} label={'Classification'} />

        <HercTextFieldWithLabel text={this.props.SelectedAsset.hashes.factomChain} label={'Factom Chain'} />
        <HercTextFieldWithLabel text={header.factomEntry} label={'Factom Entry'} />

        {corePropsHash && <HercTextFieldWithLabel label={'Core Properties'} text={'corePropsHash'} />}
        {imageHash && <HercTextFieldWithLabel label={'Image StorJ'} text={imageHash} />}
        {metricsHash && <HercTextFieldWithLabel label={'Metrics IPFS'} text={metricsHash} />}
        {documentHash && <HercTextFieldWithLabel label={'Document IPFS'} text={documentHash} />}
        {ediTHash && <HercTextFieldWithLabel label={'EDI-T IPFS'} text={ediTHash} />}
        <HercTextFieldWithLabel label={'Price'} text={[header.price, <Image source={hercpngIcon} style={{ height: 20, width: 20, borderRadius: 20, resizeMode: 'contain' }} />]} />

        {/* <BigYellowButton onPress={() => this._goToWebView({ factomChain: factomChain, factomEntry: factomEntry })} /> */}
      </View>
    )
  }

  // renderCard = (card, index) => {
  //   return (
  //     <View style={swiperStyles.card}>
  //       <Text style={swiperStyles.text}>{card} - {index}</Text>
  //     </View>
  //   )
  // };


  onSwipedAllCards = () => {
    console.log('Swiped all cards');
    this.setState({
      swipedAllCards: true,
      cardIndex: 0
    })
  };

  onSwiped = (index) => {
    currentCard = this.state.cards[index];
    console.log("index", index, "and currentCard", currentCard)
    this.setState({
      cardIndex: this.state.cardIndex + 1
    })
  }

  onTap = (index) => {
    console.log(index, 'ontap')
  }

  swipeTop = (index) => {
    this.sharing(this.state.cards[index]);
    this.makeMessage(this.state.cards[currentCard].data);
  }

  swipeBottom = () => {
    console.log('Swiping Down/Bottom');
    // const {navigate} = this.props.navigate
    // navigate('HiprLanding');
  }

  // makeMessage = (cardData) => {
  //   let header = cardData.header
  //   let data = cardData.data
  //   let time = header.dTime;
  //   let location = header.tXLocation.toUpperCase() + " ";
  //   let properties = data.properties ? Object.keys(data.properties).length + " Properties;\n" : "";
  //   let images = data.images ? data.images.length + " Image(s);\n" : "";
  //   let documents = data.documents ? data.documents.length + " Document(s);\n" : "";
  //   let price = "Hercs: " + header.price + ";\n";
  //   let sig = "Sent from Herc v.1.0"
  //   let edit = "";
  //   let password = header.password ? header.password : "No password";
  //   if (data.ediT) {
  //     edit = "EDI-T Value: " + data.ediT.value;

  //   }
  //   let title = header.name + " " + location + " Transaction @ " + time + ";";
  //   let message = title + "\n" +
  //     properties + edit + images + documents + price + password + " " + sig;
  //   console.log(title, "title", message, "message")
  //   return [title, message];
  // }


  // sharing = (data) => {
  //   let shareTitle = this.makeMessage(data);
  //   Share.share({
  //     message: shareTitle[1],
  //     title: shareTitle[0]
  //   },
  //     {// Android only:
  //       dialogTitle: shareTitle[0],
  //       // iOS only:
  //       excludedActivityTypes: [
  //         'com.apple.UIKit.activity.PostToTwitter'
  //       ]
  //     })
  // }

  render() {
    let cardIndex = this.state.cardIndex;
    // let cards = Object.keys(this.props.transactions).map(x => this.props.transactions[x]);
    return (
      <View swiperStyles={swiperStyles.baseContainer}>

        {/* <AssetCard asset={this.props.SelectedAsset} /> */}



        <Swiper
          backgroundColor={ColorConstants.MainSubCrownBlue}
          // marginBottom={}
          ref={swiper => {
            this.swiper = swiper
          }}

          keyExtractor={card => card.header.price}
          
          renderCard={(card) => this.renderCard(card)}
          
          cards={this.state.cards}
          cardIndex={cardIndex}
         
          onSwiped={() => this.onSwiped(cardIndex)}
          onTapCard={() => this.onTap(cardIndex)}
          onSwipedAll={() => this.onSwipedAllCards()}
          onSwipedTop={() => this.swipeTop(cardIndex)}
          onSwipedLeft={() => this.swipeLeft}
          onSwipedBottom={() => this.swipeBottom}
          cardVerticalMargin={10}
          infinite={true}
          stackSize={3}
          cardHorizontalMargin={5}
          stackSeparation={15}
          overlayLabels={swiperOverlayLables}
          animateOverlayLabelsOpacity
          animateCardOpacity
        >

          {/* <Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' /> */}
        </Swiper>
      </View>
    )
  }
}

mapStateToProps = (state) => ({
  SelectedAsset: state.AssetReducers.selectedAsset,
  transactions: state.AssetReducers.selectedAsset.transactions
})

export default connect(mapStateToProps)(TxSwiper);

export const swiperStyles = StyleSheet.create({
  container: {
    width: '95%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    height: '80%',
    width: '90%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#F3c736',
    justifyContent: "flex-start",
    backgroundColor: '#091141',
    alignSelf: 'center',
    alignContent: "center",
    top: -2,
    alignItems: 'center',
    marginBottom: 10,
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
