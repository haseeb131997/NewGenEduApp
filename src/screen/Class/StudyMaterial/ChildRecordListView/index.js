
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { h, w } from '../../../../utils/Dimensions';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import { Caption, Card, Subheading, Text, Title } from 'react-native-paper';
import SideMenu from "../../../../components/SideMenu";
import SelectListUtils from '../../../../utils/SelectListUtils'
import Ribbon from "../../../../components/Ribbon";
import CustomButtons from '../../../../components/CustomButtons';
import DocumentCustom from '../../../../components/DocumentCustom';
import DocumentView from '../../../../components/DocumentView';
import ImageDocumentView from '../../../../components/ImageDocumentView';
import DownloadDocument from '../../../../components/DownloadDocument';
import CustomVideo from '../../../../components/CustomVideo';
import SubScreenUtils from "../../../../utils/SubScreenUtils";
import apiCall from "../../../../ApiCall/ActionApi";




export default class ChildRecordListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentPath: '',
      showWebView: false
    }
    this.openDocument = this.openDocument.bind(this)
  }


  openDocument(path) {
    const { stateObject } = this.props;
    GeneralUtils.functions.contentPath = path
    if (Platform.OS === 'ios') {
      stateObject.parentStateChange({
        showFullViewDoc: true
      })
    }
    else {
      GeneralUtils.functions.contentPath = path
      this.setState({
        showWebView: true
      })
      setTimeout(function () {
        this.setState({ showWebView: false })
      }.bind(this), 3000)
    }
  }


  async loadMore() {
    const { stateObject } = this.props;

    var filenameArray = []


    // stateObject.state.childViewDetails.dispMaterialsForLesson = []

    var iterate = stateObject.state.childViewDetails.materialsForLesson

    var endLimit = stateObject.state.childViewDetails.dispMaterialsForLesson.length + 10

    var startLimit = stateObject.state.childViewDetails.dispMaterialsForLesson.length

    if (stateObject.state.childViewDetails.materialsForLesson.length < endLimit) {

      endLimit = stateObject.state.childViewDetails.materialsForLesson.length
    }

    for (let i = startLimit; i < endLimit; i++) {
      if (!iterate[i].contentPath.includes("CohesiveUpload")) {
        var filename = iterate[i].contentPath.substr(iterate[i].contentPath.lastIndexOf('/') + 1, iterate[i].contentPath.length);
        var obj = {
          filename: filename
        };
        filenameArray.push(obj);
      }
      stateObject.state.childViewDetails.dispMaterialsForLesson.push(iterate[i])
    }

    stateObject.parentStateChange({
      isLoading: true,
      // isChildRecordShow: true,
    })

    await SubScreenUtils.functions.getOracleUrl_Util(filenameArray, stateObject);

    const result_oracleURI = new Map();


    for (let j = 0; j < SubScreenUtils.functions.oracleURL.length; j++) {
      result_oracleURI.set(SubScreenUtils.functions.oracleURL[j].fileName, SubScreenUtils.functions.HOST + SubScreenUtils.functions.oracleURL[j].URI);

    }



    //  for (let i = 0; i < iterate.length && i < 10; i++) {
    for (let i = startLimit; i < endLimit; i++) {
      if (!stateObject.state.childViewDetails.dispMaterialsForLesson[i].contentPath.includes("CohesiveUpload")) {
        var filename = stateObject.state.childViewDetails.dispMaterialsForLesson[i].contentPath.substr(stateObject.state.childViewDetails.dispMaterialsForLesson[i].contentPath.lastIndexOf('/') + 1, stateObject.state.childViewDetails.dispMaterialsForLesson[i].contentPath.length);
        stateObject.state.childViewDetails.dispMaterialsForLesson[i].contentPath = result_oracleURI.get(filename);

      }
    }

    if (stateObject.state.childViewDetails.materialsForLesson.length > stateObject.state.childViewDetails.dispMaterialsForLesson.length) {
      stateObject.state.customLoadMore = true
    }
    else {
      stateObject.state.customLoadMore = false
    }



    if (apiCall.functions.apiError) {
      stateObject.parentStateChange({
        isLoading: false,
      })
    }
    else {
      stateObject.parentStateChange({
        // isChildRecordShow: true,
        childViewDetails: stateObject.state.childViewDetails,
        isLoading: false,
        currentOperation: '',
        customLoadMore: stateObject.state.customLoadMore
      })
    }

  }




  render() {
    const { stateObject } = this.props;

    const { childViewDetails } = stateObject.state
    console.log(stateObject.state.summaryDataModel)
    return (
      <View>
        {childViewDetails != null && childViewDetails.dispMaterialsForLesson.map((rowData, index) => (
          // {childViewDetails != null && childViewDetails.materialsForLesson.map((rowData, index) => (
          <TouchableOpacity disabled key={index.toString()}>
            <Card style={AppStyles.marginTop_2}>
              <View style={AppStyles.row_space_between}>
                <Ribbon
                  stateObject={stateObject}
                  label={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AuthStatusMaster, rowData.authStat)}
                  status={rowData.authStat}
                />
                <View style={AppStyles.menuContainer}>
                  <SideMenu
                    summaryResultIndex={stateObject.state.summaryResultIndex}
                    viewDetail={rowData}
                    stateObject={stateObject}
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete', 'Copy'] : ['View', 'Edit', 'Delete', 'Copy', 'Approve/Reject']}
                  />
                </View>
              </View>



              <Card.Content>
                <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.lesson}</Title>
                  <Caption >{'Lesson/Unit'}</Caption>
                </View>
                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.materialDescription}</Subheading>
                    <Text style={AppStyles.textColor}>{'Description'}</Text>
                  </View>
                </View>

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

                <CustomVideo
                  openDocument={() => GeneralUtils.functions.openDocument(stateObject, rowData.contentPath)}
                  value={rowData.contentPath}
                  stateObject={stateObject}
                  fileName={GeneralUtils.functions.getFileName(rowData.contentPath)}
                  fileType={GeneralUtils.functions.getFileType(rowData.contentPath)}
                  source={GeneralUtils.functions.getSource(rowData.contentPath, stateObject)}
                />

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.date}</Subheading>
                    <Text style={AppStyles.textColor}>{'Last updated on'}</Text>
                  </View>
                </View>


              </Card.Content>


            </Card>
          </TouchableOpacity>
        ))}


        {(Platform.OS === 'android' && stateObject.state.downLoadDocument) && <DownloadDocument
          stateObject={stateObject}
          source={GeneralUtils.functions.getSource(GeneralUtils.functions.contentPath, stateObject)}
        />}


        {stateObject.state.customLoadMore && <View style={[AppStyles.alignItems, AppStyles.marginTop_3,]}>
          <CustomButtons
            onPress={() => this.loadMore()}
            title="Show more"
            titleStyle={AppStyles.signInTextStyle}
            containerStyle={AppStyles.btnContainer}
            buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
          />
        </View>}


      </View>
    )
  }
}

const styles = StyleSheet.create({
 
})



