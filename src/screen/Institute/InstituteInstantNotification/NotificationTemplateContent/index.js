
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
import GeneralUtils from "../../../../utils/GeneralUtils";
import InputText from '../../../../components/InputText';
import InputTextArea from '../../../../components/InputTextArea';
import AppStyles from "../../../../AppStyles/AppStyles";
import { UiColor } from "../../../../theme";
import ImpNotes from '../../../../components/ImpNotes';
import { DataTable } from 'react-native-paper';
import LabelText from '../../../../components/LabelText';


const notes = [{
  text: "Below you can see the tag names and tag descriptions applicable for this template",
  color: UiColor.DRAK_GRAY_COLOR
},
{
  text: "A tag name in template will be replaced by the original tag value by the system",
  color: UiColor.DRAK_GRAY_COLOR
},
{
  text: "For example STUDENT_NAME in template will be replaced by the original student name",
  color: UiColor.DRAK_GRAY_COLOR
},

]


class NotificationTemplateContent extends Component {
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
    const { dataModel, editable, primaryKeyEditable, errorField } = stateObject.state
    const { parentStateChange } = stateObject


    return (
      <View>

        {(stateObject.state.currentOperation == 'Create' || stateObject.state.currentOperation == 'Modification') ? <View style={AppStyles.marginTop_1}>
        <InputText
          tooltipReq={true}
          tooltipMsg={'It contains subject section of email or sms message'}
          tooltipStyle={styles.subtooltipStyle}
          required={true}
          editable={!editable}
          label={'Subject content'}
          secureTextEntry={false}
          // multiline={true}
          onChangeText={text => {
            dataModel.subjectTemplate = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.subjectTemplate}
          errorMessage={GeneralUtils.functions.getErrorMessage('field7', dataModel.subjectTemplate, errorField, [], 'Subject content')}
        />

        <InputText
          tooltipReq={true}
          tooltipMsg={'It contains greeting section of email or sms message. For example Dear Martyn, Respected Martyn'}
          tooltipStyle={styles.greettooltipStyle}
          required={true}
          editable={!editable}
          label={'Greeting content'}
          secureTextEntry={false}
          // multiline={true}
          onChangeText={text => {
            dataModel.greetingTemplate = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.greetingTemplate}
          errorMessage={GeneralUtils.functions.getErrorMessage('field8', dataModel.greetingTemplate, errorField, [], 'Greeting content')}
        />

        <InputTextArea
          required={true}
          tooltipReq={true}
          tooltipMsg={'It contains body section of email or sms message'}
          editable={!editable}
          label={'Body content'}
          secureTextEntry={false}
          value={dataModel.bodyTemplate}
          onChangeText={text => {
            dataModel.bodyTemplate= text;
            parentStateChange({ dataModel: dataModel })}}
        
            errorMessage={GeneralUtils.functions.getErrorMessage('field9', dataModel.bodyTemplate, errorField, [],'Body content')}
          
        

        />

        <InputText
          tooltipReq={true}
          tooltipMsg={'It contains footer section of email or sms message, For example thank you'}
          tooltipStyle={styles.footertooltipStyle}
          required={true}
          editable={!editable}
          label={'Footer content'}
          secureTextEntry={false}
          // multiline={true}
          onChangeText={text => {
            dataModel.footerTemplate = text
            parentStateChange({ dataModel: dataModel })
          }}
          value={dataModel.footerTemplate}
          errorMessage={GeneralUtils.functions.getErrorMessage('field10', dataModel.footerTemplate, errorField, [], 'Footer content')}
        />
        </View> : <View>
        <LabelText
            label={'Subject content'}
            value={dataModel.subjectTemplate}
          />
           <LabelText
            label={'Greeting content'}
            value={dataModel.greetingTemplate}
          />
             <LabelText
            label={'Body content'}
            value={dataModel.bodyTemplate}
          />
            <LabelText
            label={'Footer content'}
            value={dataModel.footerTemplate}
          />
        </View>}

     


       <View style={AppStyles.marginTop_2}>
       <ImpNotes
          isArray={true}
          arrayMessage={notes}
        />
       </View>


        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Tag</DataTable.Title>
            <DataTable.Title >Value</DataTable.Title>
          </DataTable.Header>
          {dataModel.tagDetails.map((item, index) => (
            <DataTable.Row key={index.toString()}>
              <DataTable.Cell>{item.tagID}</DataTable.Cell>
              <DataTable.Cell >{item.tagDescription}</DataTable.Cell>
            </DataTable.Row>
          ))}


        </DataTable>



      </View>
    );
  }
}


const styles = StyleSheet.create({
  subtooltipStyle: {
    height: h('10%'), width: w('65%')
  },
  greettooltipStyle: {
    height: h('20%'), width: w('60%')
  },
  footertooltipStyle: {
    height: h('15%'), width: w('60%')
  }
})
export default NotificationTemplateContent;

