import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { HercTextFieldWithLabel, BigYellowButton, CostDisplay } from '../../../../components/SharedComponents';
import AssetCard from '../../.././../components/AssetCard';
import { connect } from "react-redux";
import ColorConstants from '../../../../constants/ColorConstants';
import { widthPercentageToDP, heightPercentageToDP } from '../../../../assets/responsiveUI'
const hercpngIcon = require('../../../../assets/icons/hercIcon.png');
import { WebViewComponent } from "./components/WebViewComponent"
const { height, width } = Dimensions.get('window');
// demo purposes only
// function * range (start, end) {
//   for (let i = start; i <= end; i++) {
//     yield i
//   }
// }

const SwiperTextFieldWithLabel = (props) => {
  return (
    <View key={props.label} style={localStyles.textFieldContainer}>
      <Text style={localStyles.labelText}>{props.label}</Text>
      <Text style={localStyles.textField}>{props.text}</Text>
    </View>
  )

}



class ExampleSwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: Object.keys(this.props.transactions).map(x => this.props.transactions[x]),
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0
    }
  }

  _goToWebView = (factomChain, factomEntry) => {

    console.log(factomChain, factomEntry, 'hashes');
  }



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
      <View key={index} style={swiperStyles.card}>
        <HercTextFieldWithLabel style={{ width: '90%' }} text={header.dTime} label={'Created'} />
        <View key={this.props.label} style={localStyles.textFieldContainer}>
          <Text style={localStyles.labelText}>Created</Text>
          <Text style={localStyles.textField}>{header.dTime}</Text>
        </View>

        <SwiperTextFieldWithLabel label={'Factom Chain'} text={factomChain} />

        <HercTextFieldWithLabel text={header.tXLocation} label={'Classification'} />

        <HercTextFieldWithLabel text={factomChain} label={'Factom Chain'} />
        <HercTextFieldWithLabel text={factomEntry} label={'Factom Entry'} />

        <HercTextFieldWithLabel label={'Core Properties'} text={corePropsHash} />
        {/* {imageHash && <HercTextFieldWithLabel label={'Image StorJ'} text={imageHash} />}
        {metricsHash && <HercTextFieldWithLabel label={'Metrics IPFS'} text={metricsHash} />}
        {documentHash && <HercTextFieldWithLabel label={'Document IPFS'} text={documentHash} />}
        {ediTHash && <HercTextFieldWithLabel label={'EDI-T IPFS'} text={ediTHash} />}  */}
        {/* <HercTextFieldWithLabel label={'Price'} text={[header.price, <Image source={hercpngIcon} style={{ height: 20, width: 20, borderRadius: 20, resizeMode: 'contain' }} />]} /> */}

        <BigYellowButton onPress={() => this._goToWebView(factomChain, factomEntry)} />
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

  render() {
    return (
      <View style={swiperStyles.container}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwiped={() => this.onSwiped('general')}
          onSwipedLeft={() => this.onSwiped('left')}
          onSwipedRight={() => this.onSwiped('right')}
          onSwipedTop={() => this.onSwiped('top')}
          onSwipedBottom={() => this.onSwiped('bottom')}
          onTapCard={this.swipeLeft}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={80}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={3}
          stackSeparation={15}
          overlayLabels={swiperOverlayLables}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        >
          <Button onPress={() => this.swiper.swipeBack()} title='Swipe Back' />
        </Swiper>
      </View>
    )
  }
}

mapStateToProps = (state) => ({
  SelectedAsset: state.AssetReducers.selectedAsset,
  transactions: state.AssetReducers.selectedAsset.transactions
})

export default connect(mapStateToProps)(ExampleSwiper);

const localStyles = StyleSheet.create({
  textField: {
    color: ColorConstants.MainBlue,
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
    // fontSize: 14,
    paddingLeft: 5,
    textAlign: 'left',
    fontSize: 14,
    borderRadius: 8,
    // height: heightPercentageToDP('4.95'),
    paddingBottom: 0
  },
  costFieldAmount: {
    color: ColorConstants.MainBlue,
    marginRight: 5,
    paddingLeft: 5,
    textAlign: 'left',
    fontSize: 20,
  },
  textFieldContainer: {
    flexDirection: 'column',
    width: '97%',
    height: heightPercentageToDP(((50 / height) * 100).toString()),
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: ColorConstants.ElementBG,
    margin: 5,
    paddingLeft: 5,
    borderRadius: 6,
    // height: heightPercentageToDP(((50 / height) * 100).toString()),
  },
  labeledTextInput: {
    color: ColorConstants.MainBlue,
    width: '100%',
    borderRadius: 8,
    backgroundColor: ColorConstants.ElementBG,
    margin: 0,
    fontSize: 17,

  },
  labelText: {
    fontSize: 11,
    color: ColorConstants.MainSubGray,
    marginLeft: 3,
    fontWeight: 'normal',
  },

  PasswordInputContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: ColorConstants.MainGray,
    borderRadius: 6,
    margin: 0,
    // paddingRight: 10

  },
  passwordTextInput: {
    borderRadius: 0,
    backgroundColor: ColorConstants.ElementBG,
    margin: 0,
    flex: 1,
    fontSize: 17,
    alignSelf: 'center'
  },

  costDisplay: {
    height: heightPercentageToDP(((40 / height) * 100).toString()),
    width: widthPercentageToDP('90'),
    backgroundColor: ColorConstants.MainBlue,
    borderRadius: 8,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    alignSelf: 'center'
    // marginTop: heightPercentageToDP('20')
  },
  eyeballContainer: {
    justifyContent: 'center',
    backgroundColor: ColorConstants.ElementBG,
    paddingBottom: 10
    // height: heightPercentageToDP('6'),
  },

  eyeBallButton: {
    backgroundColor: ColorConstants.ElementBG,
    marginRight: -1,
    // marginLeft: 10
    borderRadius: 0
  },


  textInputContainer: {
    // flex: 0,
    width: widthPercentageToDP('90'),
    height: heightPercentageToDP('6'),
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: ColorConstants.ElementBG,
    margin: 5,
    paddingLeft: 5,
    borderRadius: 8
  },


  buttonLabel: {
    fontSize: 12,
    color: ColorConstants.MainSubGray,
    margin: 5,
    // marginLeft: '15%',
    alignSelf: 'center'

  },

  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'

  },
  registerButton: {
    height: heightPercentageToDP(((40 / height) * 100).toString()),
    width: widthPercentageToDP('90'),
    backgroundColor: ColorConstants.MainGold,
    borderRadius: 8,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    alignSelf: 'center'
    // marginTop: heightPercentageToDP('20')
  },

  // width: (width * .9),
  // height: (height * .056),


})

export const swiperStyles = StyleSheet.create({
  container: {

    height: '100%',
    width: '100%',
    backgroundColor: ColorConstants.MainBlue,
    alignItems: "center",
    justifyContent: "flex-start",
    display: 'flex'
  },

  card: {
    width: '98%',
    height: '85%',
    backgroundColor: ColorConstants.MainGray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "flex-start",

    alignSelf: 'center',
    alignContent: "center",
    top: -2,
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