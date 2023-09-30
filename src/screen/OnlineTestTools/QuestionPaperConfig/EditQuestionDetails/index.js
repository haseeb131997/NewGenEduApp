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
import { View, StyleSheet } from 'react-native';

import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import SelectListUtils from '../../../../utils/SelectListUtils'
import InputTextArea from '../../../../components/InputTextArea';
import ImpNotes from '../../../../components/ImpNotes';
import { UiColor } from "../../../../theme";
import CustomButtons from '../../../../components/CustomButtons';
import AppStyles from "../../../../AppStyles/AppStyles";
import ImageDocumentView from '../../../../components/ImageDocumentView';
import UploadUtils from '../../../../utils/UploadUtils'



var uploadClickProcess = false



class EditQuestionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }

    this.uploadDocument = this.uploadDocument.bind(this)
  }

  uploadDocument = async (stateObject)=>{
    if (uploadClickProcess == false) {
      uploadClickProcess = true
    }
    else {
      return true
    }
    try{
   await UploadUtils.functions.documentUpload(stateObject, 'questionImg', 0)
    uploadClickProcess = false
    }
    catch(error){
      uploadClickProcess = false
      throw error
    }
  }







  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField, questionDetailsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

    return (
      <View>
        <NewScreenDropDownPicker
          // editable={editable}
          required={true}
          label={'Question Type'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.QuestionType}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.QuestionType, questionDetailsEmptyrecord.questionType)}
          placeholder="Select question type"
          onChangeValue={(value) => {
            questionDetailsEmptyrecord.questionType = value;
            parentStateChange({ questionDetailsEmptyrecord: questionDetailsEmptyrecord })
          }}
          dropdownName={'questionTypeDropdown'}
          subHeadingRecordName="a question type"
          onClear={() => {
            questionDetailsEmptyrecord.questionType = '';
            parentStateChange({ questionDetailsEmptyrecord: questionDetailsEmptyrecord })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', questionDetailsEmptyrecord.questionType, errorField, [], 'Question Type')}
        />


       {questionDetailsEmptyrecord.questionType != '' && <InputTextArea
          required={true}
          label={questionDetailsEmptyrecord.questionType == 'S' ? 'Question' : 'Comprehension Passage' }
          secureTextEntry={false}
          value={questionDetailsEmptyrecord.question}
          placeholder={questionDetailsEmptyrecord.questionType == 'S' ? 'Teacher can enter question to student here ...': 'Enter comprehensive passage'}
          onChangeText={text => {
            questionDetailsEmptyrecord.question = text
            parentStateChange({ questionDetailsEmptyrecord: questionDetailsEmptyrecord })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', questionDetailsEmptyrecord.question, errorField, [], questionDetailsEmptyrecord.questionType == 'S' ? 'Question' : 'Comprehension Passage')}
        />}

       {questionDetailsEmptyrecord.questionType == 'S' && <View>
       <InputText
          required={true}
          label={'Positive Mark'}
          keyboardType='numeric'
          secureTextEntry={false}
          onChangeText={text => {
            questionDetailsEmptyrecord.positiveMark = text
            parentStateChange({ questionDetailsEmptyrecord: questionDetailsEmptyrecord })
          }}
          value={questionDetailsEmptyrecord.positiveMark}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', questionDetailsEmptyrecord.positiveMark, errorField, [], 'Positive Mark')}
        />

        <InputText
          required={true}
          label={'Negative Mark'}
          keyboardType='numeric'
          secureTextEntry={false}
          onChangeText={text => {
            questionDetailsEmptyrecord.negativeMark = text
            parentStateChange({ questionDetailsEmptyrecord: questionDetailsEmptyrecord })
          }}
          value={questionDetailsEmptyrecord.negativeMark}
          errorMessage={GeneralUtils.functions.getErrorMessage('field4', questionDetailsEmptyrecord.negativeMark, errorField, [], 'Negative Mark')}
        />
       </View>}

      {questionDetailsEmptyrecord.questionType == 'C' && <View style={[AppStyles.flex_start,AppStyles.marginBottom_2]}>
          <CustomButtons
            onPress={() => this.addQuestion(stateObject)}
            title="Add Question"
            // titleStyle={AppStyles.signInTextStyle}
            buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
          />
        </View>}

       <View style={AppStyles.flex_End}>
          <CustomButtons
            onPress={() => this.uploadDocument(stateObject)}
            title="Choose file"
            // titleStyle={AppStyles.signInTextStyle}
            buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
          />
        </View>

        <ImageDocumentView
          openDocument={() => GeneralUtils.functions.openDocument(stateObject,questionDetailsEmptyrecord.imagePath)}
          value={questionDetailsEmptyrecord.imagePath} 
          stateObject={stateObject}
          fileName={GeneralUtils.functions.getFileName(questionDetailsEmptyrecord.imagePath)}
          fileType={GeneralUtils.functions.getFileType(questionDetailsEmptyrecord.imagePath)}
        />
     

        {(questionDetailsEmptyrecord.imagePath == '') && <ImpNotes
          isArray={false}
          message={`Click 'Choose file' button to upload image related to Question. You can upload only 1 file. File size can be upto 10 GB. Only '.png','.jpg' and '.jpeg' files can be uploaded.`}
        />}






      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default EditQuestionDetails;

