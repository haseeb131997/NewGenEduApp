
import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native';
import { TextInput, Card, Text, Avatar } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SearchUtils from "../../../../utils/SearchUtils";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import ExamSuggestion from '../../../../components/ExamSuggestion';






class ClassExamScheduleFilter extends Component {
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
    const { summaryDataModel,editable } = stateObject.state
    const { parentStateChange } = stateObject
    return (<View style={[AppStyles.margin_1,Platform.OS === 'ios' && AppStyles.zIndex_1000]}>   

    <ExamSuggestion
        required={false}
        editable={true}
        stateObject= {stateObject} 
        classCode={"class"} 
        classDescription="classDesc" 
        examID='exam'
        examDescription='examDescription'
        compType='Filter'
        />    

     {/*   <FilterSuggestionTextInput
          required={false}
          editable={editable}
           label={'Class'}
           placeholder={'Select class'}
           secureTextEntry={false}
           value={summaryDataModel.filter.class}
          onFocus={()=>  
            { 
            //  if(summaryDataModel.filter.Class == null || summaryDataModel.filter.Class == '' ){
               SearchUtils.functions.launchSuggestion(stateObject,'', 'class')
            //  }
           }  
          }
          onClear={()=> { 
            summaryDataModel.filter.class = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
           }}
        />
         <View>
        <CustomDropDownPicker
          // required={true}
          label={'Exam'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.ExamMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ExamMaster, summaryDataModel.filter.exam)}
          placeholder="Select Exam"
          onChangeValue={(value) => {
            summaryDataModel.filter.exam = value;
            parentStateChange({ summaryDataModel: summaryDataModel })

          }}
          dropdownName={'examDropdown'} 
          subHeadingRecordName = "an exam"
          onClear={() => {
            summaryDataModel.filter.exam= '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />
        </View> */}

         <View style={AppStyles.marginTop_2}>
          <CustomDropDownPicker
            stateObject={stateObject}
            label={'Select Approval status'}
            items={SelectListUtils.functions.selectMaster.AuthStatusMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AuthStatusMaster, summaryDataModel.filter.authStat)}
            placeholder="Select Approval status"
            onChangeValue={(value) => {
              summaryDataModel.filter.authStat = value;
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
            dropdownName={'authDropdown'} 
            subHeadingRecordName = "an approval status"
            onClear={() => {
              summaryDataModel.filter.authStat= '';
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
          />
          </View>
         {/* <SuggestionList
           stateObject={stateObject}
           searchFieldName={stateObject.state.searchFieldName}
           searchText={stateObject.state.searchText}
           visible={stateObject.state.seachVisible}
           searchName={'classSummaryDataModel1'}
           colHeading={['Class', 'Desc','Year/Standard','Major/Section']}
           mapping={['classCode', 'classDesc','standard','section']}
           SuggestionHeading={'Class'}
          />*/}
     </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default ClassExamScheduleFilter;

