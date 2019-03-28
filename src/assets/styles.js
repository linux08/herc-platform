"use strict";
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  headerTitle: {
    fontFamily: "dinPro",
    display: "flex",
    height: 70,
    width: "100%",
    alignSelf: "center",
    alignContent: "center",
  },
  headerLogo: {
    resizeMode: "contain",
    height: 50,
    width: 200,
    alignSelf: "center",
    flex: 1,
    marginBottom: 15,
    marginTop: 10
  },
  headerText: {
    fontFamily: "dinPro",
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "bold",
    color: "black",
    textAlign: "center"
  },
  backArrow: {
    width: 35,
    height: 30,
    marginLeft: 5
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginRight: 25,
  },
  assetHeaderLogo: {
    height: 45,
    width: 45,
    borderRadius: 35 / 2,
    resizeMode: "contain",
  },
  assetHeaderTitle: {
    height: 50,
    width: 200,
    alignSelf: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginLeft: "16%",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },
  containerCenter: {
    width: "95%",
    height: "100%",
    backgroundColor: "#091141",
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  locationImage: {
    height: 50,
    width: 200,
    resizeMode: "contain",
    margin: 5,
    alignSelf: "center"
  },
  menuButton: {
    width: 200,
    height: 40,
    margin: 10,
    resizeMode: "contain",
    // borderRadius: 2,
  },
  menuItemField: {
    display: "flex",
    flexDirection: "row",
    width: 200,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 2,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
    paddingLeft: 3
  },
  menuItemField__textBox: {
    flex: 1
  },
  assetLogo: {
    height: 25,
    width: 25,
    marginLeft: "4%",
    borderRadius: 25 / 2,
  },
  assetLabel: {
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "normal",
    margin: 5,
    fontFamily: "dinPro"
  },

  TransactionReview: {
    alignSelf: "center",
    color: "red",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "dinPro",
    marginTop: 14
  },
  imagePreview: {
    height: 125,
    width: 125,
    margin: 5
  },
  thumb: {
    borderWidth: 3,
    borderColor: "yellow",
    height: 25,
    width: 25,
    margin: 5,
    resizeMode: "contain"
  },
  feeIconField: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#747893"
  },
  feeIcon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    backgroundColor: "#747893"
  },
  feeField: {
    flexDirection: "row",
    backgroundColor: "#464c70",
    height: 30,
    width: 200,
    paddingRight: 33,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
  scrollMenu: {
    height: 200,
    width: "85%",
    alignItems: "center",
    backgroundColor: "#021227",
    paddingTop: 5,
    paddingBottom: 5
  },
  scrollContent: {
    flex: 1,
    padding: 2,
    justifyContent: "space-around"
  },
  inputMenu: {
    width: "110%",
    height: 350,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#021227"
  },
  inputView: {
    height: 300,
    width: "95%",
    alignItems: "center"
  },
  smallMenu: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#021227"
  },
  menuInputTitle: {
    width: 300,
    height: 50,
    margin: 5
  },
  noTransLabel: {
    color: "white",
    width: 130,
    fontSize: 20.2,
    fontWeight: "600",
    paddingLeft: 5,
    fontFamily: "dinPro"
  },
  label: {
    color: "white",
    width: 120,
    fontSize: 20.2,
    fontWeight: "600",
    paddingLeft: 5,
    fontFamily: "dinPro"
  },
  transPropLabel: {
    color: "white",
    alignSelf: "center",
    fontWeight: "400",
    fontFamily: "dinPro",
    fontSize: 14
  },
  teeLabel: {
    height: 50,
    width: 300,
    resizeMode: "contain"
  },
  field: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    backgroundColor: "#021227",
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 5
  },
  picker: {
    height: 175,
    backgroundColor: "#021227",
    width: "80%",
    marginTop: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5
  },
  btnImg: {
    resizeMode: "cover"
  },
  assetMenu: {
    height: 300,
    width: "80%",
    backgroundColor: "#021227",
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },
  assetDeleteButton: {
    color: "#f3c736",
    fontWeight: "200",
    fontSize: 10,
    textAlign: "center",
    textAlignVertical: "center",
    height: 14,
    width: 50,
    backgroundColor: "#091141"
  },
  assetHeaderLabel: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "dinPro"
  },
  assetHeaderImage: {
    height: 100,
    width: 100,
    margin: 5,
    borderRadius: 50
  },
  assetFieldHeader: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: 3
  },
  assetMenuLabel: {
    textAlign: "center",
    color: "white",
    width: 300,
    fontSize: 20.2,
    fontWeight: "600",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#021227",
    margin: 10
  },
  assetLocation: {
    height: 30,
    width: 150,
    resizeMode: "contain",
    marginTop: 50,
    alignSelf: "center"
  },
  teePriteePrice: {
    backgroundColor: "#021227",
    textAlign: "center",
    fontSize: 20.2,
    fontWeight: "400",
    color: "white",
    height: 30
  },
  subHeader: {
    flexDirection: "row",
    width: "80%",
    height: 110,
    backgroundColor: "#021227",
    justifyContent: "space-between",
    padding: 5,
    margin: 5,
    marginTop: 10
  },
  picButton: {
    borderColor: "#F3C736",
    backgroundColor: "#021227",
    borderWidth: 0.5,
    height: 45,
    width: 200,
    margin: 5,
    color: "white",
    justifyContent: "flex-end",
    fontFamily: "dinPro",
    alignItems: "center",
    textAlignVertical: "center",
    alignSelf: "center"
  },
  scrollView: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
  }
});
