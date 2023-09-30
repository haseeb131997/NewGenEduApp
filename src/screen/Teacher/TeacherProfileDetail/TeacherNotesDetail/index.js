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
import { Caption,Title,Divider } from 'react-native-paper';





class TeacherNotesDetail extends Component {
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
      <View >
         <Title>Notes about {dataModel.teacherName}</Title>
        <Divider style={AppStyles.marginTop_1} />
     { dataModel.teacherNotes != 0 ? <ListView
       mapValue1 ={['notes']} 
       mapValue2 ={['date']} 
      //  mapValue3 ={[]} 
      stateArray ={dataModel.teacherNotes}
       /> :  <View style={AppStyles.alignItems}><Caption>There is no specail notes for the teacher</Caption></View>}


      </View>


    );
  }
}

const styles = StyleSheet.create({
})
export default TeacherNotesDetail;
