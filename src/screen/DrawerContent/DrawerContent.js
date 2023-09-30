
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




import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";
import { w, h, STATUS_BAR_HEIGHT } from "../../utils/Dimensions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpUtils } from '../../utils/HttpUtils';
// import DrawerListUtils from "../../utils/DrawerListUtils";
import GeneralUtils from "../../utils/GeneralUtils";
import AppStyles from "../../AppStyles/AppStyles";
import { UiColor } from '../../theme';
import { Subheading, Card } from "react-native-paper";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import DrawerListUtils from "../../utils/DrawerListUtils";
import { ScrollView } from "react-native-gesture-handler";



// var drawerList = []

class DrawerContent extends Component {
  _menu = null;
  constructor(props) {
    super(props);
    this.state = {
      layout_Height: 0,
      status: false,
      display: false,
      classtatus: false,
      teacherstatus: false,
      studentstatus: false,
      userstatus: false,
      reportstatus: false,
      selectedIndex: null,
      selectedsubIndex: null,
      selectedChildSubIndex: null,
      globalData: {},
      // error_code: "",
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      isLoading: false,
      // drawerList:[]
    };
    // _menu = null;
    this.parentStateChange = this.parentStateChange.bind(this)
  }


  // async UNSAFE_componentWillMount() {
  //   var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
  //   if (globalData != null) {
  //     this.setState({
  //       globalData: globalData
  //     })
  //     drawerList = this.getDrawerList(globalData.userType)
  //   }
  //   // drawerList = this.getDrawerList('A')
  // }

  async componentDidMount() {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    if (globalData != null) {
      this.setState({
        globalData: globalData,
        // drawerList : this.getDrawerList(globalData.userType)
      })
      // drawerList = this.getDrawerList(globalData.userType)
    }
  }




  // async UNSAFE_componentWillReceiveProps(nextProps) {
  //   var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
  //   if (globalData.instituteName != this.state.globalData.instituteName) {
  //     this.setState({
  //       globalData: globalData
  //     })
  //   }

  // }


  // starts
  // getDrawerList = (userType) => {
  //   switch (userType) {
  //     case 'A':
  //       return DrawerListUtils.functions.AdminDraweList
  //       break
  //     case 'O':
  //       return DrawerListUtils.functions.StaffDraweList
  //       break
  //     case 'T':
  //       return DrawerListUtils.functions.TeacherDraweList
  //       break
  //     case 'S':
  //       return DrawerListUtils.functions.ParentDraweList
  //       break
  //     case 'P':
  //       return DrawerListUtils.functions.ParentDraweList
  //       break
  //   }
  // }
  // ends 


  // setMenuRef = ref => {
  //   this._menu = ref;
  // };


  // hideMenu = async (item) => {
  //   //console.log(item)
  //   this._menu.hide();
  //   var userType = ''
  //   var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
  //   if (globalData != null) {
  //     userType = globalData.userType
  //   }


  //   switch (item) {
  //     case 'SignOut':
  //       GeneralUtils.functions.logOutBtn()
  //       // Actions.reset('Login');
  //       // Actions.Login()
  //       break
  //     case 'Profile':
  //       switch (userType) {
  //         case 'S':
  //           Actions.StudentProfileDetail();
  //           break
  //         case 'P':
  //           Actions.UserProfileDetail();
  //           break
  //         case 'A':
  //           Actions.TeacherProfileDetail();
  //           break
  //         case 'T':
  //           Actions.TeacherProfileDetail();
  //           break
  //         case 'O':
  //           Actions.TeacherProfileDetail();
  //           break
  //       }
  //       break
  //     case 'Password':
  //       Actions.ChangePassword();
  //       break
  //     case 'Institute':
  //       Actions.ChangeInstitute();
  //       break
  //   }

  // };


  // showMenu = () => {
  //   this._menu.show();
  // };


  selectData(index) {
    if (this.state.selectedIndex == null) {
      this.setState({
        selectedIndex: index,
        selectedsubIndex: null
      })
    }
    else {
      if (this.state.selectedIndex == index) {
        this.setState({
          selectedIndex: null,
          selectedsubIndex: null
        })
      }
      else if (this.state.selectedIndex != null) {
        this.setState({
          selectedIndex: index,
          selectedsubIndex: null
        })
      }
      else {
        this.setState({
          selectedIndex: null,
          selectedsubIndex: null
        })
      }

    }
  }

  selectSubCatData(index) {
    if (this.state.selectedsubIndex == null) {
      this.setState({
        selectedsubIndex: index
      })
    }
    else {
      if (this.state.selectedsubIndex == index) {
        this.setState({
          selectedsubIndex: null
        })
      }
      else if (this.state.selectedsubIndex != null) {
        this.setState({
          selectedsubIndex: index
        })
      }
      else {
        this.setState({
          selectedsubIndex: null
        })
      }

    }
  }

  // starts NEAI2-198
  async selectSubCat(subCatName, parentindex, subIndex, childSubIndex) {

    GeneralUtils.functions.drawerStatObject = this

    this.setState({
      selectedsubIndex: subIndex,
      selectedChildSubIndex: childSubIndex,
    })

    var userType = ''
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    if (globalData != null) {
      userType = globalData.userType
    }
    switch (userType) {
      case 'A':
        return DrawerListUtils.functions.AdminSelected(subCatName, parentindex, childSubIndex, this)
        break
      case 'O':
        return DrawerListUtils.functions.StaffSelected(subCatName, parentindex, childSubIndex, this)
        break
      case 'T':
        return DrawerListUtils.functions.TeacherSelected(subCatName, parentindex, childSubIndex, this)
        break
      case 'S':
        return DrawerListUtils.functions.ParentSelected(subCatName, parentindex, childSubIndex, this)
        break
      case 'P':
        return DrawerListUtils.functions.ParentSelected(subCatName, parentindex, childSubIndex, this)
        break
    }

    // Actions.drawerClose()
  }
  // ends NEAI2-198










  async onClickDashboard() {
    // const { globalData } = this.state
    var userType = ''
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    if (globalData != null) {
      userType = globalData.userType
    }
    this.setState({
      selectedIndex : null
    },()=>{
      GeneralUtils.functions.goToDashboardScreen(userType,this)
    })

  }


  // start NEAI-174




  getImagePath() {
    const { globalData, isLoading } = this.state

    if (typeof globalData.profileImagePath == 'string' && globalData.profileImagePath.includes('CohesiveUpload')) {
      return { uri: `${httpUtils.FILE_URL()}${globalData.profileImagePath}?ivas=${globalData.token1}&nekot=${globalData.userID}~${globalData.instituteID}&uhtuliak=${globalData.token0}` }
    }
    else if (typeof globalData.profileImagePath == 'string' && globalData.profileImagePath.includes('objectstorage')) {
      return { uri: globalData.profileImagePath }
    }
    else {
      return httpUtils.DEFAULT_IMAGE_FILE_PATH()
    }

  }
  // ends NEAI2-249


  parentStateChange(object) {
    this.setState(
      object
    );
  }


  // end SHA01


  // starts NEAI2-198
  // notRequireSubCatMenu(index) {
  //   const { selectedIndex, globalData } = this.state
  //   if ((globalData.userType == 'A') && (index == 6 || index == 9)) {
  //     return true
  //   }
  //   else if (globalData.userType == 'T' && (index == 6 || index == 7 || index == 9)) {
  //     return true
  //   }
  //   else if (globalData.userType == 'O' && (index == 1 || index == 3 || index == 5 || index == 10)) {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // }
  // ends NEAI2-198



  renderMenuItem = (data, index) => {
    const { selectedIndex } = this.state
    return (
      <View key={index.toString()}  >
        <TouchableOpacity onPress={() => this.selectData(index)} style={[AppStyles.row_space_between, AppStyles.alignItems, AppStyles.marginTop_1]}>
          <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems, AppStyles.drawerTextwidth85]}>
            <Image
              resizeMode="contain"
              source={data.icon}
              style={AppStyles.menuIconStyle}
            />

            <Subheading style={[AppStyles.marginLeft_1, { color: selectedIndex != index ? UiColor.DRAK_GRAY_COLOR : UiColor.SKYBLUE }, AppStyles.bold_500]}>{data.name}</Subheading>
          </View>
          <MaterialIcons
            name={selectedIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
        </TouchableOpacity>
        {selectedIndex == index && data.subCat.map((item, i) => {
          return this.rendersubCategory(item, i, index)

        }
        )}
      </View>
    );
  }

  getsubCatStyle(index) {
    const { selectedsubIndex } = this.state
    return { color: selectedsubIndex != index ? UiColor.DRAK_GRAY_COLOR : UiColor.SKYBLUE }
  }

  getsubChildeCatStyle(index) {
    const { selectedChildSubIndex } = this.state
    return { color: selectedChildSubIndex != index ? UiColor.DRAK_GRAY_COLOR : UiColor.SKYBLUE }
  }


  rendersubCategory = (item, index, parentindex) => {
    const { selectedsubIndex } = this.state
    return (
      <View key={index.toString()}  >
        <TouchableOpacity onPress={() => { item.subCat == undefined ? this.selectSubCat(item.subCatName, parentindex, index, null) : this.selectSubCatData(index) }} style={[AppStyles.row_space_between, AppStyles.alignItems, AppStyles.marginTop_1]}>
          <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems, AppStyles.drawerTextwidth85]}>
            <Entypo
              name="dot-single" size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
            <Subheading style={[AppStyles.marginLeft_1, AppStyles.bold_500, this.getsubCatStyle(index)]}>{item.subCatName}</Subheading>
          </View>
          {item.subCat != undefined && <MaterialIcons
            name={selectedsubIndex != index ? "navigate-next" : "keyboard-arrow-down"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />}
        </TouchableOpacity>


        {selectedsubIndex == index && item.subCat != undefined && item.subCat.map((data, i) => {
          return this.renderseconLevelsubCategory(data, i, item.subCatName, parentindex, index)
        }
        )}
      </View>
    )
  }


  renderseconLevelsubCategory = (item, index, subCatName, parentindex, subIndex) => {
    return (
      <TouchableOpacity onPress={() => this.selectSubCat(subCatName, parentindex, subIndex, index)} key={index.toString()} style={[AppStyles.flexDirectionRow, AppStyles.alignItems, AppStyles.drawerTextwidth85, AppStyles.marginLeft_2, AppStyles.marginTop_1]}>
        <Entypo
          name="dot-single" size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
        <Subheading style={[AppStyles.marginLeft_1, this.getsubChildeCatStyle(index)]}>{item.subCatName}</Subheading>
      </TouchableOpacity>
    )
  }





  render() {
    const { globalData, isLoading, selectedIndex } = this.state


    return (
      <SafeAreaView style={[AppStyles.mainContainer, styles.container]}>
        {Platform.OS === "android" && <View style={{ height: STATUS_BAR_HEIGHT }} />}
        <View style={AppStyles.drawerHeader}>
          <Image
            resizeMode="contain"
            style={[AppStyles.appLogo]}
            source={require('./../../asssets/logo04.png')}
          />
        </View>

        <ScrollView bounces={false}>
          <View style={[AppStyles.screenContainer]}>

            <Card.Content style={AppStyles.marginTop_1}>
              <View style={[AppStyles.row_space_between, AppStyles.alignItems]}>
                <TouchableOpacity onPress={() => this.onClickDashboard()} style={[AppStyles.flexDirectionRow, AppStyles.alignItems, AppStyles.drawerTextwidth85]}>
                  <MaterialIcons
                    name="dashboard" size={AppStyles.iconSize.height} color={selectedIndex != null ? UiColor.LIGHT_TEXT_COLOR : UiColor.SKYBLUE} />
                  <Subheading style={[AppStyles.marginLeft_1, { color: selectedIndex != null ? UiColor.DRAK_GRAY_COLOR : UiColor.SKYBLUE }, AppStyles.bold_500]}>Dashboards</Subheading>
                </TouchableOpacity>
              </View>
              {GeneralUtils.functions.drawerList && GeneralUtils.functions.drawerList.map((data, index) => this.renderMenuItem(data, index))}
            </Card.Content>

          </View>
        </ScrollView>
        <View style={AppStyles.marginTop_2} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
})

export default DrawerContent;
