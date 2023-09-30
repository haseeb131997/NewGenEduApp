
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';


import DocumentCustom from '../../../../components/DocumentCustom';
import DocumentView from '../../../../components/DocumentView';
import ImageDocumentView from '../../../../components/ImageDocumentView';
import DownloadDocument from '../../../../components/DownloadDocument';
import CustomVideo from '../../../../components/CustomVideo';
import CustomYouTubeVideo from '../../../../components/CustomYouTubeVideo';
import StudentSerachBox from '../../../../components/StudentSerachBox';




var showResults = []

export default class FilterListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryResult: [],
      searchQuery: ''
    }
  }

  onChangeSearch(text) {
    this.setState({
      searchQuery: text
    })
  }





  render() {
    const { stateObject } = this.props;
    // showResults = GeneralUtils.functions.getSummaryResult(stateObject)
    var mapping = ['subjectName', 'materialDescription', 'lesson', 'heading', 'subHeading', 'contentPath']

    showResults = GeneralUtils.functions.studentSerachFilter(stateObject, GeneralUtils.functions.getSummaryResult(stateObject), mapping, this.state.searchQuery)
    return (
      <View>
        <StudentSerachBox
          searchQuery={this.state.searchQuery}
          stateObject={stateObject}
          onChangeSearch={(text) => this.onChangeSearch(text)}
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
                    <Subheading style={AppStyles.titleColor}>{rowData.subjectName}</Subheading>
                    <Text style={AppStyles.textColor}>{'Subject'}</Text>
                  </View>
                </View>
                {rowData.materialDescription!=''&&
                <View style={[AppStyles.marginTop_2]}>
                  <View style={[ AppStyles.alignItems]}>
                    <Subheading >{rowData.materialDescription}</Subheading>
                    <Text style={AppStyles.textColor}>{'Material Description'}</Text>
                  </View>
                </View>}
                 {rowData.lesson!=''&&
                <View style={[AppStyles.marginTop_2]}>
                  <View style={[ AppStyles.alignItems]}>
                    <Subheading >{rowData.lesson}</Subheading>
                    <Text style={AppStyles.textColor}>{'Unit/Lesson'}</Text>
                  </View>
                </View> }
                {rowData.heading !=''&&
                <View style={[AppStyles.marginTop_2]}>
                  <View style={[ AppStyles.alignItems]}>
                    <Subheading >{rowData.heading}</Subheading>
                    <Text style={AppStyles.textColor}>{'Heading'}</Text>
                  </View>
                </View>}
              {rowData.subHeading !=''&&
                <View style={[AppStyles.marginTop_2]}>
                  <View style={[ AppStyles.alignItems]}>
                    <Subheading >{rowData.subHeading}</Subheading>
                    <Text style={AppStyles.textColor}>{'Sub Heading'}</Text>
                  </View>
                </View>
                 }

                {(rowData.contentPath != '' && (GeneralUtils.functions.getFileType(rowData.contentPath) == 'pdf')) &&
                  <DocumentCustom
                    openDocument={() => GeneralUtils.functions.openDocument(stateObject, rowData.contentPath)}
                    stateObject={stateObject}
                    source={GeneralUtils.functions.getSource(rowData.contentPath, stateObject)}
                    fileName={GeneralUtils.functions.getFileName(rowData.contentPath)}
                  />}

                <DocumentView
                  openDocument={() => GeneralUtils.functions.openDocument(stateObject, rowData.contentPath)}
                  value={rowData.contentPath}
                  stateObject={stateObject}
                  fileName={GeneralUtils.functions.getFileName(rowData.contentPath)}
                  fileType={GeneralUtils.functions.getFileType(rowData.contentPath)}
                />

                <ImageDocumentView
                  openDocument={() => GeneralUtils.functions.openDocument(stateObject, rowData.contentPath)}
                  value={rowData.contentPath}
                  stateObject={stateObject}
                  fileName={GeneralUtils.functions.getFileName(rowData.contentPath)}
                  fileType={GeneralUtils.functions.getFileType(rowData.contentPath)}
                />

                {/* <CustomVideo
                  openDocument={() => GeneralUtils.functions.openDocument(stateObject, rowData.contentPath)}
                  value={rowData.contentPath}
                  stateObject={stateObject}
                  fileName={GeneralUtils.functions.getFileName(rowData.contentPath)}
                  fileType={GeneralUtils.functions.getFileType(rowData.contentPath)}
                  source={GeneralUtils.functions.getSource(rowData.contentPath, stateObject)}
                /> */}


                <View style={[AppStyles.marginTop_2, AppStyles.alignItems]}>
                  {GeneralUtils.functions.getFileType(rowData.contentPath) != 'mp4' ?
                    <CustomYouTubeVideo
                      value={rowData.contentPath}
                      stateObject={stateObject}
                      videoId={GeneralUtils.functions.getYouTubeCode(rowData.contentPath)}
                    />
                    :
                    <CustomVideo
                      openDocument={() => GeneralUtils.functions.openDocument(stateObject, rowData.contentPath)}
                      value={rowData.contentPath}
                      stateObject={stateObject}
                      fileName={GeneralUtils.functions.getFileName(rowData.contentPath)}
                      fileType={GeneralUtils.functions.getFileType(rowData.contentPath)}
                      source={GeneralUtils.functions.getSource(rowData.contentPath, stateObject)}
                    />
                  }
                </View>




              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}


        {(Platform.OS === 'android' && stateObject.state.downLoadDocument) && <DownloadDocument
          stateObject={stateObject}
          source={GeneralUtils.functions.getSource(GeneralUtils.functions.contentPath, stateObject)}
        />}

      </View>
    )
  }
}

const styles = StyleSheet.create({


})



