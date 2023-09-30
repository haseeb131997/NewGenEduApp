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
import { View, StyleSheet,} from 'react-native';
import SelectListUtils from '../../../../utils/SelectListUtils'
import LabelText from '../../../../components/LabelText';











class ClassAssignmentGeneral extends Component {
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
    const { dataModel, editable, primaryKeyEditable, errorField } = stateObject.state
    const { parentStateChange } = stateObject

    return (<View style={{}}>



              <LabelText
                label={'Assignment ID'}
                value={dataModel.assignmentID}
              />

            <LabelText
                label={'Assignment Description'}
                value={dataModel.assignmentDescription}
              />


              <LabelText
                label={'Class'}
                value={dataModel.classID}
              />
       
              <LabelText
                label={'Subject'}
                value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, dataModel.subjectID)}
              />
        
              <LabelText
                label={'Type'}
                value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AssignmentTypesMaster, dataModel.type)}
              />
        
              <LabelText
                label={'Due Date'}
                value={dataModel.dueDate}
              />
      
        





    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default ClassAssignmentGeneral;

