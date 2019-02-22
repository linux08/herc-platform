import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { connect } from "react-redux";
import  {AssetCard, HercTextFieldWithLabel, BigYellowButton,  CostDisplay } from '../../../../components/SharedComponents';

const hercpngIcon = require('../../../../assets/icons/hercIcon.png');
import { TouchableHighlight, Image, Share, Text, View } from 'react-native';
import { swiperStyles, swiperOverlayLables } from './styles';
// import swiperStyles from '../../../../assets/swiperStyles';
import { WebViewComponent } from "./components/WebViewComponent"

class TxSwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0
    }
    console.log('TxSwiperConstructor', props)
  }

  // _goToWebView = data => {
  //   this.props.navigation.navigate("WebViewComponent", { data: data });
  // }

  renderCard = ( card, index) => {

    console.log(card, 'card in rendercard')
    
    let factomChain = this.props.SelectedAsset.hashes.chainId;
    let corePropsHash = this.props.SelectedAsset.hashes.ipfsHash;
    let factomEntry = card.header.factomEntry
    let data = card.data;
    let header = card.header;
    let metricsHash, ediTHash, documentHash, imageHash;

    if (data.hasOwnProperty('ediT')) {
      ediTHash = card.data.ediT;
    }

    if (data.hasOwnProperty('documents')) {
      documentHash = card.data.documents;
    }

    if (data.hasOwnProperty('images')) {
      imageHash = card.data.images;
    }

    if (data.hasOwnProperty('metrics')) {
      metricsHash = card.data.metrics;
    }

    return (
      <View key={factomChain} style={swiperStyles.card}>
 
        <HercTextFieldWithLabel text={header.dTime} label={'Created'} />
        <HercTextFieldWithLabel text={header.tXLocation} label={'Classification'} />

        <HercTextFieldWithLabel text={this.props.SelectedAsset.hashes.factomChain} label={'Factom Chain'} />
        <HercTextFieldWithLabel text={header.factomEntry} label={'Factom Entry'} />

        {corePropsHash && <HercTextFieldWithLabel label={'Core Properties'} text={'corePropsHash'} />}
        {imageHash && <HercTextFieldWithLabel label={'Image StorJ'} text={imageHash} />}
        {metricsHash && <HercTextFieldWithLabel label={'Metrics IPFS'} text={metricsHash} />}
        {documentHash && <HercTextFieldWithLabel label={'Document IPFS'} text={documentHash} />}
        {ediTHash && <HercTextFieldWithLabel label={'EDI-T IPFS'} text={ediTHash} />} 
        {/* <HercTextFieldWithLabel label={'Price'} text={[header.price, <Image source={hercpngIcon} style={{ height: 20, width: 20, borderRadius: 20, resizeMode: 'contain' }} />]} /> */}

        {/* <BigYellowButton onPress={() => this._goToWebView({ factomChain: factomChain, factomEntry: factomEntry })} /> */}
      </View>
    )
  }
  

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
    let cards = Object.keys(this.props.transactions).map(x =>this.props.transactions[x]);
    return (
      <View swiperStyles={swiperStyles.baseContainer}>

      {/* <AssetCard asset={this.props.SelectedAsset} /> */}


        <Swiper
          backgroundColor={'#002740'}
          // marginBottom={}
          ref={swiper => {
            this.swiper = swiper
          }}
          keyExtractor={card => card.header.price}
          onSwiped={this.onSwiped}
          onTapCard={this.swipeLeft}
          cards={cards}
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

mapStateToProps = (state) => ({
  SelectedAsset: state.AssetReducers.selectedAsset,
  transactions: state.AssetReducers.selectedAsset.transactions
})

export default connect(mapStateToProps)(TxSwiper);