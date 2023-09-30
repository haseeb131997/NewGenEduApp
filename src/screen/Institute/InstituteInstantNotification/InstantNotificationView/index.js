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
import {  Card, Divider,Subheading } from 'react-native-paper';
import AppStyles from "../../../../AppStyles/AppStyles";
import SelectListUtils from '../../../../utils/SelectListUtils'



import LabelText from '../../../../components/LabelText';

//import Divider from '../../../../components/Divider';



class InstantNotificationView extends Component {
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
      
          <View>
              <LabelText
                label={'Notification ID'}
                value={dataModel.notificationID}
              />
            </View>
            <View>
              <LabelText
                label={'To whom notification to be sent'}
                value={dataModel.receiverType == 'S' ? 'Student' : 'Group'}
              />
            </View>
            {dataModel.receiverType == 'G' &&
            <View>
            <View>
              <LabelText
                label={'Assignee group'}
                value={dataModel.assignee}
              />
            </View>
            <View>
              <LabelText
                label={'Assignee Group Description'}
                value={dataModel.groupDesc}
              />
            </View>
            </View>}
            {dataModel.receiverType == 'S' &&
            <View>
            <View>
              <LabelText
                label={'Student ID'}
                value={dataModel.studentID}
              />
            </View>
            <View>
              <LabelText
                label={'Student Name'}
                value={dataModel.studentName}
              />
            </View>
            </View>}

            <View>
              <LabelText
                label={'Delivery Date'}
                 value={dataModel.instant}
              />
            </View>
            <LabelText
            label={'Message type'}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.NotificationMaster, dataModel.messageType)}
          />

          <LabelText
            label={'Channel'}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MediaCommunication, dataModel.channel)}
          />


          <LabelText
            label={'Language'}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.LanguageMaster, dataModel.language)}
          />

{/*<Divider style={AppStyles.marginTop_3} />
    <View>
    <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <NotificationTemplateContent
        stateObject={stateObject}
      />
    </View>*/}
         
          {/* </View> */}
        </Card.Content>
      </View>

    );
  }
}


export default InstantNotificationView;

