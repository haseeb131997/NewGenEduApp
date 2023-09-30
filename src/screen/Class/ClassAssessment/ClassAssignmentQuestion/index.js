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
import {  Subheading } from 'react-native-paper';
//import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import Batch from "../../../../components/Batch";
/*import { Avatar } from 'react-native-elements';
import { httpUtils } from '../../../../utils/HttpUtils';
import GeneralUtils from "../../../../utils/GeneralUtils"

import CustomButtons from '../../../../components/CustomButtons';
import SecondModal from '../../../../components/SecondModal';
import EditQuestionDetail from '../EditQuestionDetail';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Paggination from "../../../../utils/Paggination";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Exception from '../../../../utils/Exception'
import ImpNotes from '../../../../components/ImpNotes';
import AntDesign from 'react-native-vector-icons/AntDesign';



import { UiColor } from "../../../../theme";

var familyView = false
var notesView = false */

class ClassAssignmentQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedFamilyIndex: 0
    }
 
   

  }












  render() {
    const { stateObject, currentIndex } = this.props
    const { dataModel, assessmentEmptyRecord, } = stateObject.state
    const { parentStateChange } = stateObject

  
    return (
      <View>


    

  
        <View style={[AppStyles.marginTop_2]}>
          {assessmentEmptyRecord.questions.map((item,index) => (
            <View key={index.toString()} style={[AppStyles.marginTop_3]}>
                <View style={[ AppStyles.flex_one]}>
                  <Subheading style={[AppStyles.bold]}>{'Question '}{index+1}.</Subheading>
                </View>
              <Subheading style={[AppStyles.bold_400]}>{item.question} </Subheading>

              <View style={[ AppStyles.flex_one,AppStyles.marginTop_1]}>
                  <Subheading style={[AppStyles.bold]}>{'Answer'}</Subheading>
                </View>
               {///N0U-106
              item.answer !=''? <Subheading style={[AppStyles.bold_400]}>{item.answer}</Subheading>
              :  
              <Batch
              value={'Not answered'}
              status={'E'}
            />} 
              
            </View>
          ))}
        </View>
      
      </View>

    );
  }
}

const styles = StyleSheet.create({
})
export default ClassAssignmentQuestion;
