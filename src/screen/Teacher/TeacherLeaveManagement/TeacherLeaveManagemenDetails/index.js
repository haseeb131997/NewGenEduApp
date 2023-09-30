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
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import ListView from '../../../../components/ListView';
import { Caption, Title, Divider, Subheading, Text,Card } from "react-native-paper";
import GeneralUtils from "../../../../utils/GeneralUtils"
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import InputText from '../../../../components/InputText';
import LabelText from '../../../../components/LabelText';






class TeacherLeaveManagemenDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

  }


 


  


  render() {
    const { stateObject } = this.props
    const { dataModel, editable,errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View>
    { (stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') ? <View>
       <View style={[AppStyles.marginTop_1]}>
        <NewScreenDropDownPicker
          editable={editable}
          required={true}
          label={'Leave Type'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.LeaveMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LeaveMaster, dataModel.type)}
          placeholder="Select Leave Type"
          onChangeValue={(value) => {
            dataModel.type = value;
            parentStateChange({ dataModel: dataModel })
          }}
          dropdownName={'leaveTypeDropdown'} 
          subHeadingRecordName = "a leave type"
          onClear={() => {
            dataModel.type= '';
          parentStateChange({ dataModel: dataModel })
        }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field8', dataModel.type, errorField, [], 'Leave Type')}
        />
      </View>

      <View style={AppStyles.marginTop_1}>
        <InputText
          tooltipReq={true}
          tooltipMsg={'Mention the reason for the leave.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          editable={!editable}
          label={'Reason'}
          secureTextEntry={false}
          onChangeText={text => {
            dataModel.reason = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.reason}
          errorMessage={GeneralUtils.functions.getErrorMessage('field9', dataModel.reason, errorField, [], 'Reason')}
        />
      </View>
       </View> : 
       <View>
            <Card.Content>
    
              <LabelText
                label={'Leave Type'}
                value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LeaveMaster,dataModel.type)}
              />
     
         <LabelText
                label={'Reason'}
                value={dataModel.reason}
              />
               <LabelText
                label={'Leave approval status'}
                value={dataModel.leaveStatus}
              />
                 </Card.Content>
         </View>
       
       }


      </View>


    );
  }
}

const styles = StyleSheet.create({
})
export default TeacherLeaveManagemenDetails;
