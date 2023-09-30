
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import CustomVideo from '../../../../components/CustomVideo';
import CustomYouTubeVideo from '../../../../components/CustomYouTubeVideo';
import StudentSerachBox from '../../../../components/StudentSerachBox';



var showResults = []

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
      searchQuery:''
    }
  }

  onChangeSearch(text){
    this.setState({
     searchQuery:text
    }) 
   }





  render() {
    const { stateObject } = this.props;
    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)
    var mapping=['subjectName','assignmentDescription','teacherComments','url']

    showResults = GeneralUtils.functions.studentSerachFilter(stateObject, GeneralUtils.functions.getSummaryResult(stateObject),mapping,this.state.searchQuery)
  
    

    return (
      <View>
        <StudentSerachBox
    searchQuery={this.state.itemsearchQuery}
    stateObject={stateObject}
    onChangeSearch={(text)=> this.onChangeSearch(text)}
    />
        {showResults.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>

              <Card.Content>
                {/* <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.studentName}</Title>
                  <Caption style={AppStyles.textColor}>{rowData.studentID}</Caption>
                </View> */}
                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading style={AppStyles.titleColor} >{rowData.subjectName}</Subheading>
                    <Text style={AppStyles.textColor}>{'Subject'}</Text>
                  </View>
                </View>
                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.assignmentDescription}</Subheading>
                    <Text style={AppStyles.textColor}>{'Description'}</Text>
                  </View>
                </View>

                <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  {GeneralUtils.functions.getFileType(rowData.url) != 'mp4' ?
                    <CustomYouTubeVideo
                      value={rowData.url}
                      stateObject={stateObject}
                      videoId={GeneralUtils.functions.getYouTubeCode(rowData.url)}
                    />
                    :
                    <CustomVideo
                      openDocument={() => GeneralUtils.functions.openDocument(stateObject, rowData.url)}
                      value={rowData.url}
                      stateObject={stateObject}
                      fileName={GeneralUtils.functions.getFileName(rowData.url)}
                      fileType={GeneralUtils.functions.getFileType(rowData.url)}
                      source={GeneralUtils.functions.getSource(rowData.url, stateObject)}
                    />
                  }
                </View>

                {rowData.teacherComments != '' && <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.teacherComments}</Subheading>
                    <Text style={AppStyles.textColor}>{'Instruction to Parents/Students'}</Text>
                  </View>
                </View>}


              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}

      </View>
    )
  }
}

const styles = StyleSheet.create({


})



