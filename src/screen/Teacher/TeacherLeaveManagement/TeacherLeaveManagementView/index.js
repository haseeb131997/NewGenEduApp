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

import LabelText from '../../../../components/LabelText';
import SelectListUtils from '../../../../utils/SelectListUtils'





class TeacherLeaveManagementView extends Component {
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


    if(dataModel.fromNoon == 'D' &&  dataModel.toNoon == 'D'){
      stateObject.state.selectOption = 'fullDay'
     }
     else if(dataModel.fromNoon == 'F' &&  dataModel.toNoon == 'F'){
      stateObject.state.selectOption = 'halfDay'
     }
    else if(dataModel.fromNoon == 'A' &&  dataModel.toNoon == 'A'){
      stateObject.state.selectOption = 'halfDay'
     }


    return (
      <View >
        <Card.Content>
      
          <View>
              <LabelText
                label={'Leave Reference ID'}
                value={dataModel.referenceId}
              />
            </View>
            <View>
              <LabelText
                label={'Staff Name'}
                value={dataModel.teacherName}
              />
            </View>
            <View>
              <LabelText
                label={'Staff ID'}
                value={dataModel.teacherID}
              />
            </View>

            {stateObject.state.selectOption == 'fullDay' && 
            <View>
               <LabelText
                label={'Leave Start date'}
                value={dataModel.from}
              />

               <LabelText
                label={'Leave End Date'}
                value={dataModel.to}
              />
            </View>
            }

          {stateObject.state.selectOption == 'halfDay' && 
            <View>
               <LabelText
                label={'Date'}
                value={dataModel.from}
              />
               <LabelText
                label={'Noon'}
                value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.NoonMaster,dataModel.fromNoon)}
              />
            </View>
            }
            
          {/* </View> */}
        </Card.Content>
      </View>

    );
  }
}


export default TeacherLeaveManagementView;

