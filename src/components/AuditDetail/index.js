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
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Card, Text, Title, Divider, Appbar,Caption, Subheading } from 'react-native-paper';
import { w, h, } from "../../utils/Dimensions";
import { ScrollView } from 'react-native-gesture-handler';
import AppStyles from "../../AppStyles/AppStyles";
import LabelText from '../../components/LabelText';
import { UiColor } from "../../theme";




class AuditDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }





  render() {

    const { stateObject } = this.props
    const { auditDataModel } = stateObject.state
    return (<View>

<View style={[AppStyles.alignInRow,AppStyles.marginTop_3,{justifyContent:"center"}]}>
<Caption style={AppStyles.successStatusStyle}>{auditDataModel.RecordStat}</Caption>
<Caption style={AppStyles.successStatusStyle}>{auditDataModel.AuthStat}</Caption>
<Caption style={AppStyles.voiletStatusStyle}>Version {auditDataModel.Version}</Caption>
</View>
  
  <Card style={AppStyles.marginTop_2}>
    <Card.Content>
    <Subheading>{auditDataModel.MakerName}</Subheading>
    <Text style={AppStyles.textColor} >{'Maker'}</Text>
    

    <View style={[AppStyles.dashContainer,AppStyles.marginTop_2]}>
    <Caption style={styles.labelStyle}>{'Date'}</Caption>
    <Text style={styles.valueStyle}>{auditDataModel.MakerDtStamp}</Text>
   </View>

   <View style={[AppStyles.dashContainer,AppStyles.marginTop_2]}>
    <Caption style={styles.labelStyle}>{'Remarks'}</Caption>
    <Text style={styles.valueStyle}>{auditDataModel.MakerRemarks}</Text>
   </View>

    </Card.Content>
  </Card>

  <Card style={AppStyles.marginTop_2}>
    <Card.Content>
    <Subheading>{auditDataModel.CheckerName}</Subheading>
    <Text style={AppStyles.textColor} >{'Checker'}</Text>
    

    <View style={[AppStyles.dashContainer,AppStyles.marginTop_2]}>
    <Caption style={styles.labelStyle}>{'Date'}</Caption>
    <Text style={styles.valueStyle}>{auditDataModel.CheckerDtStamp}</Text>
   </View>

   <View style={[AppStyles.dashContainer,AppStyles.marginTop_2]}>
    <Caption style={styles.labelStyle}>{'Remarks'}</Caption>
    <Text style={styles.valueStyle}>{auditDataModel.CheckerRemarks}</Text>
   </View>

    </Card.Content>
  </Card>





        {/* <View style={[AppStyles.flexDirectionRow]}>
          <Image
            resizeMode="contain"
            source={require("../../asssets/icons/com006.png")}
            style={{ tintColor: UiColor.SUCCESS_COLOR, alignSelf: 'center' }}
          />
          <View style={AppStyles.marginLeft_2}>
            <Title>Maker</Title>
          </View>
        </View>
        <Divider style={AppStyles.marginTop_1} />
        <LabelText
          label={'Id'}
          value={auditDataModel.MakerID}
        />
        <LabelText
          label={'Date'}
          value={auditDataModel.MakerDtStamp}
        />
        <LabelText
          label={'Remarks'}
          value={auditDataModel.MakerRemarks}
        />


        <View style={[AppStyles.flexDirectionRow]}>
          <Image
            resizeMode="contain"
            source={require("../../asssets/icons/com006.png")}
            style={{ tintColor: UiColor.VOILET_COLOR, alignSelf: 'center' }}
          />
          <View style={AppStyles.marginLeft_2}>
            <Title>Checker</Title>
          </View>
        </View>
        <Divider style={AppStyles.marginTop_1} />
        <LabelText
          label={'Id'}
          value={auditDataModel.CheckerID}
        />
        <LabelText
          label={'Date'}
          value={auditDataModel.CheckerDtStamp}
        />
        <LabelText
          label={'Remarks'}
          value={auditDataModel.CheckerRemarks}
        />


        <View style={[AppStyles.flexDirectionRow]}>
          <Image
            resizeMode="contain"
            source={require("../../asssets/icons/com006.png")}
            style={{ tintColor: UiColor.ERROR_COLOR, alignSelf: 'center' }}
          />
          <View style={AppStyles.marginLeft_2}>
            <Title>Status</Title>
          </View>
        </View>
        <Divider style={AppStyles.marginTop_1} />
        <LabelText
          label={'Record'}
          value={auditDataModel.RecordStat}
        />
        <LabelText
          label={'Authorized'}
          value={auditDataModel.AuthStat}
        />
        <LabelText
          label={'Version'}
          value={auditDataModel.Version}
        /> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  valueStyle:{
    color:UiColor.BLACK
  },

  labelStyle: {
    color:UiColor.LIGHT_TEXT_COLOR
  },
})
export default AuditDetail;
