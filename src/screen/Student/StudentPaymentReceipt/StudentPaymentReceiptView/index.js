
import React, { Component } from "react";
import { View, StyleSheet, Image,Dimensions } from 'react-native';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import Pdf from 'react-native-pdf';
import { httpUtils } from '../../../../utils/HttpUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralUtils from "../../../../utils/GeneralUtils";
import { UiColor } from '../../../../theme';





class StudentPaymentReceipt extends Component {
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
    const { dataModel,nekot,
      ivas,
      uhtuliak,CreateDefaultReportPath } = stateObject.state
    const { parentStateChange } = stateObject
   const source = {uri:`${httpUtils.FILE_URL()}/CohesiveUpload${CreateDefaultReportPath.ReportPath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}`,cache:true};
  
    return (
      <View style={AppStyles.flex_one}>
        <View style={AppStyles.flex_End}>
          <Ionicons
            onPress={() => GeneralUtils.functions.openDocument(stateObject, `/CohesiveUpload${CreateDefaultReportPath.ReportPath}`)}
            name="eye"
            size={AppStyles.eyeIcon.height}
            color={UiColor.LIGHT_TEXT_COLOR}
            style={AppStyles.addIconStyle}
          />
        </View>
        <Pdf
          source={source}
          style={styles.pdfStyle} />


        {/* {(Platform.OS === 'android' && stateObject.state.downLoadDocument) && <DownloadDocument
          stateObject={stateObject}
          source={source}
        />} */}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  pdfStyle: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,

}
})
export default StudentPaymentReceipt;

