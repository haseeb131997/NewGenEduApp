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
import { View, } from 'react-native';
import {  Card,  } from 'react-native-paper';

import SelectListUtils from '../../../../utils/SelectListUtils'



import LabelText from '../../../../components/LabelText';




class ClassAssignmentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }



  render() {
    const {
      stateObject
    } = this.props
    const { summaryDataModel, dataModel,currentOperation} = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View >
        <Card.Content>
          {/* <View style={AppStyles.alignItems}>
            <Title style={{ color: UiColor.SKYBLUE }}>{'2021'}</Title>
            <Caption >{'Academic Year'}</Caption>
          </View> */}
          {/* currentOperation == "Authorisation" && */}
          <View>
              <LabelText
                label={'Assignment ID'}
                value={dataModel.assignmentID}
              />
            </View>
            <View>
              <LabelText
                label={'Assignment Description'}
                value={dataModel.assignmentDescription}
              />
            </View>
            <View>
              <LabelText
                label={'Class'}
                value={dataModel.classDescription}
              />
            </View>
            <View>
              <LabelText
                label={'Subject'}
                value={dataModel.subjectName}
              />
            </View>
            <View>
              <LabelText
                label={'Type'}
                value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AssignmentTypesMaster, dataModel.type)}
              />
            </View>
            <View>
              <LabelText
                label={'Due Date'}
                value={dataModel.dueDate}
              />
            </View>
        
           
         
          {/* </View> */}
        </Card.Content>
      </View>

    );
  }
}


export default ClassAssignmentView;

