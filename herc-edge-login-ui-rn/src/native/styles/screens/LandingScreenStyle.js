// @flow

import * as Constants from '../../../common/constants/'
import { scale } from '../../../common/util'
import * as Styles from '../'

const LandingScreenStyle = {
  container: Styles.ScreenStyle,
  backgroundImage: {
    ...Styles.BackgroundScreenImageStyle,
    alignItems: 'center'
  },
  inner: {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  featureBox: {
    position: 'relative',
    top: '2%',
    width: '100%',
    height: '97%',
    borderColor: 'blue',
    borderWidth: 3
  },
  logoHeader: Styles.LogoHeaderScaledStyle,
  featureBoxContent: {
    // height: scale(186), 306- 125 - remaining space.
    width: '100%',
    flexDirection: 'column',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: "yellow",
    borderWidth: 3
  },
  featureBoxDescription: {
    // height: scale(186), 306- 125 - remaining space.
    width: '100%',
    justifyContent: 'flex-end',
    // height: "10%"
  },
  featureBoxButtons: {
    // height: scale(186),
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  shim: {
    height: scale(28)
  },
  tagText: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    color: Constants.WHITE,
    backgroundColor: Constants.TRANSPARENT,
    fontFamily: Constants.FONTS.fontFamilyRegular,
    textAlign: 'center',
    fontSize: scale(14),
    lineHeight: scale(18)
  },
  createButton: {
    upStyle: Styles.TertiaryButtonUpStyle,
    upTextStyle: Styles.TertiaryButtonTextUpStyle,
    downTextStyle: Styles.TertiaryButtonTextDownStyle,
    downStyle: Styles.TertiaryButtonDownStyle
  },
  loginButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: {
      ...Styles.TextOnlyButtonTextUpStyle,
      fontSize: scale(14),
      color: Constants.WHITE
    },
    downTextStyle: {
      ...Styles.TextOnlyButtonTextDownStyle,
      fontSize: scale(14),
      color: Constants.WHITE
    },
    downStyle: Styles.TextOnlyButtonDownStyle
  }
}

export { LandingScreenStyle }
