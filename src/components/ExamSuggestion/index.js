
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
import { View, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
//import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../AppStyles/AppStyles";
import FilterSuggestionTextInput from '../../components/FilterSuggestionTextInput';
import SuggestionTextInput from '../../components/SuggestionTextInput';
import SuggestionList from '../../components/SuggestionList';
import SearchUtils from "../../utils/SearchUtils";
//import GeneralUtils from "../../utils/GeneralUtils";
import {  Text,Caption} from 'react-native-paper';
import { UiColor } from '../../theme';
import { h } from "../../utils/Dimensions";

//import NextPreviousBtn from '../NextPreviousBtn';
//import NewOperation from "../../utils/NewOperation";
//import { ScrollView } from 'react-native-gesture-handler';
//import CustomButtons from '../../components/CustomButtons';
//import SpeedDailMenu from '../../components/SpeedDailMenu';
//import AlertBox from '../../components/AlertBox';
//import Spinner from '../../components/Loader';
//import CompletedScreen from '../../components/CompletedScreen';
//import SubScreenUtils from "../../utils/SubScreenUtils";
//import Paggination from "../../utils/Paggination";

//const height = Dimensions.get("window").height;
//const width = Dimensions.get("window").width;

class ExamSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }




  render() {
    const {
      stateObject, classCode, classDescription, examID,examDescription,compType,errorMessage,editable,required,
    } = this.props
    const { dataModel,summaryDataModel } = stateObject.state
    const { parentStateChange } = stateObject
    //var searchName;
    console.log('Error message inside errorSuggestion',errorMessage)
    /*if(compType=='Report')
    {
      searchName='ExamSearchReport'
    }
    else if(compType=='Filter')
    {
      searchName='ExamSearchFilter'
    }
    else if(compType=='Normal')
    {
      searchName='ExamSearch'
    } */
    return (
      //<View style={[styles.container,AppStyles.margin_1,]}>
      //<View style={AppStyles.flexDirectionRow}>
      <View style={AppStyles.margin_1}>

{ (compType == 'Normal') && 

      <View style={[styles.container,AppStyles.margin_1,styles.marginLeft_1]}>
        
      <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the exam is to be assessed.'}
          // tooltipStyle={styles.tooltipStyle}
          required={required}
          editable={editable}
          label={'Exam'}
          placeholder={'Select Exam'}
          secureTextEntry={false}
          value={dataModel.examDescription}
          onFocus={() => {
           // searchName='ExamSearch'
            //  if(dataModel.class == null || dataModel.class == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'ExamSearch')
            //  }
          }
          }
          onClear={() => {
            dataModel[examID] = '';
            dataModel[examDescription] = '';
            dataModel[classCode] = '';
            dataModel[classDescription] = '';
            parentStateChange({ dataModel: dataModel })
          }}
          errorMessage={errorMessage}
        />
        
      
            
              <Text style={[styles.labelStyle]}>
                Class
                </Text>
               <View style={[styles.inputView, AppStyles.marginTop_1]}>
          
            <TextInput
              autoCapitalize='none'
              value={dataModel[classDescription]==''?'Defaulted by selecting the Exam':dataModel[classDescription]}
              secureTextEntry={false}
              // onChangeText={text => onChangeText(text)}
              style={styles.inputs}
              editable={false}
              //placeholder={placeholder}
              pointerEvents="none"
            />
            </View>
            
       
         
      </View> }

{ (compType == 'Report') && <View>
  
      <FilterSuggestionTextInput
          required={required}
          label={'Exam'}
          editable={!editable}
          placeholder={'Select Exam'}
          secureTextEntry={false}
          value={dataModel.Master[examDescription]}
          onFocus={() => {
            //searchName='ExamSearchReport'
              SearchUtils.functions.launchSuggestion(stateObject, '', 'ExamSearch')
          }
          }
          onClear={() => {
            dataModel.Master[examID] = '';
            dataModel.Master[examDescription] = '';
            dataModel.Master[classCode] = '';
            dataModel.Master[classDescription] = '';
            
            parentStateChange({ dataModel: dataModel })
          }}
          
          errorMessage={errorMessage}

        />
     
      
            
              <Text style={[styles.labelStyle,AppStyles.marginLeft_1]}>
                Class
                </Text>
               <View style={[styles.inputView, AppStyles.marginTop_1]}>
               
            <TextInput
              autoCapitalize='none'
              value={dataModel.Master[classDescription]==''?'Defaulted by selecting the Exam':dataModel.Master[classDescription]}
              secureTextEntry={false}
              // onChangeText={text => onChangeText(text)}
              style={styles.inputs}
              editable={false}
              //placeholder={placeholder}
              pointerEvents="none"
            />
            </View>
            
       {/* <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={searchName}
          colHeading={['Exam','Class Desc','Start Date','End Date']}
          mapping={['examDescription','classDescription','startDate','endDate']}
          SuggestionHeading={'Exam'}
         
        /> */}
         
      </View> }
      { (compType == 'Filter') && <View style={[styles.container,AppStyles.margin_1,styles.marginLeft_1] }>
       
      <FilterSuggestionTextInput
          //tooltipReq={true}
          //tooltipMsg={'Mention the exam is to be assessed.'}
          // tooltipStyle={styles.tooltipStyle}
          applyLeftStyle={false}
          required={required}
          editable={!editable}
          label={'Exam'}
          placeholder={'Select Exam'}
          secureTextEntry={false}
          value={summaryDataModel.filter[examDescription]}
          onFocus={() => {
            //searchName='ExamSearchFilter'
            //  if(dataModel.class == null || dataModel.class == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'ExamSearch')
            //  }
          }
          }
          onClear={() => {
            summaryDataModel.filter[examID] = '';
            summaryDataModel.filter[examDescription] = '';
            summaryDataModel.filter[classCode] = '';
            summaryDataModel.filter[classDescription] = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          errorMessage={errorMessage}
        />
        
      
            
              <Text style={[styles.labelStyle]}>
                Class
                </Text>
               <View style={[styles.inputView, AppStyles.marginTop_1]}>
          {console.log('classDescription',summaryDataModel.filter[classDescription])}
         
            <TextInput
              autoCapitalize='none'
              value={summaryDataModel.filter[classDescription]==''?'Defaulted by selecting the Exam':summaryDataModel.filter[classDescription]}
              secureTextEntry={false}
              // onChangeText={text => onChangeText(text)}
              style={styles.inputs}
              editable={false}
              //placeholder={placeholder}
              pointerEvents="none"
            />
            </View>
            
       
         
      </View> }

      
      <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={compType=='Report'?'ExamSearchReport':compType=='Filter'?'ExamSearchFilter':'ExamSearch'}
          colHeading={['Exam','Class Desc','Start Date','End Date']}
          mapping={['examDescription','classDescription','startDate','endDate']}
          SuggestionHeading={'Exam'}
         
        />
      </View>
      //</View>
    );
  }
}


const styles = StyleSheet.create({
  marginLeft_1: {
    marginLeft: h('0%')
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
 inputs: {
    flex: 1,
    color: UiColor.DRAK_GRAY_COLOR,
   paddingHorizontal: 5,

  },
  inputView: {
    width: '100%',
    height: h('6%'),
    backgroundColor: UiColor.WHITE,
    borderRadius: 6,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  labelStyle: {
    // marginLeft:h('1%'),
    fontWeight: '400'
  },

})

export default ExamSuggestion



