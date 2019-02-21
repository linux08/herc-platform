import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { Image, swiperStylesheet, TouchableHighlight, Share, Text, View } from 'react-native';
import Button from 'react-native-button';
import { swiperswiperStyles, swiperOverlayLables } from '../../swiperStyles';
// import swiperStyles from '../../../../assets/swiperStyles';
import { WebViewComponent } from "../components/WebViewComponent"

export default class TxSwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: this.props.cards,
      hashes: this.props.hashes,
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0
    }
  }

  _goToWebView = data => {
    this.props.navigation.navigate("WebViewComponent", { data: data });
  }

  renderCard = card => {
    let hashes = this.state.hashes
    let factomChain = hashes.chainId;
    let corePropsHash = hashes.ipfsHash;
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

    if (data.hasOwnProperty('properties')) {
      metricsHash = data.properties;
    }

    return (
      <View key={card.key} style={swiperStyles.card}>
        <Text style={swiperStyles.revPropVal}>{header.hercId}</Text>
        <Text style={swiperStyles.TransactionReviewName}>{header.dTime}</Text>
        <Text style={swiperStyles.TransactionReviewName}>{header.tXLocation}</Text>
        <View style={{ margin: 10 }}>
          <Text style={swiperStyles.text}>Factom Chain:{factomChain}</Text>
          <Text style={swiperStyles.text}>Factom Entry:{factomEntry}</Text>

          <TouchableHighlight style={{ width: 300, justifyContent: "center", height: 50, paddingBottom: 10, paddingTop: 10, marginTop: 10, marginBottom: 10 }} onPress={() => this._goToWebView({ factomChain: factomChain, factomEntry: factomEntry })}>
            <Text style={{ fontSize: 20, backgroundColor: 'white', textAlign: 'center' }}>View Factom Entry</Text>
          </TouchableHighlight>

          {corePropsHash && <Text style={swiperStyles.text}>Core Properties:{corePropsHash}</Text>}
          {imageHash && <Text style={swiperStyles.text}>Image StorJ:{imageHash}</Text>}
          {metricsHash && <Text style={swiperStyles.text}>Metrics IPFS: {metricsHash}</Text>}
          {documentHash && <Text style={swiperStyles.text}>Document IPFS:{documentHash}</Text>}
          {ediTHash && <Text style={swiperStyles.text}>EDI-T IPFS:{ediTHash}</Text>}
          <Text style={swiperStyles.text}>Price: {header.price}</Text>
        </View>
      </View>
    )
  };

  onSwipedAllCards = () => {
    console.log('Swiped all cards');
    this.setState({
      swipedAllCards: true,
      cardIndex: 0 // NOTE: wat does this do
    })
  };

  onSwiped = (index) => {
    currentCard = index;
    console.log("index", index, "and currentCard", currentCard)
  }

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false)
        })
      })
    }
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack: isSwipingBack
      },
      cb
    )
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  swipeTop = (index) => {
    this.sharing(this.state.cards[index]);
    // this.makeMessage(this.state.cards[currentCard].data);
  }

  swipeBottom = () => {
    console.log('Swiping Down/Bottom');
    // const {navigate} = this.props.navigate
    // navigate('HiprLanding');
  }

  makeMessage = (cardData) => {
    let header = cardData.header
    let data = cardData.data
    let time = header.dTime;
    let location = header.tXLocation.toUpperCase() + " ";
    let properties = data.properties ? Object.keys(data.properties).length + " Properties;\n" : "";
    let images = data.images ? data.images.length + " Image(s);\n" : "";
    let documents = data.documents ? data.documents.length + " Document(s);\n" : "";
    let price = "Hercs: " + header.price + ";\n";
    let sig = "Sent from Herc v.1.0"
    let edit = "";
    let password = header.password ? header.password : "No password";
    if (data.ediT) {
      edit = "EDI-T Value: " + data.ediT.value;

    }
    let title = header.name + " " + location + " Transaction @ " + time + ";";
    let message = title + "\n" +
      properties + edit + images + documents + price + password + " " + sig;
    console.log(title, "title", message, "message")
    return [title, message];
  }


  sharing = (data) => {
    let shareTitle = this.makeMessage(data);
    Share.share({
      message: shareTitle[1],
      title: shareTitle[0]
    },
      {// Android only:
        dialogTitle: shareTitle[0],
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      })
  }

  render() {
    return (
      <View swiperStyles={swiperStyles.baseContainer}>

        <Swiper
          backgroundColor={'#002740'}
          // marginBottom={}
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwiped={this.onSwiped}
          onTapCard={this.swipeLeft}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={10}
          infinite={true}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          onSwipedTop={this.swipeTop}
          onSwipedLeft={this.swipeLeft}
          onSwipedBottom={this.swipeBottom}
          stackSize={3}
          cardHorizontalMargin={5}
          stackSeparation={15}
          overlayLabels={swiperOverlayLables}
          animateOverlayLabelsOpacity
          animateCardOpacity
        >
        </Swiper>
      </View>
    )
  }
}
