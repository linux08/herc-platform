import { Button, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import ColorConstants from '../../../../../constants/ColorConstants';
import { widthPercentageToDP, heightPercentageToDP } from '../../../../../assets/responsiveUI'
const { height, width } = Dimensions.get('window');

export const assetCardStyles = StyleSheet.create({

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