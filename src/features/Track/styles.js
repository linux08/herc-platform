import { StyleSheet } from 'react-native';

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
