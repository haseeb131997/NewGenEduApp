
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
import { View, StyleSheet, Platform } from 'react-native';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'
import CustomDatePicker from "../../../../components/CustomDatePicker"
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import GeneralUtils from "../../../../utils/GeneralUtils";







class AcademicYearConfigurationGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }



  render() {
    const {
      stateObject
    } = this.props
    const { dataModel, editable, primaryKeyEditable, summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
        <View style={[AppStyles.marginTop_2]}>
          <NewScreenDropDownPicker
            editable={editable}
            required={true}
            label={'Year'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.YearMaster}
            value={dataModel.year}
            placeholder="Select Year"
            onChangeValue={(value) => {
              dataModel.year = value;
              parentStateChange({ dataModel: dataModel })

            }}
            dropdownName={'yearDropdown'}
            subHeadingRecordName="a year"
            onClear={() => {
              dataModel.year = '';
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field1', dataModel.year, errorField, [], 'Year')}
          />
        </View>

        <View style={AppStyles.marginTop_1}>

          <CustomDatePicker
            tooltipReq={true}
            tooltipMsg={'Specify the starting date of the academic year'}
            tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={editable}
            label={'Start Date'}
            placeholder={'Pick start date'}
            secureTextEntry={false}
            // onChangeText={text => console.log(text,'p')}
            value={dataModel.startDate}
            format="DD-MM-YYYY"
            mode="date"
            onDateChange={value => {
              dataModel.startDate = value;
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.startDate, errorField, [], 'Start Date')}
          />
        </View>
        <View style={AppStyles.marginTop_1}>
          <CustomDatePicker
            tooltipReq={true}
            tooltipMsg={'Specify the ending date of the academic year'}
            tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={editable}
            label={'End Date'}
            placeholder={'Pick end date'}
            secureTextEntry={false}
            // onChangeText={text => console.log(text,'p')}
            value={dataModel.endDate}
            onDateChange={value => {
              dataModel.endDate = value;
              parentStateChange({ dataModel: dataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field2', dataModel.endDate, errorField, [], 'End Date')}

          />

        </View>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('10%'), width: w('65%')
  }
})
export default AcademicYearConfigurationGeneral;

