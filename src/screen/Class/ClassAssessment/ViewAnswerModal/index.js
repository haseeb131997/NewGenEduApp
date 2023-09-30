
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
import AppStyles from '../../../../AppStyles/AppStyles';
import { ScrollView } from 'react-native-gesture-handler';
import ClassAssignmentWorkSheet from '../ClassAssignmentWorkSheet';
import ClassAssignmentQuestion from '../ClassAssignmentQuestion';





class ViewAnswerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }





  render() {
    const {
      stateObject, templates, title, viewHeading
    } = this.props
    const { currentOperation,showAnswer,assessmentEmptyRecord,dataModel } = stateObject.state
    return (
      <Portal>
        <Modal visible={showAnswer} onDismiss={() => stateObject.parentStateChange({
          showAnswer:false
        })}
          contentContainerStyle={AppStyles.loginMainContainer}>
          <View style={AppStyles.modalContainer,AppStyles.flex_one}>
            <Card.Content>
              <View style={[AppStyles.row_space_between, AppStyles.marginVertical_1, AppStyles.alignItems]}>
                <View>
                  <Title>{assessmentEmptyRecord.studentName}</Title>
                  <Text style={AppStyles.textColor}>{dataModel.type == 'Q' ? 'Questions and Answers' : 'Worksheets'}</Text>
                </View>
                <TouchableOpacity onPress={() => stateObject.parentStateChange({
                  showAnswer:false
                })}>
                  <Image resizeMode='contain' style={AppStyles.crossIcon}
                    source={require('../../../../asssets/icons/arr061.png')}
                  /></TouchableOpacity>
              </View>
            </Card.Content>
            <Divider />

            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <Card.Content>
               {dataModel.type == 'Q' ?  <ClassAssignmentQuestion
                 stateObject={stateObject}
                /> : <ClassAssignmentWorkSheet
                stateObject={stateObject}
               /> }
                  <View style={AppStyles.marginTop_3} />
                </Card.Content>
            </ScrollView>
      
          </View>

        </Modal>
      </Portal>
    );
  }
}


const styles = StyleSheet.create({

 

})

export default ViewAnswerModal




