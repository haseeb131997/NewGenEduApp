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
import { TextInput, Card, Divider, Title } from 'react-native-paper';
import { w, h, } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SearchUtils from "../../../../utils/SearchUtils";
import InputText from '../../../../components/InputText';
import SelectListUtils from '../../../../utils/SelectListUtils'
import LabelText from '../../../../components/LabelText';





var searchName = ''

class UserProfileGeneral extends Component {
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
    const { dataModel, editable, primaryKeyEditable } = stateObject.state
    const { parentStateChange } = stateObject
    return (<View>
 <Title>Basic Info</Title>

 <Divider style={AppStyles.marginTop_1}/>

    <LabelText
     label={'Name'}
     value={dataModel.userName}
    />
    
    <LabelText
     label={'Email ID'}
     value={dataModel.emailID}
    />
     <LabelText
     label={'Mobile No'}
     value={dataModel.mobileNo}
    />

<LabelText
     label={'Status'}
     value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ProfileStatusMaster, dataModel.status)}
    />

    <LabelText
     label={'Home Institute Name'}
     value={dataModel.instituteName}
    />

<LabelText
     label={'Home Institute ID'}
     value={dataModel.instituteID}
    />



<LabelText
     label={'Password Expiry Date'}
     value={dataModel.expiryDate}
    />
     

   

    



    </View>

    );
  }
}


const styles = StyleSheet.create({

})
export default UserProfileGeneral;

