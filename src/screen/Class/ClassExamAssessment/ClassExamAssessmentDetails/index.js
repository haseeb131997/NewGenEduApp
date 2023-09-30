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
import { View, StyleSheet, } from 'react-native';
import {  Text, Subheading, Divider, Caption } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
//import { UiColor } from "../../../../theme";
import InputText from '../../../../components/InputText';
import SecondModal from '../../../../components/SecondModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EditAssessmentDetail from '../EditAssessmentDetail';
import Paggination from "../../../../utils/Paggination";









class ClassExamAssessmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onEdit = this.onEdit.bind(this)
  }

  onSubmit() {
    Paggination.functions.editModalone = true
    const {
      stateObject,
    } = this.props
    const { assessmentEmptyRecord } = stateObject.state
      Paggination.functions.addAndedit(stateObject, 'marks', assessmentEmptyRecord)
  }


  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'assessmentEmptyRecord', item, index)
  }




  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField } = stateObject.state
    const { parentStateChange, } = stateObject

    return (
      <View>
        <View>
          {dataModel.marks.map((item, index) => (
            <View key={index.toString()}  >
              <View style={[AppStyles.marginTop_2,]}>
                <View style={AppStyles.row_space_between}>

                  <View>
                    <Subheading style={AppStyles.payTextStyle}>{index + 1}. {item.studentName}</Subheading>
                  </View>

                  {(stateObject.state.currentOperation == 'Modification') &&
                    <AntDesign onPress={() => this.onEdit(item, index)}
                      name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />}

                </View>
                {stateObject.state.currentOperation == 'Create' ? <View style={AppStyles.marginTop_2}>
                  <InputText
                    required={false}
                    // editable={false}
                    label={'Mark'}
                    secureTextEntry={false}
                    keyboardType={'numeric'}
                    onChangeText={text => {
                      item.mark = text
                      parentStateChange({ dataModel: dataModel })
                    }}
                    value={item.mark}
                  />

                  <InputText
                    required={false}
                    // editable={false}
                    label={'Teacher feedback'}
                    secureTextEntry={false}
                    multiline={true}
                    onChangeText={text => {
                      item.teacherFeedback = text
                      parentStateChange({ dataModel: dataModel })
                    }}
                    value={item.teacherFeedback}
                  />
                </View> : <View>
                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Mark</Caption>
                    <Text>{item.mark}</Text>
                  </View>
                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Teacher feedback</Caption>
                    <Text>{item.teacherFeedback}</Text>
                  </View>
                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Grade</Caption>
                    <Text>{item.grade}</Text>
                  </View>
                </View>}



              </View>
              <Divider style={[AppStyles.marginVertical_1]} />
            </View>
          ))}
        </View>

        {Paggination.functions.editModalone && <SecondModal
          templates={<EditAssessmentDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={'Edit'}
          subTitle={'Assessment'}
          onSubmit={() => this.onSubmit()}
        />}



      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default ClassExamAssessmentDetails;

