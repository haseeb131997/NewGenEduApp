
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
import { w, h } from "../../utils/Dimensions";
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from "../../theme";
import NextPreviousBtn from '../NextPreviousBtn';
import NewOperation from "../../utils/NewOperation";
import { ScrollView } from 'react-native-gesture-handler';
import CustomButtons from '../../components/CustomButtons';
//import SpeedDailMenu from '../../components/SpeedDailMenu';
import AlertBox from '../../components/AlertBox';
import Spinner from '../../components/Loader';
import CompletedScreen from '../../components/CompletedScreen';
import SubScreenUtils from "../../utils/SubScreenUtils";
import Paggination from "../../utils/Paggination";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

class TwoLevelEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      btnStatus: false
    }
    this.onClickBtn = this.onClickBtn.bind(this)
    this.onClickBack = this.onClickBack.bind(this)
  }




  onClickBtn() {
    const { onSubmit,checkMandatory,checkMandatory2  } = this.props
    if (this.state.btnStatus) {
      if(checkMandatory2()){
        this.setState({
          btnStatus: false
        })
        onSubmit()
      }
    }
    else if (!this.state.btnStatus) {
      if(checkMandatory()){
        this.setState({
          btnStatus: true
        },()=>{
        
        })

      
      }
      
    }
  }

  onClickBack() {
    this.setState({
      btnStatus: false
    })

  }

  onClickDiscard() {
    const {
      stateObject
    } = this.props
    this.setState({
      btnStatus: false
    })
    Paggination.functions.discardRecord(stateObject)
  }


  render() {
    const {
      stateObject, templates1, templates2, stepsHeading, title, onSubmit, subTitle1,subTitle2
    } = this.props
    const { currentOperation, secondModalVisible } = stateObject.state
    return (
      <Portal>
        <Modal visible={secondModalVisible}
          onDismiss={() => stateObject.parentStateChange({
            secondModalVisible: false
          })}
        // contentContainerStyle={{}}
        >


          <View style={[styles.modalContainer]}>
            <Card.Content>
              <View style={[AppStyles.row_space_between, AppStyles.marginVertical_1, AppStyles.alignItems]}>
                <View>
                  <Title>{title}</Title>
                  <Text style={AppStyles.textColor}>{!this.state.btnStatus ? subTitle1 : subTitle2}</Text>
                </View>
                <TouchableOpacity onPress={() => this.onClickDiscard()}>
                  <Image resizeMode='contain' style={AppStyles.crossIcon}
                    source={require('../../asssets/icons/arr061.png')}
                  /></TouchableOpacity>
              </View>
            </Card.Content>
            <Divider />

            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <View style={AppStyles.marginTop_2}>
                <Card.Content>
                  
                  {!this.state.btnStatus ? templates1 : templates2}
                  {/* {templates2} */}
                  <View style={AppStyles.marginTop_3} />
                </Card.Content>
              </View>
            </ScrollView>


            <Divider />

            <View style={[AppStyles.row_space_between, AppStyles.marginVertical_2, AppStyles.marginHorizontal_2]}>

             {this.state.btnStatus && <CustomButtons
                onPress={() => this.onClickBack()}
                title={'Back'}
                titleStyle={AppStyles.btnTextStyle}
                containerStyle={AppStyles.signInContainer}
                buttonStyle={{ backgroundColor: UiColor.APP_BACKGROUND }}
              />}


              <CustomButtons
                onPress={() => this.onClickDiscard()}
                title={'Discard'}
                // titleStyle={AppStyles.btnTextStyle}
                containerStyle={AppStyles.errorBtnContainer}
                buttonStyle={{ backgroundColor: UiColor.ERROR_COLOR }}
              />

              <CustomButtons
                onPress={() => this.onClickBtn()}
                title={this.state.btnStatus ? 'Submit' : 'Continue'}
                containerStyle={AppStyles.signInContainer}
                buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
              />
            </View>

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

export default TwoLevelEditModal



