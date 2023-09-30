

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

/* * * Change Tag:SHA02
Change Desc: make a Standard Search for institute report
Changed By : Shashank
Date:07-12-2020 
*/

/* * * Change Tag: NEAI2-47
Change Desc: Add new feature "Study Material"
Changed By : Shashank
Date:16-06-2021 
*/

/* * * Change Tag: NEAI2-66
Change Desc: Add new feature "Student Notes"
Changed By : Shashank
Date:16-06-2021 
*/

/* * * Change Tag: SHA120821
Change Desc: one standard missing 
Changed By : Shashank
Date:12-08-2021 
*/

/* * * Change Tag: SHA060921
Change Desc: same parameter used for student and teacher in online video classroom and online staff meeting
Changed By : Shashank
Date:06-09-2021 
*/

/* * * Change Tag: SHA090921
Change Desc: new suggestion add "QuestionPaperSearchService"
Changed By : Shashank
Date:09-09-2021 
*/

/* * * Change Tag:3.0 UI/UX
Change Desc: vesrion 3 changes 
Changed By : Shashank
Date:17-09-2021 
*/

import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, TextInput } from 'react-native';
import { w, h, totalSize } from "../../utils/Dimensions";
import { Card, Text, Portal, Divider, Searchbar, Modal, Subheading, Title } from 'react-native-paper';
import SearchUtils from "../../utils/SearchUtils";
import apiCall from "../../ApiCall/ActionApi";
import AppStyles from "../../AppStyles/AppStyles";
import { UiColor } from '../../theme';
import Entypo from 'react-native-vector-icons/Entypo';




const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

var tempArray = new Map()
var standardService = []

class SuggestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      query: '',
      searchValue: "",
      listStatus: false
    }
    this.searchTemplate = this.searchTemplate.bind(this)
    this.onResultClick = this.onResultClick.bind(this)
  }

  componentDidMount() {
    const { searchText } = this.props
    apiCall.functions.searchDataModel = {
      searchFilter: "",
      searchResults: []
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     searchValue: nextProps.searchText
  //   })
  // }





  onResultClick(item, searchName) {
    const { stateObject, postSuggestionListresultClick } = this.props
    //console.log(searchName,'searchName')
    switch (searchName) {
      case 'student':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.studentName = item.StudentName
        dummyModel.filter.studentID = item.StudentId
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'teacher':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.teacherName = item.TeacherName
        dummyModel.filter.teacherID = item.TeacherId
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'report':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.Master.studentName = item.StudentName
        dummyModel.Master.studentID = item.StudentId
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'teacherReport':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.Master.teacherName = item.TeacherName
        dummyModel.Master.teacherID = item.TeacherId
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'instituteReport':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.Master.instituteName = item.instituteName
        dummyModel.Master.instituteID = item.instituteID
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'classReport':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.Master.class = item.classCode
        // dummyModel.Master.stdSec = `${item.standard}/${item.section}`
        // dummyModel.Master.classCode = item.classCode
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'classReport1':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.Master.class = `${item.standard}/${item.section}`
        dummyModel.Master.stdSec = `${item.standard}/${item.section}`
        dummyModel.Master.classCode = item.classCode
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'standard':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.Master.class = item.standard
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      // starts  NEAI2-47
      case 'standardDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.standard = item.standard
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'standardSummaryDataModel':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.standard = item.standard
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      // ends NEAI2-47
      case 'feesReport':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.Master.feeID = item.feeID
        dummyModel.Master.feeDescription = item.feeDescription
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      // starts NEAI2-153
      case 'feeDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.feeID = item.feeID
        dummyModel.feeDescription = item.feeDescription
        dummyModel.amount = item.amount
        dummyModel.feeDueDate = item.feeDueDate
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
        case 'feeStatus':
          var dummyModel = Object.assign({}, stateObject.state.dataModel);
          dummyModel.feeStatus = item.feeStatus
          //dummyModel.feeDescription = item.feeDescription
          //dummyModel.amount = item.amount
          //dummyModel.feeDueDate = item.feeDueDate
          stateObject.parentStateChange({
            dataModel: dummyModel,
            seachVisible: false
          })
          break


      // ends NEAI2-153    
      case 'groupId':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.groupID = item.groupID
        dummyModel.groupDesc = item.groupDescription
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      // starts
      case 'classGroupDatamodel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.class = item.groupID
        dummyModel.description = item.groupDescription
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      // ends
      case 'groupId1':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.groupID = item.groupID
        dummyModel.groupDescription = item.groupDescription
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'assigneeDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.assignee = item.groupID
        dummyModel.groupDesc = item.groupDescription
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'assigneeId':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.assignee = item.groupID
        dummyModel.filter.groupDesc = item.groupDescription
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
        case 'groupId2':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.groupID = item.groupID
        dummyModel.filter.groupDesc = item.groupDescription
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'classGroupSummaryDatamodel':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.class = item.groupID
        // dummyModel.filter.groupDesc = item.groupDescription
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'assigneeIdSummaryDataModel':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.assignee = item.groupID
        dummyModel.filter.assigneedesc = item.groupDescription
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'ReadOnly':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.studentName = item.StudentName
        dummyModel.studentID = item.StudentId
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'TeacherDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.teacherName = item.TeacherName
        dummyModel.teacherID = item.TeacherId
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      // starts SHA060921
      case 'StudentTeacherDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.studentName = item.TeacherName
        dummyModel.studentID = item.TeacherId
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'studentTeacherfilter':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.studentName = item.TeacherName
        dummyModel.filter.studentID = item.TeacherId
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      // ends SHA060921
      case 'circularID':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.circularID = item.ECircularID
        dummyModel.filter.circularDescription = item.ECircularDescription
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'InstituteDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.instituteID = item.instituteID
        dummyModel.instituteName = item.instituteName
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'roleDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.roleID = item.roleID
        dummyModel.roleDescription = item.roleDescription
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'roleSummaryDataModel':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.roleID = item.roleID
        dummyModel.filter.roleDescription = item.roleDescription
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
      case 'users':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.userID = item.userID
        dummyModel.filter.userName = item.userName
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'classSummaryDataModel':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.Class = item.classCode
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'classSummaryDataModel1':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.class = item.classCode
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'classSummaryDataModel2':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.classCode = item.classCode
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      // start NEAI2-66
      case 'classIdSummaryDataModel':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.classID = item.classCode
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      // end NEAI2-66
      case 'classDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.class = item.classCode
        dummyModel.classDesc = item.classDesc
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      // start NEAI2-66
      case 'classDataModel1':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.class = item.classCode
        dummyModel.classDescription = item.classDesc
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'classIdDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.classID = item.classCode
        dummyModel.classDescription = item.classDesc
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      // // end NEAI2-66
      case 'classCodeDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.classCode = item.classCode
        dummyModel.classDesc = item.classDesc
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'generalClassDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.general.class = item.classCode
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      case 'templateDataModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.templateDescription = item.templateDescription
        dummyModel.templateID = item.templateID
        dummyModel.bodyTemplate = item.bodyTemplate
        dummyModel.notificationType = item.messageType
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break
      // starts SHA090921
      case 'questionPaperFiler':
        var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
        dummyModel.filter.description = item.description
        dummyModel.filter.questionPaperId = item.questionPaperId
        stateObject.parentStateChange({
          summaryDataModel: dummyModel,
          seachVisible: false
        })
        break
      // ends SHA090921

      case 'TimeZoneModel':
        var dummyModel = Object.assign({}, stateObject.state.dataModel);
        dummyModel.timezone = item.value
        stateObject.parentStateChange({
          dataModel: dummyModel,
          seachVisible: false
        })
        break

        case 'CountryModel':
          var dummyModel = Object.assign({}, stateObject.state.dataModel);
          dummyModel.countryCode = item.value
          stateObject.parentStateChange({
            dataModel: dummyModel,
            seachVisible: false
          })
          break
          case 'ExamSearch':
            var dummyModel = Object.assign({}, stateObject.state.dataModel);
            dummyModel.exam = item.examID
            dummyModel.examDescription = item.examDescription
           // dummyModel.class = item.examID
           dummyModel.class = item.classID
           if("classDescription" in dummyModel)
           dummyModel.classDescription = item.classDescription
           else
           dummyModel.classDesc = item.classDescription
            
            stateObject.parentStateChange({
              dataModel: dummyModel,
              seachVisible: false
            })
            break
            case 'ExamSearchReport':
              var dummyModel = Object.assign({}, stateObject.state.dataModel);
              dummyModel.Master.exam = item.examID
              dummyModel.Master.examDescription = item.examDescription
              dummyModel.Master.classCode = item.classID
              dummyModel.Master.classDescription = item.classDescription
              stateObject.parentStateChange({
                dataModel: dummyModel,
                seachVisible: false
              })
              break 
              case 'ExamSearchFilter':
              var dummyModel = Object.assign({}, stateObject.state.summaryDataModel);
              dummyModel.filter.exam = item.examID
              dummyModel.filter.examDescription = item.examDescription
              dummyModel.filter.class = item.classID
              if("classDescription" in dummyModel)
                dummyModel.filter.classDescription = item.classDescription
               else
                dummyModel.filter.classDesc = item.classDescription
                console.log('classDescription inside search click',dummyModel.filter.classDescription)
                console.log('classDescription inside search click',dummyModel.filter.classDesc)
              //dummyModel.filter.classDescription = item.classDescription
              stateObject.parentStateChange({
                summaryDataModel: dummyModel,
                seachVisible: false
              })
              break    
      case 'teacherPostSuggestion':
        postSuggestionListresultClick(item)
        break
      case 'studentPostSuggestion':
        postSuggestionListresultClick(item)
        break
      case 'rolePostSuggestion':
        postSuggestionListresultClick(item)
        break
      case 'institutePostSuggestion':
        postSuggestionListresultClick(item)
        break
      case 'classPostSuggestion':
        postSuggestionListresultClick(item)
        break

    }
    SearchUtils.functions.clearSearchResult(stateObject)
  }


  searchTemplate(filterData, searchName) {
    const { colHeading, mapping, stateObject } = this.props
    var widths = colHeading.length > 2 ? { width: w('20%') } : { width: '45%' }
    return (<View >
      <View style={[styles.rowStyle,]}>
        {colHeading.map((headingData, index) => (
          <Subheading key={index + 'textHeading'} style={[styles.colTextStyle, styles.textBold, widths]}>{headingData}</Subheading>
        ))
        }
      </View>
      <Divider style={styles.separatorStyle} />
      {filterData &&
        <View style={styles.flatListContainer}>
          <FlatList
            keyboardShouldPersistTaps='handled'

            data={filterData}
            bounces={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index + 'touchable'}
                onPress={() => this.onResultClick(item, searchName)}
              >
                <View key={index + 'View'} style={styles.rowStyle}>
                  {mapping.map((colkey, index1) => (
                    <Subheading key={index1 + 'text'} style={[styles.colTextStyle, widths]}>{item[colkey]}</Subheading>
                  ))}
                </View>
                <Divider style={styles.separatorStyle} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          // extraData={selected}
          //  ListEmptyComponent={<View style={{}}><Text>empty</Text></View>}
          />
        </View>
      }
    </View>)

  }




  switchRender(searchName) {
    const { mapping,stateObject} = this.props

    const { searchValue } = this.state
    var filterData = []
    var i = 0
    var list
    // starts 3.0 UI/UX
    var classObject = {
      classCode: "ALL",
classDesc: "ALL",
section: "ALL",
standard: "ALL",
    }
    var tempClassArray  = []
    // end 3.0 UI/UX
    try {
      if (searchName == 'standard' || searchName == 'standardDataModel' || searchName == 'standardSummaryDataModel') {
        if (standardService.length == 0) {
          for (var i = 0; i < apiCall.functions.searchDataModel.searchResults.length; i++) {
            tempArray.set(apiCall.functions.searchDataModel.searchResults[i].standard)
          }
          for (let [key, value] of tempArray.entries()) {
            standardService.push({
              standard: key
            })
          }
        }

        list = standardService
        // end SHA02
      }
      else {
        // starts 3.0 UI/UX
        // list = apiCall.functions.searchDataModel.searchResults;
        try{
           if(stateObject.state.serviceName == 'HolidayMaintenance' && searchName == "classCodeDataModel" ){
             if(apiCall.functions.searchDataModel.searchResults[0].classCode != "ALL"){
              apiCall.functions.searchDataModel.searchResults.unshift(classObject)
             }
            tempClassArray = apiCall.functions.searchDataModel.searchResults
            list = tempClassArray;
           }
           else{
            list = apiCall.functions.searchDataModel.searchResults;
           }
        }
        catch (err) {
          list = apiCall.functions.searchDataModel.searchResults;
        }
        // ends 3.0 UI/UX
    
      }
    } catch (err) {
      list = null
    }
    if (list != null && list.length != 0) {
      if (searchValue != '') {
        for (let rowData of list) {
          for (let colkey of mapping) {
            if (rowData[colkey].toLowerCase().includes(searchValue.toLowerCase())) {
              filterData[i] = rowData;
              i++;
              break;
            }
          }
        }
      }
      else {
        filterData = list
      }
      return (this.searchTemplate(filterData, searchName))
    }
    else
      return null

  }

  render() {
    const { query } = this.state
    const {
      title,
      searchName,
      searchFieldName,
      visible,
      searchText,
      stateObject,
      SuggestionHeading
    } = this.props
    return (<Portal>
      <Modal visible={visible}
        onDismiss={() => SearchUtils.functions.clearSearchResult(stateObject)}
      >

        <View style={styles.container}>
          <Card.Content>
          <View style={[AppStyles.row_space_between, AppStyles.marginVertical_1, AppStyles.alignItems]}>
            <Subheading>{SuggestionHeading} Suggestion</Subheading>
            <View>
            </View>
            <TouchableOpacity onPress={() => SearchUtils.functions.clearSearchResult(stateObject)}>
              <Image resizeMode='contain' style={AppStyles.crossIcon}
                source={require('../../asssets/icons/arr061.png')}
              /></TouchableOpacity>
          </View>
          </Card.Content>

        

          <View
            style={[styles.inputView, AppStyles.marginTop_1]}>
            <View
              style={AppStyles.width85}>
              <TextInput
                autoFocus={true}
                placeholder="Search"
                onChangeText={(text) => this.setState({
                  searchValue: text
                })}
                value={this.state.searchValue}
                style={styles.inputs}
              />
            </View>
            {/* <View style={[{alignItems:'flex-end',width:'20%',justifyContent:'space-around'}]}>
             <Entypo
                onPress={()=> console.log(';')}
              name={"cross"} size={AppStyles.iconSize.height} color={UiColor.LIGHT_TEXT_COLOR} />
          </View> */}
          </View>
          {this.switchRender(searchName)}
        </View>
      </Modal>
    </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //  height: '100%', width: '100%', backgroundColor: '#fff'
    backgroundColor: UiColor.WHITE,
    margin: h('3%'),
    padding: h('1%'),
    height: height - h('25%'),
  },
  postionStlye: {
    width: w(90),
    position: 'absolute',
    zIndex: 9999,
  },
  colHeadingContainer: {
    padding: h(1),
    flex: 1,
    justifyContent: 'space-between'
  },
  headdingcolTextStyle: {
    fontSize: h(2.5),
    // fontWeight: 'bold',
    width: w(20),
    textAlign: 'center'
  },
  colTextStyle: {
    // fontSize: h(2.5),
    // fontWeight: 'bold',
    // width: w(22),
    // width: '45%',
    // backgroundColor:"yellow",

    textAlign: 'center',

  },
  textBold: {
    fontWeight: 'bold',
    color: UiColor.SKYBLUE
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: h('1%')
  },
  separatorStyle: {
    width: '95%',
    alignSelf: "center",
    marginVertical: h(.5)
  },
  inputs: {
    flex: 1,
    color: UiColor.DRAK_GRAY_COLOR,
    paddingHorizontal: 10,

  },
  inputView: {
    width: '100%',
    height: h('6%'),
    backgroundColor: UiColor.APP_BACKGROUND,
    borderRadius: 6,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  flatListContainer:{
    height: height - h('55%')
  }

})
export default SuggestionList;
