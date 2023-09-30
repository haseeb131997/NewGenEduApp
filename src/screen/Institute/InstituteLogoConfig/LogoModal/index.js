
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


import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Modal, Portal, Title, Subheading, Card, Divider } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from '../../../../AppStyles/AppStyles';
import { UiColor } from "../../../../theme";
import { ScrollView } from 'react-native-gesture-handler';
import CustomButtons from '../../../../components/CustomButtons';
//import SpeedDailMenu from '../../../../components/SpeedDailMenu';
import AlertBox from '../../../../components/AlertBox';
import Spinner from '../../../../components/Loader';
import GeneralInstituteCompletedScreen from '../../../../components/GeneralInstituteCompletedScreen';
//import SubScreenUtils from "../../../../utils/SubScreenUtils";
//import Paggination from "../../../../utils/Paggination";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

class LogoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }




  render() {
    const {
      stateObject, templates, stepsHeading, title, onSubmit,subTitle
    } = this.props
    const { currentOperation,logoModalVisible } = stateObject.state
    return (
      <Portal>
        <Modal visible={logoModalVisible}
          onDismiss={() => stateObject.parentStateChange({
                  logoModalVisible: false
          })}
        // contentContainerStyle={{}}
        >

          <View style={[styles.modalContainer]}>
            <Card.Content>
              <View style={[AppStyles.row_space_between, AppStyles.marginVertical_1, AppStyles.alignItems]}>
                <View>
                  <Title>{title}</Title>
                  <Text style={AppStyles.textColor}>{subTitle}</Text>
                </View>
                <TouchableOpacity onPress={() => stateObject.parentStateChange({
                  logoModalVisible: false
          })}>
                  <Image resizeMode='contain' style={AppStyles.crossIcon}
                    source={require('../../../../asssets/icons/arr061.png')}
                  /></TouchableOpacity>
              </View>
            </Card.Content>
            <Divider />

           {!stateObject.state.showComplete &&  <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <View style={AppStyles.marginTop_2}>
                <Card.Content>
                  {templates}
                  <View style={AppStyles.marginTop_3} />
                </Card.Content>

              </View>
            </ScrollView>}
            <Divider />

         {!stateObject.state.showComplete && <View style={[AppStyles.row_space_between, AppStyles.marginVertical_2, AppStyles.marginHorizontal_2]}>
              <CustomButtons
                onPress={() => stateObject.parentStateChange({
                  logoModalVisible: false
          })}
                title={'Discard'}
                // titleStyle={AppStyles.btnTextStyle}
                containerStyle={AppStyles.errorBtnContainer}
                buttonStyle={{ backgroundColor: UiColor.ERROR_COLOR }}
              />
              <CustomButtons
                onPress={() => onSubmit()}
                title={'Submit'}
                containerStyle={AppStyles.signInContainer}
                buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
              />
            </View>}


        {stateObject.state.showComplete &&
        <GeneralInstituteCompletedScreen
        title={stateObject.state.heading}
        Subheading={'edited'}
          stateObject={stateObject}
        />
    }


          </View>

          <AlertBox
              stateObject={stateObject}
            />
             {stateObject.state.isLoading &&
            <Spinner loading={stateObject.state.isLoading} />}
        </Modal>
      </Portal>
    );
  }
}


const styles = StyleSheet.create({

  modalContainer: {
    backgroundColor: UiColor.WHITE,
    margin: h('1.5%'),
    padding: h('.5%'),
    maxHeight: height - h('15%'),
  },


})

export default LogoModal



