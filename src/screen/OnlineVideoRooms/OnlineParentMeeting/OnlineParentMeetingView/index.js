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




class OnlineParentMeetingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }



  getTypeValue(type){
    if(type == '1'){
     return '1-to-1 Meeting'
    }
    else if(type == 'G'){
      return 'Group meeting'
    }
    else{
      return ''
    }
  }


  render() {
    const {
      stateObject
    } = this.props
    const {  dataModel} = stateObject.state
    return (
      <View >
        <Card.Content>
          <View>
              <LabelText
                label={'Meeting ID'}
                value={dataModel.classroomID}
              />
            </View>
            <View>
              <LabelText
                label={'Classroom type'}
                value={this.getTypeValue(dataModel.type)}
              />
            </View>
            <View>
              <LabelText
                label={'Topic / Objective'}
                 value={dataModel.heading}
              />
            </View>
            <View>
              <LabelText
                label={'Description'}
                 value={dataModel.description}
              />
            </View>

            {dataModel.type =='1' && <View>
              <LabelText
                label={'Student Name'}
                 value={dataModel.studentName}
              />
          
              <LabelText
                label={'Student ID'}
                 value={dataModel.studentID}
              />
            </View>}
            {dataModel.type =='G' && <View>
              <LabelText
                label={'Assignee Group'}
                 value={dataModel.class}
              />
          
              <LabelText
                label={'Assignee Group Description'}
                 value={dataModel.description}
              />
            </View>}
          {/* </View> */}
        </Card.Content>
      </View>

    );
  }
}


export default OnlineParentMeetingView;

