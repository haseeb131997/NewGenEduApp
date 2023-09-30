
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
import CustomVideo from '../../../../components/CustomVideo';
import CustomYouTubeVideo from '../../../../components/CustomYouTubeVideo';





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






  render() {
    const { stateObject } = this.props;
    const { childViewDetails } = stateObject.state

    return (
      <View>
        {childViewDetails != null && childViewDetails.lessonDetails.map((rowData, index) => (
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
                    menuTitle={(rowData.authStat == 'A' || rowData.authStat == 'R') ? ['View', 'Edit', 'Delete','Copy'] : ['View', 'Edit', 'Delete', 'Approve/Reject','Copy']}
                  />
                </View>
              </View>



              <Card.Content>

                <View style={[AppStyles.marginTop_2]}>
                  <View style={[AppStyles.dashContainer, AppStyles.alignItems]}>
                    <Subheading >{rowData.assignmentDescription}</Subheading>
                    <Text style={AppStyles.textColor}>{'Description'}</Text>
                  </View>
                </View>



                <View style={AppStyles.marginTop_2}>
                  {GeneralUtils.functions.getFileType(rowData.contentPath) != 'mp4' ?
                    <CustomYouTubeVideo
                      value={rowData.contentPath}
                      stateObject={stateObject}
                      videoId={GeneralUtils.functions.getYouTubeCode(rowData.contentPath)}
                    />

                    :
                    <CustomVideo
                      openDocument={() => this.openDocument(rowData.contentPath)}
                      value={rowData.contentPath}
                      stateObject={stateObject}
                      fileName={GeneralUtils.functions.getFileName(rowData.contentPath)}
                      fileType={GeneralUtils.functions.getFileType(rowData.contentPath)}
                      source={GeneralUtils.functions.getSource(rowData.contentPath, stateObject)}
                    />
                  }
                </View>


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



