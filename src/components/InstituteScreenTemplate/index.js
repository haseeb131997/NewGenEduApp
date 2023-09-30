
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


import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Modal, Portal, Title, Subheading, Card, Divider, Caption } from 'react-native-paper';
import { w, h } from "../../utils/Dimensions";
import AppStyles from '../../AppStyles/AppStyles';
import { UiColor } from "../../theme";
import { ScrollView } from 'react-native-gesture-handler';
import AlertBox from '../../components/AlertBox';
import AppHeader from "../../components/AppHeader";
import AuditDetail from '../../components/AuditDetail';
import InstituteScreenHeader from '../../components/InstituteScreenHeader';
import AuditModal from '../../components/AuditModal';
import Spinner from '../../components/Loader';
import HeaderTooltipModal from '../../components/HeaderTooltipModal';
import SpeedDailMenu from '../../components/SpeedDailMenu';
import CustomButtons from '../../components/CustomButtons';














class InstituteScreenTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }

  }


  closeAuditDetail (){
    const { stateObject} = this.props
    stateObject.parentStateChange({
      auditModalVisible : false
    })

  }


  onClickSaveChanges(){
    const {stateObject,screenType} = this.props;
    if(screenType =='others'){
      stateObject.onOtherSubmit()
    }
  }





  render() {
    const { stateObject, general ,  other,
      subject,
      fee,screenType,title,autoApproval} = this.props
    return (
      <View style={AppStyles.subScreenContainer}>
        <AppHeader
          stateObject={stateObject}
        />

 {screenType == 'others' && <View>
          <SpeedDailMenu
            stateObject={stateObject}
          />
        </View>}

        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={AppStyles.container}>
            <InstituteScreenHeader
              screenType={screenType}
              stateObject={stateObject}
              // title={stateObject.state.dataModel.instituteName}
              title={title}
              breadcrumb={stateObject.state.breadcrumb}
              intialFetching={stateObject.state.intialFetching}
            /> 
          </View>

         {!stateObject.state.intialFetching  && <View style={[AppStyles.marginHorizontal_2,AppStyles.marginBottom_2]}>

           {/* {stateObject.state.selectedTabIndex == 2  && general} */}
        
          {/* {stateObject.state.selectedTabIndex == 0  && subject} */}
      
    
      {/* {stateObject.state.selectedTabIndex == 1 && fee} */}

      
      {/* {stateObject.state.selectedTabIndex == 3 && other} */}

          {screenType == 'logo' && general}
        
          {screenType == 'subject' && subject}
      
    
          {screenType == 'fee' && fee}
  
          
          {screenType == 'others' && other}

          {screenType == 'autoApproval' && autoApproval}

  
          </View>}

          {(screenType =='others') && 
               <View style={[AppStyles.alignItems, AppStyles.marginTop_2,]}>
          <CustomButtons
          onPress={() => this.onClickSaveChanges()}
          title="Save changes"
          buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
    
        />
        <View style={AppStyles.marginTop_2}/>
        
        </View>
        
        }
        </ScrollView>
        {/* <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} /> */}
        <AlertBox
          stateObject={stateObject}
        />
        {stateObject.state.isLoading &&
          <Spinner loading={stateObject.state.isLoading} />}

        <AuditModal
          templates={<AuditDetail stateObject={stateObject} />}
          stateObject={stateObject}
          title={'Audit'}
          subTitle={''}
          onSubmit={() => this.openAuditDetail()}
        />

<HeaderTooltipModal
          stateObject={stateObject}
        />

      </View>
    );
  }
}


const styles = StyleSheet.create({

})

export default InstituteScreenTemplate



