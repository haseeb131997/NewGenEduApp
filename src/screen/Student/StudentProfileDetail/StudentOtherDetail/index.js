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

 /* * * Change Tag:SHA001
  Change Desc: add property for iPad and Tablet style in dropdown
  Changed By : Shashank
  Date:22-12-2020 
  */
  import React, { Component } from "react";
  import { View, StyleSheet, } from 'react-native';
  import SelectListUtils from '../../../../utils/SelectListUtils'
  import AppStyles from "../../../../AppStyles/AppStyles";
  import InputText from '../../../../components/InputText';
  
  
  
  
  
  class StudentOtherDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false
      }
    }
  
  
  
  
  
    render() {
      const { stateObject } = this.props
      const { dataModel, editable } = stateObject.state
      const { parentStateChange } = stateObject
      return (
        <View style={AppStyles.margin_1}>

         <View style={AppStyles.marginTop_3}>
            <InputText
              label={'National ID'}
              secureTextEntry={false}
              value={dataModel.general.nationalID }
              editable={editable}
            />
          </View>


        <View style={AppStyles.marginTop_3}>
            <InputText
              label={'Blood Group'}
              secureTextEntry={false}
              value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.BloodGroupMaster,dataModel.general.bloodGroup)}
              editable={editable}
            />
          </View>
  
          <View style={AppStyles.marginTop_3}>
            <InputText
              label={'Existing Medical Details'}
              secureTextEntry={false}
              value={dataModel.emergency.existingMedicalDetails}
              editable={editable}
            />
          </View>
         
  
        
         
        </View>
  
  
      );
    }
  }
  
  const styles = StyleSheet.create({
  })
  export default StudentOtherDetail;
  