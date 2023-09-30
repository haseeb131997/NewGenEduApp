
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

/* * * Change Tag:NEW3.01
 Change Desc: in this header orientation (means header expand) is not used.
 Changed By : Shashank
 Date:17-11-2020 
 */

import React, { Component } from "react";
import { View, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { Button, Menu, Divider, Title, Text, Subheading, Card } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import { Header, Avatar } from 'react-native-elements';
import AppStyles from "../../AppStyles/AppStyles";
import MoreIcon from 'react-native-vector-icons/AntDesign';
import MenuIcon from 'react-native-vector-icons/Feather';
import { UiColor } from '../../theme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralUtils from "../../utils/GeneralUtils";
import { httpUtils } from '../../utils/HttpUtils';
import apiCall from "../../ApiCall/ActionApi";
import { useDrawerStatus } from '@react-navigation/drawer';






const CenterHeaderComponent = (props) => {
  const { stateObject, childState } = props
  // const { globalData } = childState.state

  // GeneralUtils.functions.globalHeadarData
  return (
    <View style={[AppStyles.flexDirectionRow]}>
      <Image
        resizeMode='contain'
        style={AppStyles.schoolLogo}
        // source={require('./../../asssets/sampleSchoolLogo.jpeg')}
        source={typeof GeneralUtils.functions.globalHeadarData.logoImagePath == 'string' && GeneralUtils.functions.globalHeadarData.logoImagePath.includes('CohesiveUpload') ? { uri: `${httpUtils.FILE_URL()}${GeneralUtils.functions.globalHeadarData.logoImagePath}?ivas=${GeneralUtils.functions.globalHeadarData.token1}&nekot=${GeneralUtils.functions.globalHeadarData.userID}~${GeneralUtils.functions.globalHeadarData.instituteID}&uhtuliak=${GeneralUtils.functions.globalHeadarData.token0}` } : null}
      />
      <Subheading style={[AppStyles.textAlign_center, AppStyles.width85, AppStyles.bold_500]}>{GeneralUtils.functions.globalHeadarData.instituteName}</Subheading>
    </View>
  )
}



const RightHeaderComponent = (props) => {
  const { stateObject, childState } = props
  // const { globalData } = childState.state


  const closeMenu = () => {
    childState.setState({
      visible: false,
      activeMenu: false
    })
  };
  const closeProfile = () => {
    childState.setState({
      profileVisible: false
    })
  };

  const hideMenu = async (item) => {
    const { stateObject, childState } = props
    childState.setState({
      visible: false,
      profileVisible: false,
      activeMenu: false
    })

    var userType = ''
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    if (globalData != null) {
      userType = globalData.userType
    }
    // GeneralUtils.functions.drawerStatObject
    switch (item) {
      case 'SignOut':
        // GeneralUtils.functions.logOutBtn()
        if (GeneralUtils.functions.drawerStatObject != null) {
          GeneralUtils.functions.drawerStatObject.setState({
            selectedIndex: 'null'
          })
        }
        GeneralUtils.functions.logOutBtn(stateObject)


        break
      case 'Profile':
        if (GeneralUtils.functions.drawerStatObject != null) {
          GeneralUtils.functions.drawerStatObject.setState({
            selectedIndex: 'null'
          })
        }
        switch (userType) {
          case 'S':
            // Actions.StudentProfileDetail();
            stateObject.props.navigation.navigate('StudentProfileDetail')
            break
          case 'P':
            // Actions.UserProfileDetail();
            stateObject.props.navigation.navigate('UserProfileDetail')
            break
          case 'A':
            // Actions.TeacherProfileDetail();
            stateObject.props.navigation.navigate('TeacherProfileDetail')
            break
          case 'T':
            // Actions.TeacherProfileDetail();
            stateObject.props.navigation.navigate('TeacherProfileDetail')
            break
          case 'O':
            // Actions.TeacherProfileDetail();
            stateObject.props.navigation.navigate('TeacherProfileDetail')
            break
        }
        break
      case 'Password':
        // Actions.ChangePassword();
        if (GeneralUtils.functions.drawerStatObject != null) {
          GeneralUtils.functions.drawerStatObject.setState({
            selectedIndex: 'null'
          })
        }
        stateObject.props.navigation.navigate('ChangePassword')
        break
      case 'Institute':
        if (GeneralUtils.functions.drawerStatObject != null) {
          GeneralUtils.functions.drawerStatObject.setState({
            selectedIndex: 'null'
          })
        }
        // Actions.ChangeInstitute();
        stateObject.props.navigation.navigate('ChangeInstitute')
        break
      case 'Help':
        await Linking.openURL('https://newgeneducationapp.com/userManual.html')
        break
    }


  };


  return (
    <View style={[AppStyles.alignInRow]}>
      <Menu
        style={[AppStyles.marginTop_4,]}
        visible={childState.state.visible}
        onDismiss={closeMenu}
        anchor={
          <View style={{}}>
            <MoreIcon onPress={() => childState.setState({ visible: true, activeMenu: true })}
              name="appstore-o" size={AppStyles.moreIconSize.height} color={childState.state.activeMenu ? AppStyles.activeMoreIcon.tintColor : AppStyles.inactiveMoreIcon.tintColor} />
          </View>
        }


      >


        <Card.Content style={AppStyles.actionContainerStyle}>
          <Subheading style={[AppStyles.actionTextStyle]}>Quick Links</Subheading>
        </Card.Content>

        <Card.Content>
          <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
            <Image resizeMode='contain' style={AppStyles.moreIcons}
              source={require('./../../asssets/icons/change.png')}
            />
            <Menu.Item onPress={() => hideMenu('Institute')} title="Change Institute" />
          </View>
        </Card.Content>

        <Divider />

        <Card.Content>
          <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
            <Image resizeMode='contain' style={AppStyles.moreIcons}
              source={require('./../../asssets/icons/changePass.png')}
            />
            <Menu.Item onPress={() => hideMenu('Password')} title="Change Password" />
          </View>
        </Card.Content>

        <Divider />

        <Card.Content>
          <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
            <Image resizeMode='contain' style={AppStyles.moreIcons}
              source={require('./../../asssets/icons/signout.png')}
            />
            <Menu.Item onPress={() => hideMenu('SignOut')} title="Sign Out" />
          </View>
        </Card.Content>

        <Divider />

        <Card.Content>
          <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
            <Image resizeMode='contain' style={AppStyles.moreIcons}
              source={require('./../../asssets/icons/faq.png')}
            />
            <Menu.Item onPress={() => hideMenu('Help')} title="Help" />
          </View>
        </Card.Content>
      </Menu>


      <View style={AppStyles.avatarContainer} />
      <Menu
        style={AppStyles.marginTop_5}
        visible={childState.state.profileVisible}
        onDismiss={closeProfile}
        anchor={
          <Avatar
            onPress={() => childState.setState({ profileVisible: true })}
            rounded
            source={childState.getImagePath()}
          />
        }>
        <Card.Content>
          <View style={AppStyles.profileMenuContainer}>
            <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
              <Avatar
                size={AppStyles.avatarSize.height}
                rounded
                source={childState.getImagePath()}
              />
              <View style={AppStyles.flex_one}>
                <Subheading style={[AppStyles.marginLeft_1, AppStyles.bold_600]}>Hello, {GeneralUtils.functions.globalHeadarData.userName}</Subheading>
                <Text style={[AppStyles.marginLeft_1, { color: UiColor.LIGHT_TEXT_COLOR }]}>{GeneralUtils.functions.globalHeadarData.emailId}</Text>
              </View>
            </View>
            <Divider style={AppStyles.marginTop_2} />
            <Card.Content>
              <View style={[AppStyles.flexDirectionRow, AppStyles.alignItems]}>
                <Image resizeMode='contain' style={AppStyles.moreIcons}
                  source={require('./../../asssets/icons/myProfile.png')}
                />
                <Menu.Item onPress={() => hideMenu('Profile')} title="My Profile" titleStyle={AppStyles.myProfileTextStyle} />
              </View>
            </Card.Content>
          </View>
        </Card.Content>

      </Menu>

    </View>
  )
}



const LeftHeaderComponent = (props) => {
  const { stateObject } = props

  const DrawerStatus = useDrawerStatus()

  const openDrawer = () => {


    stateObject.props.navigation.openDrawer()

  }
  return (
    <View style={AppStyles.leftContainer}>

      <MenuIcon onPress={openDrawer} name="menu" size={AppStyles.drawerIconSize.height} color={(DrawerStatus == 'open') ? UiColor.SKYBLUE : UiColor.LIGHT_TEXT_COLOR} />
    </View>
  )
}




class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeMenu: false,
      profileVisible: false,
      // globalData: {
      //   logoImagePath: "",
      //   userID: "",
      //   token0: "",
      //   token1: '',
      //   instituteID: ''
      // }
    }
  }

  // async componentDidMount() {
  //   var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
  //   this.setState({
  //     globalData: globalData
  //   })
  // }



  getImagePath() {
    // const { globalData } = this.state


    if (typeof GeneralUtils.functions.globalHeadarData.profileImagePath == 'string' && GeneralUtils.functions.globalHeadarData.profileImagePath.includes('CohesiveUpload')) {
      return { uri: `${httpUtils.FILE_URL()}${GeneralUtils.functions.globalHeadarData.profileImagePath}?ivas=${GeneralUtils.functions.globalHeadarData.token1}&nekot=${GeneralUtils.functions.globalHeadarData.userID}~${GeneralUtils.functions.globalHeadarData.instituteID}&uhtuliak=${GeneralUtils.functions.globalHeadarData.token0}` }
    }
    else if (typeof GeneralUtils.functions.globalHeadarData.profileImagePath == 'string' && GeneralUtils.functions.globalHeadarData.profileImagePath.includes('objectstorage')) {
      return { uri: GeneralUtils.functions.globalHeadarData.profileImagePath }
    }
    else {
      return httpUtils.DEFAULT_IMAGE_FILE_PATH()
    }


  }

  render() {
    const { stateObject } = this.props
    return (

      <Header
        placement="left"
        leftComponent={<LeftHeaderComponent stateObject={stateObject} />}
        centerComponent={<CenterHeaderComponent stateObject={stateObject} childState={this} />}
        rightComponent={<RightHeaderComponent stateObject={stateObject} childState={this} />}
        containerStyle={AppStyles.appHeaderStyle}
      />

    )
  }
}



export default AppHeader
