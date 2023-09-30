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
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { TextInput, Title, Text, Subheading, Divider, Caption } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import { UiColor } from "../../../../theme";
import InputText from '../../../../components/InputText';
import SecondModal from '../../../../components/SecondModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EditMarkDetail from '../EditMarkDetail';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewAnswerModal from '../ViewAnswerModal';
import CustomButtons from '../../../../components/CustomButtons';









class ClassAssessmentStudentList extends Component {
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
    Paggination.functions.addAndedit(stateObject, 'studentAssessments', assessmentEmptyRecord)
  }


  onEdit(item, index) {
    Paggination.functions.editModalone = true
    const { stateObject } = this.props
    Paggination.functions.edit(stateObject, 'assessmentEmptyRecord', item, index)
  }


  ViewAnswer(item, index) {
    const {
      stateObject,
    } = this.props
    const { parentStateChange, } = stateObject

    parentStateChange({
      assessmentEmptyRecord: item,
      showAnswer: true
    })
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
          {dataModel.studentAssessments.map((item, index) => (
            <View key={index.toString()}  >
              <View style={[AppStyles.marginTop_2, AppStyles.flex_one]}>
                <View style={AppStyles.row_space_between}>

                  <View style={AppStyles.flex_one}>
                    <Subheading style={AppStyles.payTextStyle}>{index + 1}. {item.studentName}</Subheading>
                  </View>

                  <View style={AppStyles.flexDirectionRow}>
                    <View>
                      {/* <Ionicons onPress={() => this.ViewAnswer(item, index)}
                        name="eye" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} /> */}
                      <CustomButtons
                        onPress={() => this.ViewAnswer(item, index)}
                        title="View Answer"
                        titleStyle={AppStyles.signInTextStyle}
                        buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}

                      />

                    </View>
                    {(stateObject.state.currentOperation == 'Modification') &&
                      <View style={AppStyles.marginLeft_2}>
                        <AntDesign onPress={() => this.onEdit(item, index)}
                          name="edit" size={AppStyles.iconSize.height} color={AppStyles.inactiveMoreIcon.tintColor} />
                      </View>
                    }


                  </View>

                </View>
                {stateObject.state.currentOperation == 'Create' ? <View style={AppStyles.marginTop_2}>
                  <InputText
                    required={false}
                    // editable={false}
                    label={'Mark/Score'}
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
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Mark/Score</Caption>
                    <Text>{item.mark}</Text>
                  </View>
                  <View style={AppStyles.marginTop_1}>
                    <Caption style={[AppStyles.textColor, AppStyles.marginTop_1]}>Teacher feedback</Caption>
                    <Text>{item.teacherFeedback}</Text>
                  </View>
                </View>}



              </View>
              <Divider style={[AppStyles.marginVertical_1]} />
            </View>
          ))}
        </View>

        {Paggination.functions.editModalone && <SecondModal
          templates={<EditMarkDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={'Edit'}
          subTitle={'Assessment'}
          onSubmit={() => this.onSubmit()}
        />}

        <ViewAnswerModal
          stateObject={stateObject}
        />



      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default ClassAssessmentStudentList;

