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
import ImpNotes from '../../../../components/ImpNotes';
import { View,} from 'react-native';
import {  Card, } from 'react-native-paper';
//import { w, h } from "../../../../utils/Dimensions";
//import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
//import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';

//import { UiColor } from "../../../../theme";
import Batch from "../../../../components/Batch";
import ListItems from '../../../../components/ListItems';




class MeetingAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }


  render() {
    const {
      stateObject,data
    } = this.props
    //const { summaryDataModel,meetingIndex} = stateObject.state
    //console.log('stateObject.state inside meeting attendance',stateObject.state);
    //console.log('roomindex inside meeting attendance',roomindex);
    
    //if (typeof roomindex !== 'undefined' && roomindex !='')
    //console.log('summaryDataModel.SummaryResult[index].attendanceDetails',summaryDataModel.SummaryResult[roomindex].attendanceDetails.length)
    //console.log('summaryDataModel.SummaryResult[meetingIndex].attendanceDetails',summaryDataModel.SummaryResult[meetingIndex].attendanceDetails.length)
    //const { parentStateChange } = stateObject
    return (
     (stateObject.state.userType == 'P' || stateObject.state.userType == 'S') ?

      
      <View >
        <Card.Content>
        {data.attendanceDetails.length>0 &&
        <ListItems
                        
                        itemHeadings={['Name','Join Time','Left Time']} 
                        itemColumns={['attenderName','joinTime','leftTime']}
                        itemArray={data.attendanceDetails}
                      /> }

        {data.attendanceDetails.length==0 &&
         <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
         <Batch
           value={'Not Attended'}
           status={'E'}
         />
         </View>
        
        }            
        </Card.Content>
      </View>  :


      <View >
        <Card.Content>
        {stateObject.state.meetingData.attendanceDetails.length>0 &&
        <ListItems
                        
                        itemHeadings={['Name','Join Time','Left Time']} 
                        itemColumns={['attenderName','joinTime','leftTime']}
                        itemArray={stateObject.state.meetingData.attendanceDetails}
                      /> }

        {stateObject.state.meetingData.attendanceDetails.length==0 &&
         <ImpNotes
         isArray={false}
         message={`Nobody attended this meeting`}
       />}            
        </Card.Content>
      </View>

    );
  }
}


export default MeetingAttendance;

