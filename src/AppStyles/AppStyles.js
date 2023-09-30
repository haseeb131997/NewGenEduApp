
/*
 * * Â© Copyright 2017-2020 IBD Tecnologies Private Limited.
 * *                       3/506 Kannadhsan Street ,ShanmugaNagar,Porur
 * *                       Chennai - 600125.
 * *                       India
 * *
 * * This source is part of the General Framework and is copyrighted by
 * * IBD Technologies Private Limited.
 * *
 * * All rights reserved.  No part of this work may be reproduced, stored in a
 * * retrieval system, adopted or transmitted in any form or by any means,
 * * electronic, mechanical, photographic, graphic, optic recording or otherwise,
 * * translated in any language or computer language, without the prior written
 * * permission of IBD Technologies Private Limited.
 /**/
/**/
/**/

/* * * Change Tag:SHA001
 Change Desc: change dropdown style for iPad and Tablet
 Changed By : Shashank
 Date:14-12-2020 
 */


import { StyleSheet, Platform, Dimensions } from 'react-native';
import { UiColor } from '../theme';
import { h, w } from '../utils/Dimensions';
//import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const androidProjection = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.44,
  shadowRadius: 10.32,
  elevation: 16,
}

const iosPojection = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.20,
  shadowRadius: 1.41,
  elevation: 2,
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;


export default StyleSheet.create({
  projection:{
    shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: UiColor.APP_BACKGROUND,
  },
  flex_one: {
    flex: 1,
  },
  bold_500: {
    fontWeight: '500'
  },
  bold_600: {
    fontWeight: '600'
  },
  bold_400: {
    fontWeight: '400'
  },
  bold: {
    fontWeight: 'bold'
  },
  marginTop_1: {
    marginTop: h('1%')
  },
  marginTop_2: {
    marginTop: h('2%')
  },
  marginTop_3: {
    marginTop: h('3%')
  },
  marginTop_4: {
    marginTop: h('4%')
  },
  marginTop_5: {
    marginTop: h('5%')
  },
  margin: {
    margin: h('5%')
  },
  margin_1: {
    margin: h('1%')
  },
  margin_2: {
    margin: h('2%')
  },
  paddingBottom_2: {
    paddingBottom: h('2%')
  },
  marginLeft_1: {
    marginLeft: h('1%')
  },
  marginRight_1: {
    marginRight: h('1%')
  },
  marginRight_2: {
    marginRight: h('2%')
  },
  marginLeft_2: {
    marginLeft: h('2%')
  },
  marginLeft_3: {
    marginLeft: h('3%')
  },
  marginLeft_4: {
    marginLeft: h('4%')
  },
  marginVertical_5: {
    marginVertical: h('5%')
  },
  marginBottom_2: {
    marginBottom: h('2%')
  },
  marginBottom_3: {
    marginBottom: h('3%')
  },
  marginVertical_2: {
    marginVertical: h('2%')
  },
  marginVertical_1: {
    marginVertical: h('1%')
  },
  height100: {
    height: h('100%')
  },
  marginHorizontal_1:{
    marginHorizontal:h('1%')
  },
  marginHorizontal_2:{
    marginHorizontal:h('2%')
  },
  zIndex_1000:{
    zIndex:1000
  },
  zIndex_2000:{
    zIndex:2000
  },
  zIndex_3000:{
    zIndex:3000
  },
  zIndex_4000:{
    zIndex:4000
  },
  container: {
    flex: 1,
    margin: h('2%')
  },
  alignInRow: {
    flexDirection: "row", alignItems:'center'
  },
  alignInCenter: {
     justifyContent: 'center', alignItems: 'center'
  },
  alignItems: {
    alignItems: 'center',
  },
  alignSelf: {
    alignSelf: 'center'
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  space_around: {
    justifyContent: 'space-around'
  },
  row_space_between: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },

  commonButtonStyle:{
    backgroundColor: UiColor.SKYBLUE
  },
  //  dashbord css

  appLogo: {
    height: h('4%'), width: w('50%')
  },

  dashBoardFooter: {
    backgroundColor: UiColor.APP_BACKGROUND, justifyContent: 'center', alignItems: 'center', padding: h("2%")
  },
  minHeight: {
    minHeight: h('50%')
  },
  tableView: {
    borderWidth: h('.1%'),
    borderColor: '#ccc',
    paddingVertical: h('1%'),


  },
  tableTextContainer: {
    padding: h('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  tabletext: {
    color: '#88979E'
  },
  tabletextValue: {
    padding: 3.5,
    color: '#fff',
    borderRadius: 3
  },
  
  eventContainer: {
    borderLeftWidth: 3,
    borderLeftColor: '#E4E6EF',
    // borderLeftColor: GeneralUtils.functions._getRandomColor(),
    marginTop: h('2%'),
    paddingLeft: h('2%'),
  },
  attrNameStyle: {
    width: '65%', color: UiColor.LIGHT_TEXT_COLOR
  },
  attrValueStyle: {
    color: UiColor.SKYBLUE, width: '30%', marginLeft: '5%',
  },
  presentValueStyle: {
    color: UiColor.SUCCESS_COLOR, width: '30%', marginLeft: '5%',
  },
  leaveValueStyle: {
    color: UiColor.BLACK, width: '30%', marginLeft: '5%',
  },
  absentValueStyle: {
    color: UiColor.ERROR_COLOR, width: '30%', marginLeft: '5%', 
  },
  normalValueStyle: {
    color: UiColor.BLACK, width: '30%', marginLeft: '5%',
  },
  inputView: {
    width: '50%',
    height: h('5%'),
    backgroundColor: '#EEF3F7',
    borderRadius: 8,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textColor: {
    color: UiColor.LIGHT_TEXT_COLOR
  },

  refreshIcn: {
    height: h('5%'),
    width: w('5%'),
    tintColor: UiColor.DRAK_GRAY_COLOR
  },
  viewallContainer: {
    backgroundColor: UiColor.APP_BACKGROUND,
    padding: w('2%'),
    borderRadius: w('1%')
  },

  qeueCountContainer: {
    backgroundColor: UiColor.APP_BACKGROUND, padding: w('1%'), borderRadius: w('1%')
  },
  countStyle: {
    color: '#878BA1'
  },

  width85: {
    width: '85%'
  },
  width80: {
    width: '80%'
  },
  width70: {
    width: '70%'
  },
  width48: {
    width: '48%'
  },
  width52: {
    width: '52%'
  },

  calendarHeaderStyle: {
    position: 'absolute', top: -100
  },

  // Login Css
  loginMainContainer: {
    flex: 1,
    backgroundColor: UiColor.WHITE,
  },
  loginContainer: {
    backgroundColor: '#fff', borderTopLeftRadius: h('5%'), borderTopRightRadius: h('5%')
  },
  wellcomeImg: {
    height: h('10%'), width: w('20%')
  },
  policyContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#F39C46',
    //  borderTopColor:'white',
    borderRadius: 5,
    padding: h('2%'),
    backgroundColor: '#FEF9F4'

  },
  policyTextStyle: {
    textAlign: 'justify',
    color: UiColor.DRAK_GRAY_COLOR
  },
  policyTextLinkStyle: {
    color: UiColor.SKYBLUE,
    textDecorationLine: 'underline',
    // fontWeight: '600'
  },
  loginAppIcon: {
    height: h('10%'), width: w('20%')
  },
  aboutText: {
    color: UiColor.LIGHT_TEXT_COLOR
  },
  supportText: {
    color: UiColor.LIGHT_TEXT_COLOR, marginLeft: w('3%')
  },
  signInTextStyle: {
    fontWeight: '500'
  },
  btnTextStyle: {
    fontWeight: '500',
    color:UiColor.SKYBLUE
  },
  graybtnTextStyle: {
    fontWeight: '500',
    color:UiColor.DRAK_GRAY_COLOR
  },
  signInContainer: {
    minWidth: w('30%'), color: UiColor.SKYBLUE
  },
  errorBtnContainer: {
    minWidth: w('30%'), color: UiColor.ERROR_COLOR
  },
  btnContainer: {
    minWidth: w('40%'), color: UiColor.SKYBLUE
  },
  goToContainer: {
    minWidth: w('50%'), color: UiColor.SKYBLUE
  },
  payContainer: {
    minWidth: w('15%'), color: UiColor.SKYBLUE, height: h('6%')
  },
  signInToStyle: {
    color: UiColor.WHITE, fontWeight: 'bold', textAlign: 'center'
  },
  loginHeader: {
    padding: h('3%'), alignItems: 'center', height: h('27%')
  },

  //  splass css
  splashLogo: {
    height: h('50%'), width: w('80%')
  },
  illustrationImg: {
    height: h('50%'), width: w('100%')
  },
  splashMainContainer: {
    backgroundColor: UiColor.SKYBLUE, flex: 1
  },
  splashContainer: {
    flexDirection: 'column', justifyContent: 'space-between', flex: 1, alignItems: 'center'
  },
  // forgotPassword css
  forgotImgcontainer: {
    marginBottom: h('3%')
  },

  imgContainer: {
    position: 'absolute', bottom: 0
  },

  forgotIllustrationImg: {
    height: h('15%'), width: w('30%')
  },
  // header css

  appHeaderStyle: {
    backgroundColor: "#fff"
  },
  schoolLogo: {
    height: h('5%'), width: h('7%')
  },
  leftContainer: {
    justifyContent: 'center', height: h('5%')
  },
  avatarContainer: {
    width: w('3%')
  },
  iconSize: {
    height: h('3%')
  },
  moreIconSize: {
    height: h('2%')
  },
  drawerIconSize: {
    height: h('4%')
  },
  profileMenuContainer: {
    width: w('70%')
  },
  avatarSize: {
    height: h('7%')
  },
  inactiveMoreIcon: {
    // height: h('4%'), width: w('5%'),
    tintColor: UiColor.LIGHT_TEXT_COLOR
  },
  labelImgIcon: {
    height:h('4%'),width:w('6%')
  },
  activeMoreIcon: {
    // height: h('4%'), width: w('5%'),
    tintColor: UiColor.SKYBLUE
  },
  moreIcons: {
    height: h('4%'), width: w('5%'),
  }
  ,
  // change Institute css 
  checkboxContainer: {
    backgroundColor: UiColor.APP_BACKGROUND, borderRadius: w('1%')
  },

  // drawer css
  drawerHeader: {
    backgroundColor: UiColor.SKYBLUE, alignItems: 'center', paddingVertical: h('3%')
  },
  drawerTextwidth85: {
    width: '85%'
  },
  screenContainer: {
    flex: 1,
    backgroundColor: UiColor.WHITE,
  },
  subScreenContainer: {
    flex: 1,
    backgroundColor: UiColor.APP_BACKGROUND,
  },

  carouselWidth: {
    width: w('85%')
  },

  pagginationContainer: {
    position: 'absolute', right: 0,top:h('-7%'),width:w('1%')
  },
  pagginationDotes: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 1,
    backgroundColor: UiColor.DRAK_GRAY_COLOR
  },
  pagginationInactiveDotes: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 1,
    backgroundColor: UiColor.LIGHT_TEXT_COLOR
  },
  actionTextStyle: {
    color: UiColor.WHITE,
    fontWeight:"500"
  },
  actionContainerStyle: {
    backgroundColor: "#267FD7"
  },


  // css
  barChartWidth: {
    //width: w('100%'),
    width:screenWidth
  },
  barChartHeight: {
    height: h('40%'),
  },

  pieChartWidth: {
    width: w('100%'),
  },
  pieChartHeight: {
    height: h('20%'),
  },
  paddingHorizontal_1: {
    paddingHorizontal: h('1%'),
  },
  // student Dashboard css

  topHeader: {
    zIndex: 100
  },
  flex_start:{
    alignItems:'flex-start'
  },
  payBtnContainer: {
    backgroundColor: UiColor.LIGHT_SKYBLUE, paddingHorizontal: w('3%'), paddingVertical: h('1%'), borderRadius: 2
  },
  payTextStyle: {
    color: UiColor.SKYBLUE
  },
  paidStatusStyle: {
    color: UiColor.SUCCESS_COLOR,
    backgroundColor: UiColor.LIGHT_SUCCESS_COLOR,
    marginLeft: h('1%'),
    paddingHorizontal: w('1%')
  },
  notPaidStatusStyle: {
    color: UiColor.ERROR_COLOR,
    backgroundColor: UiColor.LIGHT_ERROR_COLOR,
    marginLeft: h('1%'),
    paddingHorizontal: w('1%')
  },
  primaryStatusStyle: {
    color: UiColor.SKYBLUE,
    backgroundColor: UiColor.LIGHT_SKYBLUE,
    // marginLeft: h('1%'),
    paddingHorizontal: w('1%')
  },

  successStatusStyle: {
    color: UiColor.SUCCESS_COLOR,
    backgroundColor: UiColor.LIGHT_SUCCESS_COLOR,
    marginLeft: h('1%'),
    paddingHorizontal: w('1%')
  },
  
  voiletStatusStyle: {
    color: UiColor.VOILET_COLOR,
    backgroundColor: UiColor.LIGHT_VOILET_COLOR,
    marginLeft: h('1%'),
    paddingHorizontal: w('1%')
  },
  errorStatusStyle: {
    color: UiColor.ERROR_COLOR,
    backgroundColor: UiColor.LIGHT_ERROR_COLOR,
    marginLeft: h('1%'),
    paddingHorizontal: w('1%')
  },
  warningStatusStyle: {
    color: UiColor.WARNING_COLOR,
    backgroundColor: UiColor.LIGHT_WARNING_COLOR,
    marginLeft: h('1%'),
    paddingHorizontal: w('1%')
  },
  appStatusStyle: {
    color: UiColor.SKYBLUE,
    backgroundColor: UiColor.LIGHT_SKYBLUE,
    marginLeft: h('1%'),
    paddingHorizontal: w('1%')
  },

  ActivityIndicatorStyle: {
    color: UiColor.DRAK_GRAY_COLOR
  },
  profileAvatarSize: {
    height: h('15%')
  },
  wellComeimageStyle:{
    height: h('20%'), width: w('50%')
  },
  filterContainer:{
    backgroundColor: UiColor.WHITE
  },
  
  filterTextHeading:{
    // color: UiColor.SKYBLUE,
    // textAlign:'center',
    fontWeight:'500'
  },

  dashContainer:{
    borderWidth:1,
    paddingVertical:h('1%'),
    paddingHorizontal:h('2%'),
    borderRadius:5,
    borderStyle:'dashed',
    borderColor:UiColor.LIGHT_DASH_LINE_COLOR
  },

  flex_End:{
    alignItems:'flex-end'
  },
  crossIcon: {
    height: h('4%'), width: w('7%'),
    tintColor: UiColor.LIGHT_TEXT_COLOR,
  },
  viewCrossIcon: {
    height: h('4%'), width: w('7%'),
    tintColor: UiColor.WHITE,
  },


  createIconStye:{
    height:h('5%'),width:h('5%')
  },

 
  viewModalContainer: {
    backgroundColor: UiColor.SKYBLUE,
    margin: h('3%'),
    padding: h('1%'),
    borderRadius:h('1%')
  },
  fieldErrorMsg:{
    marginLeft:h('1%'),
    color:UiColor.ERROR_COLOR
  },
  familyProfileAvatarSize:{
    height:h('6%')
  },

  listHeading:{
    width: '30%', color: UiColor.LIGHT_TEXT_COLOR
  },
  listValue:{
    width: '65%', color: UiColor.BLACK
  },

  myProfileTextStyle:{
    color:UiColor.SKYBLUE,fontWeight:"500"
  },

  succusImgColor:{
    tintColor:UiColor.SUCCESS_COLOR
  },
  primaryImgColor:{
    tintColor:UiColor.SKYBLUE
  },
  errorImgColor:{
    tintColor:UiColor.ERROR_COLOR
  },
  voiletImgColor:{
    tintColor:UiColor.VOILET_COLOR
  },
  appImgColor:{
    tintColor:UiColor.SKYBLUE
  },
  currentTextStyle:{
    alignSelf:'flex-end',color:UiColor.LIGHT_TEXT_COLOR
  },
  
  manualTextStyle:{
    color:UiColor.SKYBLUE,fontWeight:'500'
  },
  modalContainer: {
    backgroundColor: UiColor.WHITE,
    // margin: h('1.5%'),
    padding: h('.5%'),
    // maxHeight: height - h('5%'), 
  },
  textAlign_center: {
    textAlign: 'center',
  
  },

  selectStudentHeading:{
    backgroundColor: UiColor.LIGHT_SKYBLUE, paddingHorizontal: w('2%'), paddingVertical: h('1%'), borderRadius: w('1%') 
  },
  selectStudentTextStyle:{
    color: UiColor.SKYBLUE 
  },


  addIconStyle:{
    marginLeft:h('1%')
  },
  addIconSize:{
  height:h('2%')
  },


  // holidau

  workingdayContainer:{
    height:8,width:8,borderRadius:4,
    backgroundColor: UiColor.SUCCESS_COLOR
  },
  holidayContainer:{
    height:8,width:8,borderRadius:4,
    backgroundColor: UiColor.ERROR_COLOR
  },
  forenoonContainer:{
    height:8,width:8,borderRadius:4,
    backgroundColor: UiColor.WARNING_COLOR
  },
  afternoonContainer:{
    height:8,width:8,borderRadius:4,
    backgroundColor: UiColor.SKYBLUE
  },
  holidayMainContainer:{
    flexDirection:'row',alignItems:'center'
  },


  primaryTitleStyle:{
    color: UiColor.SKYBLUE
  },
  row_in_space_around:{
    flexDirection: 'row', justifyContent: 'space-around' 
  },

  dashedLine:{
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    marginTop:h('1%'),
    borderColor:UiColor.LIGHT_TEXT_COLOR
  },
  periodBox:{
     backgroundColor: UiColor.LIGHT_BLUE, height: h('7.5%'), borderRadius: h('1%'), alignItems: "center", justifyContent: 'center', paddingHorizontal: h('1%') 
    },
    tooltipIcn:{
      height:h('2%')
    },
    tooltipContainer:{
      backgroundColor:'#fff'
    },
    degfaulttooltipStyle:{ height:h('10%'),width:w('70%')},

    holidayInstructionStyle:{
      color: UiColor.LIGHT_TEXT_COLOR,textAlign:'center' 
    },
    infoIcon:{
      height:h('7%'),width:w('10%'),tintColor:UiColor.SKYBLUE
    },

    instituteLogo: {
      // starts NEAI-343
      // minHeight: h(20), minWidth: w(50)
      minHeight: h(10),
      minWidth: w(30),
      // ends NEAI-343
    },

    auditIconStyle:{
      height:h('5%'),
      width:w('6%'),
      tintColor:UiColor.LIGHT_TEXT_COLOR
    },
    editProfileImgContainer:{
      padding:h('2%'),
      backgroundColor:UiColor.LIGHT_SKYBLUE,
      borderWidth:1,
      borderColor:UiColor.SKYBLUE,
      borderRadius:h('1%')
    },
    editIconContainer:{
      position:'absolute',
      right:h('-1%'),
      top:h('-1%')
    },
    viewBottomLine:{
      borderBottomWidth:1,borderBottomColor:"#cccccc90"
    },
  

    pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  },
  
  docTextConationer:{
    width: w('50%'),flexDirection:'row',alignItems:'center'

  },
  requiredStyle: {
    fontWeight: '400',
    color: UiColor.ERROR_COLOR
  },
  materialTootip:{
    height:h('20%'),width:w('50%')
  },

  errorBatchStyle: {
    color: UiColor.ERROR_COLOR,
    backgroundColor: UiColor.LIGHT_ERROR_COLOR,
    marginLeft: h('1%'),
    paddingHorizontal: w('1%'),
    borderRadius:2
  },
  successBatchStyle: {
    color: UiColor.SUCCESS_COLOR,
    backgroundColor: UiColor.LIGHT_SUCCESS_COLOR,
    marginLeft: h('1%'),
    paddingHorizontal: w('1%'),
    borderRadius:2
  },
  dashContaierWidth:{
    width: '48%'
  },
  menuContainer: {
    // alignItems: 'flex-end'
    top:h('1%'),
    right:h('2%')
  
  },
  titleColor:{
    color: UiColor.SKYBLUE,
    fontWeight:'500'
  },
  menuIconStyle:{
    height:h('3%'),width:w('5%'),
    tintColor:UiColor.DRAK_GRAY_COLOR 
  },
  pdfStyle: {
    flex:1,
    width:Dimensions.get('window').width - w('6%'),
   height:Dimensions.get('window').height,
    //height:h('80%')
},

eyeIcon: {
  height:h('3%')
},
parentDashBoardDropDownStyle: {
  backgroundColor: UiColor.SKYBLUE,
  padding: h('.5%'),
  borderRadius: h('1%'),
},
  
  
  






  // list
  
  





});
