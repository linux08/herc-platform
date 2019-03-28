import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { Image, StyleSheet, TouchableHighlight, Share, Text, View } from 'react-native';
import Button from 'react-native-button';
import originator from "./buttons/originatorButton.png";// todo: turn into vector
import recipient from "./buttons/recipientButton.png"; // todo: turn into vector
import { WebViewComponent } from "../components/WebViewComponent"
import { StackNavigator } from 'react-navigation';

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
    this.props.navigation.navigate("WebViewComponent", {data: data});
  }

  renderCard = card => {
    let hashes = this.state.hashes
    let factomChain = hashes.chainId;
    let corePropsHash = hashes.ipfsHash;
    let factomEntry = card.header.factomEntry
    let data = card.data;
    let header = card.header;
    let metricsHash, ediTHash, documentHash, imageHash;

    if(data.hasOwnProperty('ediT')) {
      ediTHash = data.ediT;
    }

    if(data.hasOwnProperty('documents')) {
      documentHash = data.documents;
    }

    if (data.hasOwnProperty('images')) {
      imageHash = data.images;
    }

    if (data.hasOwnProperty('properties')) {
      metricsHash = data.properties;
    }

    return (
      <View key={card.key} style={styles.card}>
        <Text style={styles.revPropVal}>{header.hercId}</Text>
        <Text style={styles.TransactionReviewName}>{header.dTime}</Text>
        <Text style={styles.TransactionReviewName}>{header.tXLocation}</Text>
        <View style={{margin: 10}}>
          <Text style={styles.text}>Factom Chain:{factomChain}</Text>
          <Text style={styles.text}>Factom Entry:{factomEntry}</Text>

          <TouchableHighlight style={{ width: 300, justifyContent: "center", height: 50, paddingBottom:10, paddingTop:10, marginTop:10, marginBottom:10}} onPress={() => this._goToWebView({factomChain:factomChain, factomEntry:factomEntry}) }>
            <Text style={{fontSize:20, backgroundColor: 'white', textAlign: 'center'}}>View Factom Entry</Text>
          </TouchableHighlight>

          {corePropsHash && <Text style={styles.text}>Core Properties:{corePropsHash}</Text>}
          {imageHash && <Text style={styles.text}>Image StorJ:{imageHash}</Text>}
          {metricsHash && <Text style={styles.text}>Metrics IPFS: {metricsHash}</Text>}
          {documentHash && <Text style={styles.text}>Document IPFS:{documentHash}</Text>}
          {ediTHash && <Text style={styles.text}>EDI-T IPFS:{ediTHash}</Text>}
          <Text style={styles.text}>Price: {header.price}</Text>
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
        overlayLabels={{
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
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
      >
        <Button onPress={this.swipeLeft} title='Swipe Left' />
      </Swiper>
    )
  }
}
const styles = StyleSheet.create({
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
