
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

// source={typeof globalData.logoImagePath == 'string' && globalData.logoImagePath.includes('CohesiveUpload') ? { uri: `${httpUtils.FILE_URL()}${globalData.logoImagePath}?ivas=${globalData.token1}&nekot=${globalData.userID}~${globalData.instituteID}&uhtuliak=${globalData.token0}` } : null}


import React, { Component } from 'react';
import { View, StyleSheet, Image, Linking } from 'react-native';
import { Text, Modal, Portal, Title, Subheading } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from "../../theme";
import CustomButtons from '../../components/CustomButtons';
import { httpUtils } from '../../utils/HttpUtils';






class WelComeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      logoImagePath: '',
      instituteName: '',
      userType: '',
      ivas: '',
      nekot: '',
      uhtuliak: ''
    }
  }


  async componentDidMount() {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    this.setState({
      logoImagePath: globalData.logoImagePath,
      instituteName: globalData.instituteName,
      userType: globalData.userType,
      ivas: globalData.token1,
      nekot: `${globalData.userID}~${globalData.instituteID}`,
      uhtuliak: globalData.token0
    })

  }



  render() {
    const { stateObject } = this.props
    // console.log(this.state.userType)
    // this.state.userType = 'S'
    return (
      <Portal>
        <Modal visible={stateObject.state.showWelcomeModal} onDismiss={() => stateObject.parentStateChange({
          showWelcomeModal: false
        })} contentContainerStyle={AppStyles.loginMainContainer}>


            <View style={{backgroundColor:UiColor.SKYBLUE}}>
            <Title style={[styles.headingStyle, AppStyles.marginTop_1]}>Welcome to</Title>
            <Title style={[styles.headingStyle, AppStyles.marginTop_1]}>NewGenEducationApp</Title>
            </View>
          <View style={[AppStyles.alignItems, styles.container]}>
          
            {/* <Image
              resizeMode="contain"
              style={[AppStyles.loginAppIcon]}
              source={require('./../../asssets/app-icon.png')}
            /> */}
            <View style={[AppStyles.alignItems]}>
              <Image
                resizeMode='contain'
                style={AppStyles.schoolLogo}
                source={typeof this.state.logoImagePath == 'string' && this.state.logoImagePath.includes('CohesiveUpload') ? { uri: `${httpUtils.FILE_URL()}${this.state.logoImagePath}?ivas=${this.state.ivas}&nekot=${this.state.nekot}&uhtuliak=${this.state.uhtuliak}` } : null}

              />
              <Subheading >{this.state.instituteName}</Subheading>
            </View>

            {/* <Title style={[styles.headingStyle, AppStyles.marginTop_1]}>Welcome to</Title>
            <Title style={[styles.headingStyle, AppStyles.marginTop_1]}>NewGenEducationApp</Title> */}


           {this.state.userType == 'A' && <View>
            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}> First time in using NewGenEducationApp? Haven't configured your Institute yet?</Text>
            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>Click here to <Text onPress={()=> Linking.openURL('https://newgeneducationapp.com/gettingStarted.html')} style={styles.linkText}>learn how to get started</Text> and configure your Institute right away!</Text>

            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>We bid you all the best in running your Institute's day-to-day activities through NewGenEducationApp.</Text>
            </View>}

            {this.state.userType == 'T' && <View>
            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>Managing & orienting all of your day-to-day teaching tasks has just got a whole lot easier.</Text>
            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>We provide various tools to help & support your teaching, Get into App and explore them now.</Text>

            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>With NewGenEducationApp you can focus more on your student's studies & career.</Text>
            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>All the best!</Text>
            </View>}

            {this.state.userType == 'O' && <View>
            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>Managing & orienting all of your day-to-day tasks has just got a whole lot easier.</Text>
            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>We bid you all the best in running your Institute's day-to-day activities through NewGenEducationApp.</Text>
            </View>}

            {this.state.userType == 'P' && <View>
            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>Help your Child's studies & career through our effective parenting tool.</Text>
            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>We bid you all the best in managing & monitoring your child's academics through NewGenEducationApp.</Text>
            </View>}

            {this.state.userType == 'S' && <View>
            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>Help your studies & career through our advanced tools.</Text>
            <Text style={[styles.SubheadingStyle, AppStyles.marginTop_1]}>We bid you all the best in managing & monitoring your academics through NewGenEducationApp.</Text>
            </View>}


            <View style={AppStyles.marginTop_3}>
              <CustomButtons
                onPress={() => stateObject.parentStateChange({
                  showWelcomeModal: false
                })}
                title="Get into App"
                titleStyle={AppStyles.signInTextStyle}
                containerStyle={AppStyles.goToContainer}
                buttonStyle={AppStyles.commonButtonStyle}
              />
            </View>
     <View style={[AppStyles.marginTop_2,AppStyles.alignItems]}>
       <Text style={AppStyles.textColor}>powered by</Text>
     <View style={AppStyles.marginTop_1}>
     <Image
        resizeMode="contain"
        style={AppStyles.appLogo}
        source={require('./../../asssets/logoBlack.png')}
      />
     </View>
     </View>

          </View>
          <View style={[AppStyles.alignItems, AppStyles.flex_one]}>
            <Image
              resizeMode="contain"
              style={styles.imageStyle}
              source={require('../../asssets/image/illustration2.png')}
            />
          </View>
        </Modal>
      </Portal>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: h('2%'),
    flex: 2,
    justifyContent: 'center'
  },
  headingStyle: {
    fontWeight: 'bold', textAlign: 'center',color:'#fff'
    
  },
  SubheadingStyle: {
    color: UiColor.LIGHT_TEXT_COLOR, textAlign: 'center'
  },
  imageStyle: {
    height: h('30%'), width: w('60%')
  },
  linkText:{
    color:UiColor.SKYBLUE,
    fontWeight:'600'
  },
  marginLeft_5:{
    marginLeft:w('-5%')
  }

})

export default WelComeModal



