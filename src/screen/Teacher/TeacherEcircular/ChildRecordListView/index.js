
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
import FullViewDocument from '../../../../components/FullViewDocument';
import DownloadDocument from '../../../../components/DownloadDocument';
import { WebView } from 'react-native-webview';
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
  
   
   
  var iterate = stateObject.state.childViewDetails.circularDetails

  var endLimit = stateObject.state.childViewDetails.dispCircular.length + 10

  var startLimit = stateObject.state.childViewDetails.dispCircular.length

  if(stateObject.state.childViewDetails.circularDetails.length < endLimit){

    endLimit = stateObject.state.childViewDetails.circularDetails.length
  }
  
    for (let i = startLimit ; i < endLimit; i++) {
      if (!iterate[i].contentPath.includes("CohesiveUpload")) {
        var filename = iterate[i].contentPath.substr(iterate[i].contentPath.lastIndexOf('/') + 1, iterate[i].contentPath.length);
        var obj = {
          filename: filename
         };
      filenameArray.push(obj);
      }
      stateObject.state.childViewDetails.dispCircular.push(iterate[i])
    }

    stateObject.parentStateChange({
      isLoading: true,
      // isChildRecordShow: true,
    })

    await SubScreenUtils.functions.getOracleUrl_Util(filenameArray, stateObject);

    const result_oracleURI = new Map();


    for(let j=0; j<SubScreenUtils.functions.oracleURL.length; j++){
      result_oracleURI.set(SubScreenUtils.functions.oracleURL[j].fileName, SubScreenUtils.functions.HOST + SubScreenUtils.functions.oracleURL[j].URI );

   }

  //  for (let i = 0; i < iterate.length && i < 10; i++) {
    for (let i = startLimit ; i < endLimit; i++) {
    if (!stateObject.state.childViewDetails.dispCircular[i].contentPath.includes("CohesiveUpload")) {
      var filename = stateObject.state.childViewDetails.dispCircular[i].contentPath.substr(stateObject.state.childViewDetails.dispCircular[i].contentPath.lastIndexOf('/') + 1, stateObject.state.childViewDetails.dispCircular[i].contentPath.length);
      stateObject.state.childViewDetails.dispCircular[i].contentPath = result_oracleURI.get(filename);
    
    }
  }

  if(stateObject.state.childViewDetails.circularDetails.length > stateObject.state.childViewDetails.dispCircular.length){
    stateObject.state.customLoadMore = true
  }
  else{
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
        customLoadMore:stateObject.state.customLoadMore 
      })
    }

  }




  render() {
    const { stateObject } = this.props;

    const { childViewDetails } = stateObject.state
    console.log(stateObject.state.summaryDataModel)
    return (
      <View>
          {childViewDetails != null && childViewDetails.dispCircular.map((rowData, index) => (
        // {childViewDetails != null && childViewDetails.circularDetails.map((rowData, index) => (
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
                    summaryResultIndex={index}
                    viewDetail={rowData}
                    stateObject={stateObject}
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete','Copy'] : ['View', 'Edit', 'Delete', 'Copy','Approve/Reject']}
                  />
                </View>
              </View>



              <Card.Content>
                <View style={AppStyles.alignItems}>
                  <Title style={AppStyles.primaryTitleStyle}>{rowData.circularDate}</Title>
                  <Caption style={AppStyles.textColor}>{'Circular Date'}</Caption>
                </View>
                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.description}</Subheading>
                    <Text style={AppStyles.textColor}>{'Description'}</Text>
                  </View>
                </View>

                {(rowData.contentPath != '' && (GeneralUtils.functions.getFileType(rowData.contentPath) == 'pdf')) &&
                  <DocumentCustom
                    openDocument={() => this.openDocument(rowData.contentPath)}
                    stateObject={stateObject}
                    source={GeneralUtils.functions.getSource(rowData.contentPath, stateObject)}
                    fileName={GeneralUtils.functions.getFileName(rowData.contentPath)}
                  />}

               

              

             

              </Card.Content>


            </Card>
          </TouchableOpacity>
        ))}


        {(Platform.OS === 'android' && this.state.showWebView) && <DownloadDocument
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
  contaierWidth: {
    width: '48%'
  },
  menuContainer: {
    top: h('1%'),
    right: h('2%')

  },
  titleColor: {
    color: UiColor.SKYBLUE,
    fontWeight: '500'
  },
  instructionStyle: {
    color: UiColor.LIGHT_TEXT_COLOR, textAlign: 'center'
  }
})



