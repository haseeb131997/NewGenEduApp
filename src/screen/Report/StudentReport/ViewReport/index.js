
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { UiColor } from '../../../../theme';
import AppStyles from "../../../../AppStyles/AppStyles";
import GeneralUtils from "../../../../utils/GeneralUtils";
import Pdf from 'react-native-pdf';
import { httpUtils } from '../../../../utils/HttpUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DownloadDocument from '../../../../components/DownloadDocument';








export default class ViewReport extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }





  render() {
    const { stateObject } = this.props;

    const { dataModel, nekot,
      ivas,
      uhtuliak, } = stateObject.state

    const source = { uri: `${httpUtils.FILE_URL()}/CohesiveUpload${dataModel.ReportPath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}`, cache: false };

    return (
      <View style={AppStyles.flex_one}>
        <View style={AppStyles.flex_End}>
          <Ionicons
            onPress={() => GeneralUtils.functions.openDocument(stateObject, `/CohesiveUpload${dataModel.ReportPath}`)}
            name="eye"
            size={AppStyles.eyeIcon.height}
            color={UiColor.LIGHT_TEXT_COLOR}
            style={AppStyles.addIconStyle}
          />
        </View>
        <ScrollView >
        <Pdf
          source={source}
          style={AppStyles.pdfStyle} />
        </ScrollView>

        {/* {(Platform.OS === 'android' && stateObject.state.downLoadDocument) && <DownloadDocument
          stateObject={stateObject}
          source={source}
        />} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({



})



