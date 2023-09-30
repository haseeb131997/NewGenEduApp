
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
import {  StyleSheet } from 'react-native';
import { Portal, FAB } from 'react-native-paper';
import { UiColor } from "../../theme";
//import { SpeedDial } from 'react-native-elements';
import ScreenUtils from "../../utils/ScreenUtils";
import SubScreenUtils from "../../utils/SubScreenUtils";
import ScreenContents from "../../utils/ScreenContents";
import NewOperation from "../../utils/NewOperation";


const onlyDiscard = ['StudentTimeTableSummary', 'StudentAttendanceSummary', 'StudentAssignmentSummary', 'StudentOtherActivitySummary', 'StudentFeeManagementSummary', 'StudentStudyMaterialSummary', 'StudentSoftSkillSummary', 'StudentProgressCardSummary', 'StudentExamScheduleSummary', 'StudentNotificationSummary', 'StudentECircularSummary','StudentNotesSummary','StudentPaymentSummary','StudentLessonPlannerSummary','NewStudentAssignmentSummary']

class SpeedDailMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      open: false
    }
    this.onCreate = this.onCreate.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onDiscardSearch = this.onDiscardSearch.bind(this)
    
  }




  onStateChange = (status) => {
    this.setState({
      open: status.open
    })
  }


  onCreate() {
    const { stateObject } = this.props
    SubScreenUtils.functions.createNew(stateObject)
    // stateObject.parentStateChange({
    //   currentOperation:'Create',
    //   selectedCreateIndex:0
    // })
  }


  onSearch() {
    const { stateObject } = this.props
    SubScreenUtils.functions.search(stateObject)
  }

  onDiscardSearch() {
    const { stateObject } = this.props
    ScreenUtils.functions.discardSearch(stateObject)
  }


  onClickSaveChanges() {
    const { stateObject, screenType } = this.props;
    stateObject.onOtherSubmit()
  }
  //Rajfix001 starts
  onEditSave() {
    const { stateObject, screenType } = this.props;
     //stateObject.onOtherSubmit()
     NewOperation.functions.edit(stateObject);
     
   }

 
  onAuth() {
   const { stateObject, screenType } = this.props;
    //stateObject.onOtherSubmit()
    NewOperation.functions.Auth(stateObject);
    
  }
  onReject() {
   const { stateObject, screenType } = this.props;
    //stateObject.onOtherSubmit()
    NewOperation.functions.Reject(stateObject);
  }
   //Rajfix001 ends

getFabType()
{

  const { stateObject } = this.props
  if (onlyDiscard.includes(stateObject.state.summaryService)) {
    return  <FAB
    style={styles.SavefabStyle}
    small
    icon= 'arrow-left-circle-outline'
    color={UiColor.WHITE}
    //actions={this.getMenuList()}
    //onStateChange={this.onStateChange}
    onPress={() => {
      console.log('saveFab is pressed');
      this.onDiscardSearch();
    }}
  /> ;
  } 

  if (SubScreenUtils.functions.removeCreateBtn.includes(stateObject.state.serviceName)) {
    return  <FAB
    style={styles.SavefabStyle}
    small
    icon= "magnify"
    color={UiColor.WHITE}
    //actions={this.getMenuList()}
    //onStateChange={this.onStateChange}
    onPress={() => {
      console.log('search is pressed');
      this.onSearch();
    }}
    
  /> ;
  } 
  
  if (stateObject.state.serviceName == 'OnlineMeetingAttendanceService') {
    return  <FAB
    style={styles.SavefabStyle}
    small
    icon= "magnify"
    color={UiColor.WHITE}
    //actions={this.getMenuList()}
    //onStateChange={this.onStateChange}
    onPress={() => {
      console.log('search is pressed');
      this.onSearch();
    }}
    
  /> 
  }  

  
  else if (stateObject.state.serviceName == 'GeneralLevelConfiguration') {
      return  <FAB
      style={styles.SavefabStyle}
      small
      icon= "content-save"
      color={UiColor.WHITE}
      //actions={this.getMenuList()}
      //onStateChange={this.onStateChange}
      onPress={() => {
        console.log('saveFab is pressed');
        this.onClickSaveChanges();
      }}
    /> 
    }  
    else if (stateObject.state.serviceName == 'TeacherTimeTable') {  
      return  <FAB
      style={styles.SavefabStyle}
      small
      icon= "arrow-left-circle-outline"
      color={UiColor.WHITE}
      //actions={this.getMenuList()}
      //onStateChange={this.onStateChange}
      onPress={() => {
        console.log('saveFab is pressed');
        this.onDiscardSearch();
      }}
    /> 

  }
  else
  {
    return 'multiple';
  }

}

  getMenuList() {
    const { stateObject } = this.props


    /*if (!onlyDiscard.includes(stateObject.state.summaryService)) {
      if (stateObject.state.serviceName == 'GeneralLevelConfiguration') {
        return [
          {
            icon: 'content-save',
            // color:UiColor.SKYBLUE,
            label: 'Save Changes',
            onPress: () => this.onClickSaveChanges(),
            // small: false,
            style: { backgroundColor: UiColor.ERROR_COLOR }
          },
        ]
      }
      else if (stateObject.state.serviceName == 'TeacherTimeTable') {
        return [
          {
            icon: 'step-backward',
            // color:UiColor.SKYBLUE,
            label: 'Back',
            onPress: () => this.onDiscardSearch(),
            // small: false,
            style: { backgroundColor: UiColor.ERROR_COLOR }
          },
        ]
      }*/

      //else {
        return  stateObject.state.displayContent == 'summaryResultByFilter' ? [
          {
            icon: 'newspaper-plus',
            // color:UiColor.SKYBLUE,
            label: ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName) != null ? ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName).newButtonText : 'New',
            onPress: () => this.onCreate(),
            // small: false,
            style: { backgroundColor: UiColor.ERROR_COLOR }
          },
          {
            // icon: 'file-search',
            icon: 'magnify',
            label: 'Search',
            // color:UiColor.SKYBLUE,
            onPress: () => this.onSearch(),
            // small: false,
            style: { backgroundColor: UiColor.ERROR_COLOR }
          },
          {
            // icon: 'filter-remove',
            icon: 'magnify-minus-outline',
            // color:UiColor.SKYBLUE,
            label: 'Discard search',
            onPress: () => this.onDiscardSearch(),
            // small: false,
            style: { backgroundColor: UiColor.ERROR_COLOR }
          },
        ] : [
          {
            icon: 'newspaper-plus',
            // color:UiColor.SKYBLUE,
            label: ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName) != null ? ScreenContents.functions.getScreenBtnName(stateObject.state.serviceName).newButtonText : 'New',
            onPress: () => this.onCreate(),
            // small: false,
            style: { backgroundColor: UiColor.ERROR_COLOR }
          },
          {
            // icon: 'file-search',
            icon: 'magnify',
            label: 'Search',
            // color:UiColor.SKYBLUE,
            onPress: () => this.onSearch(),
            // small: false,
            style: { backgroundColor: UiColor.ERROR_COLOR }
          },
         
        ]
      //}

    //}
    /*else {
      return [
        {
          icon: 'step-backward',
          // color:UiColor.SKYBLUE,
          label: 'Back',
          onPress: () => this.onDiscardSearch(),
          // small: false,
          style: { backgroundColor: UiColor.ERROR_COLOR }
        },
      ]
    }*/

  }


  render() {
    const { stateObject } = this.props
    console.log('Inside Speed dial menu render',stateObject.state.currentOperation);
    return (
      <Portal>
        { //Rajfix001 starts
        }
        {stateObject.state.currentOperation!='Modification' &&  stateObject.state.currentOperation!='Authorisation'?
        
        this.getFabType()=='multiple'?

        <FAB.Group
          theme={{
            dark: true,
            colors: {
              text: UiColor.ERROR_COLOR
            }
          }}
          open={this.state.open}
          icon={this.state.open ? 'close' : 'microsoft-xbox-controller-menu'}
          fabStyle={styles.fabStyle}
          color={UiColor.WHITE}
          actions={this.getMenuList()}
          onStateChange={this.onStateChange}
          onPress={() => {
            if (this.state.open) {
              // do something if the speed dial is open
            }
          }}
        /> 
        :
        this.getFabType()
         

        : (stateObject.state.currentOperation =='Modification'  &&!stateObject.state.showComplete?
        <FAB
       /*  theme={{
          dark: true,
          colors: {
            text: UiColor.ERROR_COLOR
          }
        }}*/
       // open={this.state.open}
        //icon={this.state.open ? 'close' : 'microsoft-xbox-controller-menu'}

        style={styles.SavefabStyle}
        small
        icon= "content-save"
       
        color={UiColor.WHITE}
        //actions={this.getMenuList()}
        //onStateChange={this.onStateChange}
        onPress={() => {
          console.log('saveFab is pressed');
          this.onEditSave();
        }}
      /> : stateObject.state.currentOperation =='Authorisation' && !stateObject.state.showComplete?
      
      <FAB.Group
          theme={{
            dark: true,
            colors: {
              text: UiColor.ERROR_COLOR
            }
          }}
          open={this.state.open}
          icon={this.state.open ? 'close' : 'microsoft-xbox-controller-menu'}
          fabStyle={styles.fabStyle}
          color={UiColor.WHITE}
          actions={[
            {
              icon: 'sticker-check-outline',
              // color:UiColor.SKYBLUE,
              label: 'Approve',
              
              onPress: () => this.onAuth(),
              // small: false,
              style: { backgroundColor: UiColor.ERROR_COLOR }
            },
            {
              icon: 'sticker-remove-outline',
              // color:UiColor.SKYBLUE,
              label: 'Reject',
              onPress: () => this.onReject(),
              // small: false,
              style: { backgroundColor: UiColor.ERROR_COLOR }
            },
          ]}
          onStateChange={this.onStateChange}
          onPress={() => {
            if (this.state.open) {
              // do something if the speed dial is open
            }
          }}
        /> :null

      )
      }
      { //Rajfix001 Ends
        }
      </Portal>
    );
  }
}


const styles = StyleSheet.create({
  fabStyle: {
    backgroundColor: "#3B4FB6"
  },
  SavefabStyle:{
    backgroundColor: "#3B4FB6",
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
  }


})

export default SpeedDailMenu



